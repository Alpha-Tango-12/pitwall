import { useQuery } from "@tanstack/react-query";
import { fetchDriverStandings } from "@/services/jolpica";
import { getTeamColor } from "@/constants/teams";
import type { DriverStanding } from "@/types/app";
import type { JolpicaDriverStanding } from "@/types/jolpica";

function transformDriverStanding(raw: JolpicaDriverStanding): DriverStanding {
  const constructor = raw.Constructors[0];
  return {
    position: Number(raw.position),
    driverId: raw.Driver.driverId,
    code: raw.Driver.code,
    givenName: raw.Driver.givenName,
    familyName: raw.Driver.familyName,
    nationality: raw.Driver.nationality,
    points: Number(raw.points),
    wins: Number(raw.wins),
    constructorId: constructor?.constructorId ?? "unknown",
    constructorName: constructor?.name ?? "Unknown",
    teamColor: getTeamColor(constructor?.constructorId ?? ""),
  };
}

export function useDriverStandings(season: string = "current") {
  return useQuery({
    queryKey: ["driverStandings", season],
    queryFn: () => fetchDriverStandings(season),
    staleTime: 5 * 60 * 1000,
    select: (data) => data.map(transformDriverStanding),
  });
}
