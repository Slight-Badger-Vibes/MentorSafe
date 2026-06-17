import { 
  Match, 
  Message, 
  MessageId, 
  MentorId, 
  ParentId 
} from "./types";
import { Result, success, failure } from "@/lib/types";

export interface SendMessageInput {
  match: Match;
  senderId: MentorId | ParentId;
  content: string;
}

/**
 * Validates and creates a Message domain object.
 * Enforces participation and active match status rules.
 */
export function sendMessage(input: SendMessageInput): Result<Message> {
  const { match, senderId, content } = input;

  // 1. Verify match is active
  if (match.status !== "Active") {
    return failure(new Error("Match is not active"));
  }

  // 2. Verify sender is part of the match
  const isMentor = senderId === match.mentorId;
  const isParent = senderId === match.parentId;

  if (!isMentor && !isParent) {
    return failure(new Error("Sender is not part of this match"));
  }

  // 3. Create the message
  const message: Message = {
    id: "temp-msg-id" as MessageId,
    matchId: match.id,
    senderId,
    content,
    timestamp: new Date(),
  };

  return success(message);
}
