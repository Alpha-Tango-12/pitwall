import { PageHeader } from "@/components/layout/PageHeader";
import { NextRaceCard } from "@/components/dashboard/NextRaceCard";
import { StandingsSnapshot } from "@/components/dashboard/StandingsSnapshot";
import { SeasonProgressBar } from "@/components/dashboard/SeasonProgressBar";
import { GridPositionsCard } from "@/components/dashboard/GridPositionsCard";
import { useRaceSchedule } from "@/hooks/useRaceSchedule";
import { useDriverStandings } from "@/hooks/useDriverStandings";
import { useConstructorStandings } from "@/hooks/useConstructorStandings";
import { useQualifyingResults } from "@/hooks/useQualifyingResults";

export function DashboardPage() {
  const { data: schedule = [], isLoading: scheduleLoading } = useRaceSchedule("2026");
  const { data: drivers = [], isLoading: driversLoading } = useDriverStandings("2026");
  const { data: constructors = [], isLoading: constructorsLoading } = useConstructorStandings("2026");
  const { data: grid = [], isLoading: gridLoading } = useQualifyingResults("2026", "last");

  const nextRace = schedule.find((race) => !race.isPast);
  const completedRaces = schedule.filter((race) => race.isPast).length;
  const totalRaces = schedule.length;

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="2026 Formula 1 Season" />

      <div className="space-y-4">
        <SeasonProgressBar
          completedRaces={completedRaces}
          totalRaces={totalRaces}
        />

        <NextRaceCard race={nextRace} isLoading={scheduleLoading} />

        <GridPositionsCard results={grid} isLoading={gridLoading} />

        <StandingsSnapshot
          drivers={drivers}
          constructors={constructors}
          isLoading={driversLoading || constructorsLoading}
        />
      </div>
    </div>
  );
}
