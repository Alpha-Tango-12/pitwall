import { fetchJolpica } from "./api-client";
import type {
  JolpicaRaceScheduleResponse,
  JolpicaDriverStandingsResponse,
  JolpicaConstructorStandingsResponse,
  JolpicaQualifyingResponse,
  JolpicaRace,
  JolpicaDriverStanding,
  JolpicaConstructorStanding,
  JolpicaQualifyingResult,
} from "@/types/jolpica";

export async function fetchRaceSchedule(
  season: string = "current",
): Promise<JolpicaRace[]> {
  const data = await fetchJolpica<JolpicaRaceScheduleResponse>(
    `${season}.json`,
  );
  return data.MRData.RaceTable.Races;
}

export async function fetchDriverStandings(
  season: string = "current",
): Promise<JolpicaDriverStanding[]> {
  const data = await fetchJolpica<JolpicaDriverStandingsResponse>(
    `${season}/driverStandings.json`,
  );
  const lists = data.MRData.StandingsTable.StandingsLists;
  return lists[0]?.DriverStandings ?? [];
}

export async function fetchConstructorStandings(
  season: string = "current",
): Promise<JolpicaConstructorStanding[]> {
  const data = await fetchJolpica<JolpicaConstructorStandingsResponse>(
    `${season}/constructorStandings.json`,
  );
  const lists = data.MRData.StandingsTable.StandingsLists;
  return lists[0]?.ConstructorStandings ?? [];
}

export async function fetchQualifyingResults(
  season: string = "current",
  round: string = "last",
): Promise<JolpicaQualifyingResult[]> {
  const data = await fetchJolpica<JolpicaQualifyingResponse>(
    `${season}/${round}/qualifying.json`,
  );
  const races = data.MRData.RaceTable.Races;
  return races[0]?.QualifyingResults ?? [];
}
