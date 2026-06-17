"use client";

import { useTransition } from "react";
import { startSession, completeSession, cancelSession } from "@/app/actions/mentor";

interface Props {
  matchId: string;
  activeSessionId?: string;
}

export function MatchActionButtons({ matchId, activeSessionId }: Props) {
  let [isPending, startTransition] = useTransition();

  return (
    <div className="mt-6 flex gap-2">
      <button
        disabled={isPending || !!activeSessionId}
        onClick={() => startTransition(() => startSession(matchId))}
        className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
      >
        Start Session
      </button>
      <button
        disabled={isPending || !activeSessionId}
        onClick={() => startTransition(() => activeSessionId && completeSession(matchId, activeSessionId))}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Complete Session
      </button>
      <button
        disabled={isPending || !activeSessionId}
        onClick={() => startTransition(() => activeSessionId && cancelSession(matchId, activeSessionId))}
        className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
      >
        Cancel Session
      </button>
    </div>
  );
}
