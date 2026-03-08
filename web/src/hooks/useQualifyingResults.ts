import { useQuery } from "@tanstack/react-query";
import { fetchQualifyingResults } from "@/services/jolpica";
import { getTeamColor } from "@/constants/teams";
import type { QualifyingResult } from "@/types/app";
import type { JolpicaQualifyingResult } from "@/types/jolpica";

function transformQualifyingResult(raw: JolpicaQualifyingResult): QualifyingResult {
  return {
    position: Number(raw.position),
    driverId: raw.Driver.driverId,
    code: raw.Driver.code,
    givenName: raw.Driver.givenName,
    familyName: raw.Driver.familyName,
    constructorId: raw.Constructor.constructorId,
    constructorName: raw.Constructor.name,
    teamColor: getTeamColor(raw.Constructor.constructorId),
    q3: raw.Q3,
  };
}

export function useQualifyingResults(season: string = "current", round: string = "last") {
  return useQuery({
    queryKey: ["qualifyingResults", season, round],
    queryFn: () => fetchQualifyingResults(season, round),
    staleTime: 30 * 60 * 1000,
    select: (data) => data.map(transformQualifyingResult),
  });
}
