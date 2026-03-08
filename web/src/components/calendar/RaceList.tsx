import type { Race } from "@/types/app";
import { RaceCard } from "@/components/calendar/RaceCard";

interface RaceListProps {
  races: Race[];
}

export function RaceList({ races }: RaceListProps) {
  const nextRaceIndex = races.findIndex((race) => !race.isPast);

  return (
    <div className="flex flex-col gap-3">
      {races.map((race, index) => (
        <RaceCard
          key={race.round}
          race={race}
          isNext={index === nextRaceIndex}
        />
      ))}
    </div>
  );
}
