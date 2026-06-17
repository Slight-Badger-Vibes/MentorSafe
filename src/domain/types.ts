import { Brand } from "@/lib/types";

/** Entity Identifiers */
export type MentorId = Brand<string, "MentorId">;
export type ParentId = Brand<string, "ParentId">;
export type YoungPersonId = Brand<string, "YoungPersonId">;
export type SupervisorId = Brand<string, "SupervisorId">;
export type MatchId = Brand<string, "MatchId">;
export type SessionId = Brand<string, "SessionId">;
export type MessageId = Brand<string, "MessageId">;

/** Domain Primitives */
export type PhoneNumber = Brand<string, "PhoneNumber">;

/** Entity Definitions */

export interface Mentor {
  id: MentorId;
  name: string;
  email: string;
  phoneNumber: PhoneNumber;
  isActive: boolean;
}

export interface Parent {
  id: ParentId;
  name: string;
  phoneNumber: PhoneNumber;
}

export interface YoungPerson {
  id: YoungPersonId;
  name: string;
}

export interface Supervisor {
  id: SupervisorId;
  name: string;
  email: string;
}

export interface Match {
  id: MatchId;
  mentorId: MentorId;
  parentId: ParentId;
  youngPersonId: YoungPersonId;
  status: "Active" | "Suspended" | "Terminated";
  proxyNumber: PhoneNumber;
  createdAt: Date;
}

export type SessionStatus = "Scheduled" | "Started" | "Completed" | "Cancelled";

export interface Session {
  id: SessionId;
  matchId: MatchId;
  status: SessionStatus;
  scheduledAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
}

export interface Message {
  id: MessageId;
  matchId: MatchId;
  senderId: MentorId | ParentId;
  content: string;
  timestamp: Date;
}
