import { Link } from "react-router-dom";
import type { DriverStanding, ConstructorStanding } from "@/types/app";
import { Card } from "@/components/common/Card";
import { TeamColorBar } from "@/components/common/TeamColorBar";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ChevronRight } from "lucide-react";

interface StandingsSnapshotProps {
  drivers: DriverStanding[];
  constructors: ConstructorStanding[];
  isLoading: boolean;
}

function DriverRow({ driver }: { driver: DriverStanding }) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="w-5 text-right text-sm font-medium text-zinc-500">
        {driver.position}
      </span>
      <TeamColorBar color={driver.teamColor} className="h-6" />
      <div className="flex-1 min-w-0">
        <span className="text-sm text-white">
          {driver.familyName}
          <span className="ml-1 text-zinc-500">{driver.code}</span>
        </span>
      </div>
      <span className="text-sm font-medium tabular-nums text-zinc-300">
        {driver.points}
      </span>
    </div>
  );
}

function ConstructorRow({ constructor: team }: { constructor: ConstructorStanding }) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="w-5 text-right text-sm font-medium text-zinc-500">
        {team.position}
      </span>
      <TeamColorBar color={team.teamColor} className="h-6" />
      <div className="flex-1 min-w-0">
        <span className="text-sm text-white truncate">{team.name}</span>
      </div>
      <span className="text-sm font-medium tabular-nums text-zinc-300">
        {team.points}
      </span>
    </div>
  );
}

export function StandingsSnapshot({ drivers, constructors, isLoading }: StandingsSnapshotProps) {
  if (isLoading) {
    return (
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-white">Standings</h2>
        <LoadingSpinner />
      </Card>
    );
  }

  const topDrivers = drivers.slice(0, 5);
  const topConstructors = constructors.slice(0, 5);

  return (
    <Card>
      <h2 className="mb-4 text-lg font-semibold text-white">Standings</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Drivers
          </h3>
          <div className="space-y-0.5">
            {topDrivers.map((driver) => (
              <DriverRow key={driver.driverId} driver={driver} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Constructors
          </h3>
          <div className="space-y-0.5">
            {topConstructors.map((team) => (
              <ConstructorRow key={team.constructorId} constructor={team} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-zinc-800 pt-3">
        <Link
          to="/standings"
          className="inline-flex items-center gap-1 text-sm font-medium text-f1-red transition-colors hover:text-red-400"
        >
          View all standings
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}
