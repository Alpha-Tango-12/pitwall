import { useQuery } from "@tanstack/react-query";
import { fetchConstructorStandings } from "@/services/jolpica";
import { getTeamColor } from "@/constants/teams";
import type { ConstructorStanding } from "@/types/app";
import type { JolpicaConstructorStanding } from "@/types/jolpica";

function transformConstructorStanding(
  raw: JolpicaConstructorStanding,
): ConstructorStanding {
  return {
    position: Number(raw.position),
    constructorId: raw.Constructor.constructorId,
    name: raw.Constructor.name,
    nationality: raw.Constructor.nationality,
    points: Number(raw.points),
    wins: Number(raw.wins),
    teamColor: getTeamColor(raw.Constructor.constructorId),
  };
}

export function useConstructorStandings(season: string = "current") {
  return useQuery({
    queryKey: ["constructorStandings", season],
    queryFn: () => fetchConstructorStandings(season),
    staleTime: 5 * 60 * 1000,
    select: (data) =>
      data
        .map(transformConstructorStanding)
        .sort((a, b) => a.position - b.position),
  });
}
