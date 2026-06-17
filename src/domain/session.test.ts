import { describe, it, expect } from "vitest";
import { 
  createSession, 
  startSession, 
  completeSession, 
  cancelSession 
} from "./session";
import { MatchId, SessionId } from "./types";

describe("Session Domain Logic & Transitions", () => {
  const mockMatchId = "match-123" as MatchId;
  const mockSessionId = "session-456" as SessionId;
  const scheduledTime = new Date("2026-06-18T10:00:00Z");

  it("should create a new session in Scheduled status", () => {
    const result = createSession({
      matchId: mockMatchId,
      scheduledAt: scheduledTime
    });

    expect(result.error).toBeNull();
    expect(result.data).toBeDefined();
    expect(result.data?.status).toBe("Scheduled");
    expect(result.data?.matchId).toBe(mockMatchId);
    expect(result.data?.scheduledAt).toEqual(scheduledTime);
    expect(result.data?.startedAt).toBeUndefined();
    expect(result.data?.completedAt).toBeUndefined();
    expect(result.data?.cancelledAt).toBeUndefined();
  });

  describe("startSession", () => {
    it("should transition a Scheduled session to Started status", () => {
      const sessionResult = createSession({
        matchId: mockMatchId,
        scheduledAt: scheduledTime
      });
      const session = { ...sessionResult.data!, id: mockSessionId };
      const startTime = new Date("2026-06-18T10:05:00Z");

      const result = startSession(session, startTime);

      expect(result.error).toBeNull();
      expect(result.data?.status).toBe("Started");
      expect(result.data?.startedAt).toEqual(startTime);
    });

    it("should return an error when trying to start a session that is already Started", () => {
      const sessionResult = createSession({
        matchId: mockMatchId,
        scheduledAt: scheduledTime
      });
      const startTime = new Date("2026-06-18T10:05:00Z");
      const startedSession = startSession({ ...sessionResult.data!, id: mockSessionId }, startTime).data!;

      const result = startSession(startedSession, new Date());
      expect(result.data).toBeNull();
      expect(result.error).toBeInstanceOf(Error);
      expect(result.error?.message).toContain("already started");
    });

    it("should return an error when trying to start a completed session", () => {
      const sessionResult = createSession({
        matchId: mockMatchId,
        scheduledAt: scheduledTime
      });
      const started = startSession({ ...sessionResult.data!, id: mockSessionId }, new Date()).data!;
      const completed = completeSession(started, new Date()).data!;

      const result = startSession(completed, new Date());
      expect(result.data).toBeNull();
      expect(result.error?.message).toContain("cannot transition");
    });
  });

  describe("completeSession", () => {
    it("should transition a Started session to Completed status", () => {
      const sessionResult = createSession({
        matchId: mockMatchId,
        scheduledAt: scheduledTime
      });
      const started = startSession({ ...sessionResult.data!, id: mockSessionId }, new Date()).data!;
      const completionTime = new Date("2026-06-18T11:00:00Z");

      const result = completeSession(started, completionTime);

      expect(result.error).toBeNull();
      expect(result.data?.status).toBe("Completed");
      expect(result.data?.completedAt).toEqual(completionTime);
    });

    it("should return an error when trying to complete a Scheduled session without starting it first", () => {
      const sessionResult = createSession({
        matchId: mockMatchId,
        scheduledAt: scheduledTime
      });
      const session = { ...sessionResult.data!, id: mockSessionId };

      const result = completeSession(session, new Date());

      expect(result.data).toBeNull();
      expect(result.error?.message).toContain("must be Started");
    });
  });

  describe("cancelSession", () => {
    it("should cancel a Scheduled session", () => {
      const sessionResult = createSession({
        matchId: mockMatchId,
        scheduledAt: scheduledTime
      });
      const session = { ...sessionResult.data!, id: mockSessionId };
      const cancelTime = new Date("2026-06-18T09:00:00Z");

      const result = cancelSession(session, cancelTime);

      expect(result.error).toBeNull();
      expect(result.data?.status).toBe("Cancelled");
      expect(result.data?.cancelledAt).toEqual(cancelTime);
    });

    it("should return an error when trying to cancel a Started session", () => {
      const sessionResult = createSession({
        matchId: mockMatchId,
        scheduledAt: scheduledTime
      });
      const started = startSession({ ...sessionResult.data!, id: mockSessionId }, new Date()).data!;

      const result = cancelSession(started, new Date());

      expect(result.data).toBeNull();
      expect(result.error?.message).toContain("cannot cancel session in Started status");
    });

    it("should return an error when trying to cancel a Completed session", () => {
      const sessionResult = createSession({
        matchId: mockMatchId,
        scheduledAt: scheduledTime
      });
      const started = startSession({ ...sessionResult.data!, id: mockSessionId }, new Date()).data!;
      const completed = completeSession(started, new Date()).data!;

      const result = cancelSession(completed, new Date());

      expect(result.data).toBeNull();
      expect(result.error?.message).toContain("cannot cancel");
    });
  });
});
