import { describe, it, expect } from "vitest";
import { suspendMatch, terminateMatch, activateMatch } from "./match";
import { Match, MatchId, MentorId, ParentId, YoungPersonId, PhoneNumber } from "./types";

describe("Match Status Transitions", () => {
  const baseMatch: Match = {
    id: "m1" as MatchId,
    mentorId: "men1" as MentorId,
    parentId: "par1" as ParentId,
    youngPersonId: "yp1" as YoungPersonId,
    status: "Active",
    proxyNumber: "07700000000" as PhoneNumber,
    createdAt: new Date(),
  };

  it("should suspend Active match", () => {
    const result = suspendMatch(baseMatch);
    expect(result.data?.status).toBe("Suspended");
  });

  it("should terminate Active match", () => {
    const result = terminateMatch(baseMatch);
    expect(result.data?.status).toBe("Terminated");
  });

  it("should activate Suspended match", () => {
    const suspended: Match = { ...baseMatch, status: "Suspended" };
    const result = activateMatch(suspended);
    expect(result.data?.status).toBe("Active");
  });

  it("should not activate Terminated match", () => {
    const terminated: Match = { ...baseMatch, status: "Terminated" };
    const result = activateMatch(terminated);
    expect(result.error).toBeDefined();
  });
});
