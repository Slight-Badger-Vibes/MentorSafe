import { PhoneNumber } from "@/domain/types";
import { Result } from "@/lib/types";

export interface SendSmsInput {
  to: PhoneNumber;
  from: PhoneNumber; // This will be the Proxy Number
  content: string;
}

/**
 * Interface for SMS delivery. 
 * Allows us to swap Twilio for other providers or mocks in tests.
 */
export interface SmsProvider {
  sendSms(input: SendSmsInput): Promise<Result<{ messageId: string }>>;
}
