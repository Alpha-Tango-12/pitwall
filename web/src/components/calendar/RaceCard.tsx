import { useState } from "react";
import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Race } from "@/types/app";
import { Card } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { SessionTimes } from "@/components/calendar/SessionTimes";

interface RaceCardProps {
  race: Race;
  isNext: boolean;
}

export function RaceCard({ race, isNext }: RaceCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      className={`${race.isPast ? "opacity-50" : ""} ${isNext ? "border-l-2 border-l-f1-red" : ""}`}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-zinc-500">R{race.round}</span>
            {race.isSprint && <Badge text="Sprint" variant="yellow" />}
          </div>
          <h3 className="mt-1 text-base font-semibold text-white">{race.raceName}</h3>
          <p className="mt-0.5 text-sm text-zinc-400">
            {race.locality}, {race.country}
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            {format(race.date, "MMM d, yyyy")}
          </p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-2 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          aria-label={expanded ? "Collapse sessions" : "Expand sessions"}
        >
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>
      {expanded && <SessionTimes sessions={race.sessions} />}
    </Card>
  );
}
