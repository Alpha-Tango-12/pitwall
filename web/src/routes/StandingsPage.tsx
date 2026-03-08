import { useAppStore } from "@/stores/app-store";
import { useDriverStandings } from "@/hooks/useDriverStandings";
import { useConstructorStandings } from "@/hooks/useConstructorStandings";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandingsToggle } from "@/components/standings/StandingsToggle";
import { DriverStandingsTable } from "@/components/standings/DriverStandingsTable";
import { ConstructorStandingsTable } from "@/components/standings/ConstructorStandingsTable";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorCard } from "@/components/common/ErrorCard";

export function StandingsPage() {
  const standingsTab = useAppStore((state) => state.standingsTab);
  const setStandingsTab = useAppStore((state) => state.setStandingsTab);

  const { data: drivers = [], isLoading: driversLoading, error: driversError } = useDriverStandings("2026");
  const { data: constructors = [], isLoading: constructorsLoading, error: constructorsError } = useConstructorStandings("2026");

  return (
    <div>
      <PageHeader title="Standings" />
      <StandingsToggle activeTab={standingsTab} onTabChange={setStandingsTab} />

      {standingsTab === "drivers" ? (
        driversLoading ? (
          <LoadingSpinner />
        ) : driversError ? (
          <ErrorCard message="Could not load driver standings. Please try again." />
        ) : (
          <DriverStandingsTable standings={drivers} />
        )
      ) : constructorsLoading ? (
        <LoadingSpinner />
      ) : constructorsError ? (
        <ErrorCard message="Could not load constructor standings. Please try again." />
      ) : (
        <ConstructorStandingsTable standings={constructors} />
      )}
    </div>
  );
}
