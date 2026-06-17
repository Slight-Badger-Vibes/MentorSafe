import { describe, it, expect } from "vitest";
import { sendMessage } from "./message";
import { 
  Match, 
  MentorId, 
  ParentId, 
  MatchId, 
  PhoneNumber 
} from "./types";

describe("Message Domain Logic (Anonymous Messaging Relay)", () => {
  const mentorId = "mentor-1" as MentorId;
  const parentId = "parent-1" as ParentId;
  const matchId = "match-1" as MatchId;
  const proxyNumber = "+447000000000" as PhoneNumber;

  const activeMatch: Match = {
    id: matchId,
    mentorId,
    parentId,
    youngPersonId: "yp-1" as any,
    status: "Active",
    proxyNumber,
    createdAt: new Date(),
  };

  it("should allow a Mentor to send a message to a Parent in an active match", () => {
    const result = sendMessage({
      match: activeMatch,
      senderId: mentorId,
      content: "Hello, I will be picking up your child at 4 PM.",
    });

    expect(result.error).toBeNull();
    expect(result.data?.senderId).toBe(mentorId);
  });

  it("should allow a Parent to send a message to a Mentor in an active match", () => {
    const result = sendMessage({
      match: activeMatch,
      senderId: parentId,
      content: "Great, thank you!",
    });

    expect(result.error).toBeNull();
    expect(result.data?.senderId).toBe(parentId);
  });

  it("should fail if the sender is not part of the match", () => {
    const intruderId = "intruder-1" as any;
    const result = sendMessage({
      match: activeMatch,
      senderId: intruderId,
      content: "I am not part of this.",
    });

    expect(result.error).not.toBeNull();
    expect(result.error?.message).toContain("Sender is not part of this match");
  });

  it("should fail if the match is terminated", () => {
    const terminatedMatch: Match = { ...activeMatch, status: "Terminated" };
    const result = sendMessage({
      match: terminatedMatch,
      senderId: mentorId,
      content: "Hello?",
    });

    expect(result.error).not.toBeNull();
    expect(result.error?.message).toContain("Match is not active");
  });
});
