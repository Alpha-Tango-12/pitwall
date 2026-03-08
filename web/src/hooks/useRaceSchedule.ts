import { useQuery } from "@tanstack/react-query";
import { fetchRaceSchedule } from "@/services/jolpica";
import type { Race, RaceSession } from "@/types/app";
import type { JolpicaRace } from "@/types/jolpica";

function transformRace(raw: JolpicaRace): Race {
  const raceDate = new Date(`${raw.date}T${raw.time}`);
  const isSprint = !!raw.Sprint;
  const isPast = raceDate < new Date();

  const sessions: RaceSession[] = [];
  if (raw.FirstPractice) {
    sessions.push({
      name: "Free Practice 1",
      date: new Date(`${raw.FirstPractice.date}T${raw.FirstPractice.time}`),
    });
  }
  if (raw.SecondPractice) {
    sessions.push({
      name: "Free Practice 2",
      date: new Date(`${raw.SecondPractice.date}T${raw.SecondPractice.time}`),
    });
  }
  if (raw.ThirdPractice) {
    sessions.push({
      name: "Free Practice 3",
      date: new Date(`${raw.ThirdPractice.date}T${raw.ThirdPractice.time}`),
    });
  }
  if (raw.SprintQualifying) {
    sessions.push({
      name: "Sprint Qualifying",
      date: new Date(`${raw.SprintQualifying.date}T${raw.SprintQualifying.time}`),
    });
  }
  if (raw.Sprint) {
    sessions.push({
      name: "Sprint",
      date: new Date(`${raw.Sprint.date}T${raw.Sprint.time}`),
    });
  }
  if (raw.Qualifying) {
    sessions.push({
      name: "Qualifying",
      date: new Date(`${raw.Qualifying.date}T${raw.Qualifying.time}`),
    });
  }
  sessions.push({ name: "Race", date: raceDate });

  sessions.sort((a, b) => a.date.getTime() - b.date.getTime());

  return {
    round: Number(raw.round),
    raceName: raw.raceName,
    circuitId: raw.Circuit.circuitId,
    circuitName: raw.Circuit.circuitName,
    locality: raw.Circuit.Location.locality,
    country: raw.Circuit.Location.country,
    date: raceDate,
    time: raw.time,
    isSprint,
    isPast,
    sessions,
  };
}

export function useRaceSchedule(season: string = "current") {
  return useQuery({
    queryKey: ["raceSchedule", season],
    queryFn: () => fetchRaceSchedule(season),
    staleTime: 60 * 60 * 1000,
    select: (data) =>
      data.map(transformRace).sort((a, b) => a.round - b.round),
  });
}
