"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { 
  MentorId, 
  ParentId, 
  YoungPersonId, 
  PhoneNumber,
  MatchId 
} from "@/domain/types";
import { Result, success, failure } from "@/lib/types";
import { suspendMatch, terminateMatch, activateMatch } from "@/domain/match";
import { Match } from "@prisma/client";

const prisma = new PrismaClient();

// ... existing create functions ...

export async function updateMatchStatus(
  matchId: string, 
  status: "Active" | "Suspended" | "Terminated"
): Promise<{ error?: string }> {
  try {
    // 1. Fetch current
    const match = await prisma.match.findUnique({ where: { id: matchId } });
    if (!match) return { error: "Match not found" };

    // 2. Map prisma match to domain (simple cast since structures align)
    const domainMatch = match as any; // Quick bridge

    // 3. Apply domain logic
    let result: Result<any>;
    if (status === "Suspended") result = suspendMatch(domainMatch);
    else if (status === "Terminated") result = terminateMatch(domainMatch);
    else result = activateMatch(domainMatch);

    if (!result.data) return { error: result.error?.message };

    // 4. Update DB
    await prisma.match.update({
      where: { id: matchId },
      data: { status: result.data.status },
    });

    revalidatePath("/supervisor");
    return {};
  } catch (e) {
    console.error("Failed to update match status:", e);
    return { error: "Failed to update match status" };
  }
}
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  try {
    await prisma.mentor.create({
      data: { name, email, phoneNumber },
    });
    revalidatePath("/supervisor");
  } catch (e) {
    console.error("Failed to create mentor:", e);
  }
}

export async function createParent(formData: FormData): Promise<void> {
  const name = formData.get("name") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  try {
    await prisma.parent.create({
      data: { name, phoneNumber },
    });
    revalidatePath("/supervisor");
  } catch (e) {
    console.error("Failed to create parent:", e);
  }
}

export async function createYoungPerson(formData: FormData): Promise<void> {
  const name = formData.get("name") as string;
  try {
    await prisma.youngPerson.create({
      data: { name },
    });
    revalidatePath("/supervisor");
  } catch (e) {
    console.error("Failed to create young person:", e);
  }
}

export async function createMatch(formData: FormData): Promise<void> {
  const mentorId = formData.get("mentorId") as string;
  const parentId = formData.get("parentId") as string;
  const youngPersonId = formData.get("youngPersonId") as string;
  const proxyNumber = formData.get("proxyNumber") as string;
  try {
    await prisma.match.create({
      data: {
        mentorId,
        parentId,
        youngPersonId,
        proxyNumber,
      },
    });
    revalidatePath("/supervisor");
  } catch (e) {
    console.error("Failed to create match:", e);
  }
}
