"use client";

import { useTransition } from "react";
import { scheduleSession } from "@/app/actions/mentor";

export function ScheduleSessionForm({ matchId }: { matchId: string }) {
  let [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        const date = new Date(formData.get("date") as string);
        startTransition(() => scheduleSession(matchId, date));
      }}
      className="mt-6 p-4 border rounded-lg"
    >
      <h3 className="font-semibold mb-2">Schedule Session</h3>
      <input type="datetime-local" name="date" required className="border p-2 rounded" />
      <button
        disabled={isPending}
        className="ml-2 px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
      >
        Schedule
      </button>
    </form>
  );
}
