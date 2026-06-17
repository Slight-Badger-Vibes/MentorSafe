import twilio from "twilio";
import { SmsProvider, SendSmsInput } from "../sms";
import { Result, success, failure } from "@/lib/types";

export class TwilioSmsProvider implements SmsProvider {
  private client: twilio.Twilio;

  constructor(
    apiKey: string,
    apiSecret: string,
    accountSid: string
  ) {
    this.client = twilio(apiKey, apiSecret, { accountSid });
  }

  /**
   * Sends an SMS using the Twilio API.
   * Note: In a production "Proxy" scenario, we might use the Twilio Proxy API 
   * or Conversations API, but this is the standard Programmable SMS implementation.
   */
  async sendSms(input: SendSmsInput): Promise<Result<{ messageId: string }>> {
    try {
      const message = await this.client.messages.create({
        body: input.content,
        to: input.to,
        from: input.from, // Must be a Twilio number or Messaging Service SID
      });

      return success({ messageId: message.sid });
    } catch (error: any) {
      console.error("Twilio SMS Failure:", error);
      return failure(new Error(error.message || "Failed to send SMS via Twilio"));
    }
  }
}
