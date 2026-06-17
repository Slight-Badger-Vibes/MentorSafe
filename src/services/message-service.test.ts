import { describe, it, expect, vi, beforeEach } from "vitest";
import { MessageService } from "./message-service";
import { 
  Match, 
  MentorId, 
  ParentId, 
  MatchId, 
  PhoneNumber 
} from "@/domain/types";
import { SmsProvider } from "@/lib/sms";
import { success } from "@/lib/types";

describe("MessageService", () => {
  const mockSmsProvider: SmsProvider = {
    sendSms: vi.fn().mockResolvedValue(success({ messageId: "sms-123" })),
  };

  // Minimal mock for Prisma
  const mockPrisma: any = {
    message: {
      create: vi.fn().mockResolvedValue({ id: "db-msg-123" }),
    },
  };

  const service = new MessageService(mockPrisma, mockSmsProvider);

  const activeMatch: Match = {
    id: "match-1" as MatchId,
    mentorId: "mentor-1" as MentorId,
    parentId: "parent-1" as ParentId,
    youngPersonId: "yp-1" as any,
    status: "Active",
    proxyNumber: "+447000000000" as PhoneNumber,
    createdAt: new Date(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should coordinate sending a message: domain check -> db persist -> sms send", async () => {
    const result = await service.relayMessage({
      match: activeMatch,
      senderId: "mentor-1" as MentorId,
      recipientPhone: "+447111111111" as PhoneNumber, // Parent's real number
      content: "Hello from service",
    });

    expect(result.error).toBeNull();
    
    // 1. Check DB persistence
    expect(mockPrisma.message.create).toHaveBeenCalled();
    
    // 2. Check SMS delivery via provider
    expect(mockSmsProvider.sendSms).toHaveBeenCalledWith({
      to: "+447111111111",
      from: activeMatch.proxyNumber,
      content: "Hello from service",
    });
  });

  it("should fail service relay if domain validation fails (e.g. inactive match)", async () => {
    const inactiveMatch = { ...activeMatch, status: "Terminated" } as Match;
    
    const result = await service.relayMessage({
      match: inactiveMatch,
      senderId: "mentor-1" as MentorId,
      recipientPhone: "+447111111111" as PhoneNumber,
      content: "Hello?",
    });

    expect(result.error).not.toBeNull();
    expect(mockPrisma.message.create).not.toHaveBeenCalled();
    expect(mockSmsProvider.sendSms).not.toHaveBeenCalled();
  });
});
