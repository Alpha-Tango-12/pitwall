import { format } from "date-fns";
import type { RaceSession } from "@/types/app";

interface SessionTimesProps {
  sessions: RaceSession[];
}

export function SessionTimes({ sessions }: SessionTimesProps) {
  return (
    <ul className="mt-3 space-y-1.5 border-t border-zinc-800 pt-3">
      {sessions.map((session) => (
        <li key={session.name} className="flex items-center justify-between text-sm">
          <span className="text-white">{session.name}</span>
          <span className="text-zinc-400">
            {format(session.date, "EEE, MMM d 'at' h:mm a")}
          </span>
        </li>
      ))}
    </ul>
  );
}
