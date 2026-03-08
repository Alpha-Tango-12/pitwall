import { useState } from "react";
import { STANDARD_WEEKEND, SPRINT_WEEKEND } from "@/constants/weekend-format";
import type { WeekendFormat } from "@/types/app";

type Format = "standard" | "sprint";

function groupByDay(format: WeekendFormat) {
  const days: Record<string, typeof format.sessions> = {};
  for (const session of format.sessions) {
    if (!days[session.day]) days[session.day] = [];
    days[session.day]!.push(session);
  }
  return days;
}

export function WeekendSection() {
  const [format, setFormat] = useState<Format>("standard");
  const weekend = format === "standard" ? STANDARD_WEEKEND : SPRINT_WEEKEND;
  const grouped = groupByDay(weekend);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["standard", "sprint"] as Format[]).map((f) => (
          <button
            key={f}
            onClick={() => setFormat(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              format === f
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-zinc-300"
            }`}
          >
            {f === "standard" ? "Standard" : "Sprint"}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {Object.entries(grouped).map(([day, sessions]) => (
          <div key={day}>
            <div className="mb-2 border-b border-zinc-800 pb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {day}
              </span>
            </div>
            <div className="relative ml-3 space-y-3 border-l-2 border-zinc-700 pl-5">
              {sessions.map((session) => (
                <div key={session.name} className="relative">
                  <div className="absolute -left-[1.625rem] top-1.5 h-2.5 w-2.5 rounded-full bg-zinc-600" />
                  <p className="font-medium text-white">{session.name}</p>
                  <p className="text-sm text-zinc-400">{session.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
