import { PageHeader } from "@/components/layout/PageHeader";
import { RaceList } from "@/components/calendar/RaceList";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorCard } from "@/components/common/ErrorCard";
import { useRaceSchedule } from "@/hooks/useRaceSchedule";

export function CalendarPage() {
  const { data: races = [], isLoading, error } = useRaceSchedule("2026");

  return (
    <div>
      <PageHeader title="Calendar" subtitle="2026 Season" />
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorCard message="Could not load the race schedule. Please try again." />
      ) : (
        <RaceList races={races} />
      )}
    </div>
  );
}
