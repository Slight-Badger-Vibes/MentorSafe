import { 
  Match, 
  Message, 
  MentorId, 
  ParentId, 
  PhoneNumber 
} from "@/domain/types";
import { sendMessage } from "@/domain/message";
import { SmsProvider } from "@/lib/sms";
import { Result, success, failure } from "@/lib/types";
import { PrismaClient } from "@prisma/client";

export interface RelayMessageInput {
  match: Match;
  senderId: MentorId | ParentId;
  recipientPhone: PhoneNumber; // The real phone number to deliver to
  content: string;
}

/**
 * Service Layer: Coordinates the Anonymous Messaging Relay.
 * Decouples domain logic from infrastructure (Prisma, SMS Provider).
 */
export class MessageService {
  constructor(
    private prisma: PrismaClient,
    private smsProvider: SmsProvider
  ) {}

  /**
   * Relays a message: 
   * 1. Validates via Domain Logic
   * 2. Persists to Audit Log (Prisma)
   * 3. Sends via SMS Provider
   */
  async relayMessage(input: RelayMessageInput): Promise<Result<Message>> {
    const { match, senderId, recipientPhone, content } = input;

    // 1. Domain Validation
    const domainResult = sendMessage({
      match,
      senderId,
      content,
    });

    if (domainResult.error) {
      return failure(domainResult.error);
    }

    const message = domainResult.data!;

    // 2. Persist to Database (Audit Log)
    try {
      await this.prisma.message.create({
        data: {
          matchId: message.matchId,
          senderId: message.senderId,
          content: message.content,
          timestamp: message.timestamp,
        },
      });
    } catch (e) {
      return failure(new Error("Failed to persist message to database"));
    }

    // 3. Trigger SMS Delivery
    const smsResult = await this.smsProvider.sendSms({
      to: recipientPhone,
      from: match.proxyNumber,
      content: message.content,
    });

    if (smsResult.error) {
      // Note: We might want to log this but we've already persisted the "attempt" to the DB.
      // For now, we return failure to the caller.
      return failure(smsResult.error);
    }

    return success(message);
  }
}
