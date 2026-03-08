import { fetchOpenF1 } from "./api-client";
import type {
  OpenF1Session,
  OpenF1Driver,
  OpenF1Stint,
  OpenF1RaceControl,
  OpenF1Weather,
  OpenF1Meeting,
} from "@/types/openf1";

export function fetchSessions(
  params: { year?: number; session_name?: string; meeting_key?: number } = {},
): Promise<OpenF1Session[]> {
  return fetchOpenF1<OpenF1Session>("sessions", params as Record<string, string | number>);
}

export function fetchDrivers(
  params: { session_key: number | "latest" },
): Promise<OpenF1Driver[]> {
  return fetchOpenF1<OpenF1Driver>("drivers", params as Record<string, string | number>);
}

export function fetchStints(
  params: { session_key: number | "latest" },
): Promise<OpenF1Stint[]> {
  return fetchOpenF1<OpenF1Stint>("stints", params as Record<string, string | number>);
}

export function fetchRaceControl(
  params: { session_key: number | "latest" },
): Promise<OpenF1RaceControl[]> {
  return fetchOpenF1<OpenF1RaceControl>("race_control", params as Record<string, string | number>);
}

export function fetchWeather(
  params: { session_key: number | "latest" },
): Promise<OpenF1Weather[]> {
  return fetchOpenF1<OpenF1Weather>("weather", params as Record<string, string | number>);
}

export function fetchMeetings(
  params: { year?: number } = {},
): Promise<OpenF1Meeting[]> {
  return fetchOpenF1<OpenF1Meeting>("meetings", params as Record<string, string | number>);
}
