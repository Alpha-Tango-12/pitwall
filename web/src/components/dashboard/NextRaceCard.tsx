import type { Race } from "@/types/app";
import { Card } from "@/components/common/Card";
import { Countdown } from "@/components/common/Countdown";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Badge } from "@/components/common/Badge";
import { MapPin } from "lucide-react";

interface NextRaceCardProps {
  race: Race | undefined;
  isLoading: boolean;
}

export function NextRaceCard({ race, isLoading }: NextRaceCardProps) {
  if (isLoading) {
    return (
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-white">Next Race</h2>
        <LoadingSpinner />
      </Card>
    );
  }

  if (!race) {
    return (
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-white">Next Race</h2>
        <p className="text-sm text-zinc-400">No upcoming races</p>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Next Race</h2>
        <Badge text={`Round ${race.round}`} />
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <h3 className="text-xl font-bold text-white">{race.raceName}</h3>
          <p className="text-sm text-zinc-400">{race.circuitName}</p>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-zinc-500">
          <MapPin className="h-3.5 w-3.5" />
          <span>
            {race.locality}, {race.country}
          </span>
        </div>

        {race.isSprint && (
          <Badge text="Sprint Weekend" variant="yellow" />
        )}

        <div className="pt-2">
          <Countdown targetDate={race.date} />
        </div>
      </div>
    </Card>
  );
}
