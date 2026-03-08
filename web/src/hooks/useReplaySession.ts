import type { RaceEvent, DriverStints, WeatherConditions } from "@/types/app";
import { MOCK_RACE_EVENTS } from "@/mocks/race-control";
import { MOCK_DRIVER_STINTS } from "@/mocks/stints";
import { MOCK_WEATHER } from "@/mocks/weather";

const TOTAL_LAPS = 58;

export function useReplaySession(enabled = true): {
  sessionKey: number | null;
  raceName: string;
  events: RaceEvent[];
  drivers: DriverStints[];
  weather: WeatherConditions | null;
  totalLaps: number;
  isLoading: boolean;
  error: Error | null;
} {
  if (!enabled) {
    return {
      sessionKey: null,
      raceName: "2026 Australian Grand Prix",
      events: [],
      drivers: [],
      weather: null,
      totalLaps: TOTAL_LAPS,
      isLoading: false,
      error: null,
    };
  }

  return {
    sessionKey: null,
    raceName: "2026 Australian Grand Prix",
    events: [...MOCK_RACE_EVENTS].sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
    ),
    drivers: MOCK_DRIVER_STINTS,
    weather: MOCK_WEATHER,
    totalLaps: TOTAL_LAPS,
    isLoading: false,
    error: null,
  };
}
