import { useState } from "react";
import { format } from "date-fns";
import { AlertTriangle, Info, AlertOctagon } from "lucide-react";
import { Card } from "@/components/common/Card";
import type { RaceEvent, EventSeverity } from "@/types/app";

interface RaceEventsPanelProps {
  events: RaceEvent[];
}

const SEVERITY_STYLES: Record<
  EventSeverity,
  { border: string; bg: string; icon: typeof Info; iconColor: string }
> = {
  info: {
    border: "border-zinc-700",
    bg: "bg-zinc-900",
    icon: Info,
    iconColor: "text-zinc-400",
  },
  warning: {
    border: "border-yellow-800",
    bg: "bg-yellow-950/40",
    icon: AlertTriangle,
    iconColor: "text-yellow-400",
  },
  danger: {
    border: "border-red-800",
    bg: "bg-red-950/40",
    icon: AlertOctagon,
    iconColor: "text-f1-red",
  },
};

const FLAG_COLORS: Record<string, string> = {
  GREEN: "bg-green-500",
  YELLOW: "bg-yellow-400",
  "DOUBLE YELLOW": "bg-yellow-400",
  RED: "bg-red-500",
  CHEQUERED: "bg-white",
  BLUE: "bg-blue-500",
  BLACK: "bg-zinc-950 border border-zinc-500",
  "BLACK AND ORANGE": "bg-orange-500",
};

function FlagDot({ flag }: { flag: string }) {
  const classes = FLAG_COLORS[flag] ?? "bg-zinc-600";
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${classes}`} />;
}

// Categories that appear on TV broadcasts and matter to a casual fan.
// "Other" is operational noise (pit entry/exit messages, admin notices).
const TV_CATEGORIES = new Set(["Flag", "SafetyCar", "Vsc", "Drs"]);

export function RaceEventsPanel({ events }: RaceEventsPanelProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleEvents = showAll
    ? events
    : events.filter((e) => TV_CATEGORIES.has(e.category));

  if (events.length === 0) {
    return (
      <Card>
        <p className="text-center text-sm text-zinc-500">No events yet</p>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <button
          onClick={() => setShowAll(false)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            !showAll ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-300"
          }`}
        >
          Key Events
        </button>
        <button
          onClick={() => setShowAll(true)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            showAll ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-300"
          }`}
        >
          All
        </button>
      </div>

      {visibleEvents.length === 0 ? (
        <Card>
          <p className="text-center text-sm text-zinc-500">No events yet</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {visibleEvents.map((event, i) => {
            const style = SEVERITY_STYLES[event.severity];
            const Icon = style.icon;
            return (
              <div
                key={i}
                className={`rounded-xl border ${style.border} ${style.bg} p-3`}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${style.iconColor}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {event.flag && <FlagDot flag={event.flag} />}
                      <span className="text-xs font-semibold uppercase tracking-wide text-zinc-300">
                        {event.message}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-zinc-400">{event.explanation}</p>
                    <div className="mt-1.5 flex items-center gap-2 text-xs text-zinc-600">
                      {event.lapNumber !== null && (
                        <span>Lap {event.lapNumber}</span>
                      )}
                      {event.driverName && (
                        <span>· {event.driverName}</span>
                      )}
                      <span>· {format(event.timestamp, "HH:mm:ss")}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
