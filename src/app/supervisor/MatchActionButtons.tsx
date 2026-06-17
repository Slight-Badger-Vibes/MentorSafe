"use client";

import { updateMatchStatus } from "../actions/supervisor";
import { useState } from "react";

export function MatchActionButtons({ matchId, currentStatus }: { matchId: string; currentStatus: string }) {
  const [loading, setLoading] = useState(false);

  async function handleAction(status: "Active" | "Suspended" | "Terminated") {
    setLoading(true);
    await updateMatchStatus(matchId, status);
    setLoading(false);
  }

  return (
    <div className="flex gap-2">
      {currentStatus !== "Active" && (
        <button onClick={() => handleAction("Active")} disabled={loading} className="text-xs bg-green-100 p-1 rounded">Activate</button>
      )}
      {currentStatus !== "Suspended" && (
        <button onClick={() => handleAction("Suspended")} disabled={loading} className="text-xs bg-yellow-100 p-1 rounded">Suspend</button>
      )}
      {currentStatus !== "Terminated" && (
        <button onClick={() => handleAction("Terminated")} disabled={loading} className="text-xs bg-red-100 p-1 rounded">Terminate</button>
      )}
    </div>
  );
}
