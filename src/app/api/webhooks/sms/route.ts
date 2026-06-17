import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { MessageService } from "@/services/message-service";
import { TwilioSmsProvider } from "@/lib/sms/twilio";
import { PhoneNumber, MentorId, ParentId } from "@/domain/types";

const prisma = new PrismaClient();

// Initialize the MessageService with Twilio Provider
const smsProvider = new TwilioSmsProvider(
  process.env.TWILIO_API_KEY!,
  process.env.TWILIO_API_SECRET!,
  process.env.TWILIO_ACCOUNT_SID!
);
const messageService = new MessageService(prisma, smsProvider);

/**
 * Inbound SMS Webhook for Twilio.
 * This endpoint handles incoming replies from Parents and relays them to Mentors.
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const from = formData.get("From") as string; // Real phone number of the sender
    const to = formData.get("To") as string;     // The Proxy Number they sent to
    const body = formData.get("Body") as string;

    if (!from || !to || !body) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // 1. Find the Match associated with this Proxy Number and one of the participants
    const match = await prisma.match.findFirst({
      where: {
        proxyNumber: to,
        OR: [
          { parent: { phoneNumber: from } },
          { mentor: { phoneNumber: from } },
        ],
        status: "Active",
      },
      include: {
        mentor: true,
        parent: true,
      },
    });

    if (!match) {
      console.warn(`No active match found for inbound SMS from ${from} to ${to}`);
      return new NextResponse("OK", { status: 200 });
    }

    // 2. Determine who is the sender and who is the recipient
    const isParent = match.parent.phoneNumber === from;
    const recipientPhone = isParent 
      ? match.mentor.phoneNumber 
      : match.parent.phoneNumber;
    const senderId = isParent 
      ? match.parentId 
      : match.mentorId;

    // 3. Relay the message
    const relayResult = await messageService.relayMessage({
      match: {
        ...match,
        mentorId: match.mentorId as MentorId,
        parentId: match.parentId as ParentId,
        proxyNumber: match.proxyNumber as PhoneNumber,
        youngPersonId: match.youngPersonId as any,
      } as any,
      senderId: senderId as any,
      recipientPhone: recipientPhone as PhoneNumber,
      content: body,
    });

    if (relayResult.error) {
      console.error("Relay failure:", relayResult.error);
      return new NextResponse("Relay failure", { status: 500 });
    }

    // 3. Return a successful TwiML response (empty)
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
      {
        headers: { "Content-Type": "text/xml" },
      }
    );
  } catch (error) {
    console.error("Webhook Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
