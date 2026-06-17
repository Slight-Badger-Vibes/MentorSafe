import { 
  Match, 
  MatchId, 
  MentorId, 
  ParentId, 
  YoungPersonId, 
  PhoneNumber 
} from "./types";
import { Result, success, failure } from "@/lib/types";

export interface CreateMatchInput {
  mentorId: MentorId;
  parentId: ParentId;
  youngPersonId: YoungPersonId;
  proxyNumber: PhoneNumber;
}

/**
 * Creates a new Match domain object.
 */
export function createMatch(input: CreateMatchInput): Result<Match> {
  const match: Match = {
    id: "temp-id" as MatchId,
    mentorId: input.mentorId,
    parentId: input.parentId,
    youngPersonId: input.youngPersonId,
    proxyNumber: input.proxyNumber,
    status: "Active",
    createdAt: new Date(),
  };

  return success(match);
}

export function suspendMatch(match: Match): Result<Match> {
  return success({ ...match, status: "Suspended" });
}

export function terminateMatch(match: Match): Result<Match> {
  return success({ ...match, status: "Terminated" });
}

export function activateMatch(match: Match): Result<Match> {
  if (match.status === "Terminated") {
    return failure(new Error("Cannot activate a terminated match."));
  }
  return success({ ...match, status: "Active" });
}
