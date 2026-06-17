"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function startSession(matchId: string) {
  await prisma.session.create({
    data: {
      matchId,
      status: "Started",
      scheduledAt: new Date(),
      startedAt: new Date(),
    },
  });
  revalidatePath(`/mentor/match/${matchId}`);
}

export async function completeSession(matchId: string, sessionId: string) {
  await prisma.session.update({
    where: { id: sessionId },
    data: {
      status: "Completed",
      completedAt: new Date(),
    },
  });
  revalidatePath(`/mentor/match/${matchId}`);
}

export async function scheduleSession(matchId: string, scheduledAt: Date) {
  await prisma.session.create({
    data: {
      matchId,
      status: "Scheduled",
      scheduledAt,
    },
  });
  revalidatePath(`/mentor/match/${matchId}`);
}
