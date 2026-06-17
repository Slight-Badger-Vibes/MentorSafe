import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MatchActionButtons } from "./MatchActionButtons";
import { ScheduleSessionForm } from "./ScheduleSessionForm";

interface MatchDetailProps {
  params: Promise<{ matchId: string }>;
}

export default async function MatchDetail({ params }: MatchDetailProps) {
  const { matchId } = await params;

  const match = await prisma.match.findUnique({
    where: { id: matchId },
    include: {
      youngPerson: true,
      parent: true,
      sessions: {
        orderBy: { scheduledAt: 'asc' },
      },
    },
  });

  if (!match) {
    notFound();
  }

  const activeSession = match.sessions.find(s => s.status === "Started");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Match Detail: {match.youngPerson.name}</h1>
      <div className="border rounded-lg p-4">
        <p><strong>Parent:</strong> {match.parent.name}</p>
        <p><strong>Status:</strong> {match.status}</p>
        
        <MatchActionButtons matchId={matchId} activeSessionId={activeSession?.id} />
        <ScheduleSessionForm matchId={matchId} />

        <div className="mt-6">
          <h3 className="font-semibold">Sessions</h3>
          <ul>
            {match.sessions.map(s => (
              <li key={s.id}>{s.scheduledAt.toLocaleString()} - {s.status}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
