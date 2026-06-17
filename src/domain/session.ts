import { Session, SessionId, MatchId } from "./types";
import { Result, success, failure } from "@/lib/types";

export interface CreateSessionInput {
  matchId: MatchId;
  scheduledAt: Date;
}

/**
 * Creates a new Session in Scheduled status.
 */
export function createSession(input: CreateSessionInput): Result<Session> {
  const session: Session = {
    id: "temp-session-id" as SessionId,
    matchId: input.matchId,
    status: "Scheduled",
    scheduledAt: input.scheduledAt,
  };
  return success(session);
}

/**
 * Transitions a session from Scheduled to Started.
 */
export function startSession(session: Session, startedAt: Date = new Date()): Result<Session> {
  if (session.status === "Started") {
    return failure(new Error("Session is already started."));
  }
  if (session.status !== "Scheduled") {
    return failure(new Error(`Session cannot transition to Started from ${session.status} status.`));
  }
  const updated: Session = {
    ...session,
    status: "Started",
    startedAt,
  };
  return success(updated);
}

/**
 * Transitions a session from Started to Completed.
 */
export function completeSession(session: Session, completedAt: Date = new Date()): Result<Session> {
  if (session.status !== "Started") {
    return failure(new Error(`Session must be Started before completing. Current status: ${session.status}`));
  }
  const updated: Session = {
    ...session,
    status: "Completed",
    completedAt,
  };
  return success(updated);
}

/**
 * Transitions a session from Scheduled to Cancelled.
 * Cancellations are blocked once a session is in the Started status.
 */
export function cancelSession(session: Session, cancelledAt: Date = new Date()): Result<Session> {
  if (session.status === "Started") {
    return failure(new Error("Session cannot cancel session in Started status. It must terminate as Completed."));
  }
  if (session.status !== "Scheduled") {
    return failure(new Error(`cannot cancel session in ${session.status} status.`));
  }
  const updated: Session = {
    ...session,
    status: "Cancelled",
    cancelledAt,
  };
  return success(updated);
}
