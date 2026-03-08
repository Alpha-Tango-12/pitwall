export interface Race {
  round: number;
  raceName: string;
  circuitId: string;
  circuitName: string;
  locality: string;
  country: string;
  date: Date;
  time: string;
  isSprint: boolean;
  isPast: boolean;
  sessions: RaceSession[];
}

export interface RaceSession {
  name: string;
  date: Date;
}

export interface DriverStanding {
  position: number;
  driverId: string;
  code: string;
  givenName: string;
  familyName: string;
  nationality: string;
  points: number;
  wins: number;
  constructorId: string;
  constructorName: string;
  teamColor: string;
}

export interface ConstructorStanding {
  position: number;
  constructorId: string;
  name: string;
  nationality: string;
  points: number;
  wins: number;
  teamColor: string;
}

export interface QualifyingResult {
  position: number;
  driverId: string;
  code: string;
  givenName: string;
  familyName: string;
  constructorId: string;
  constructorName: string;
  teamColor: string;
  q3?: string;
}

export type TireCompound = "SOFT" | "MEDIUM" | "HARD" | "INTERMEDIATE" | "WET";

export interface Stint {
  driverNumber: number;
  driverName: string;
  teamColor: string;
  stintNumber: number;
  compound: TireCompound;
  lapStart: number;
  lapEnd: number;
  lapCount: number;
  tyreAgeAtStart: number;
}

export interface DriverStints {
  driverNumber: number;
  driverName: string;
  teamName: string;
  teamColor: string;
  stints: Stint[];
}

export type EventSeverity = "info" | "warning" | "danger";

export interface RaceEvent {
  timestamp: Date;
  lapNumber: number | null;
  driverNumber: number | null;
  driverName: string | null;
  category: string;
  flag: string | null;
  message: string;
  explanation: string;
  severity: EventSeverity;
}

export type TrackStatus =
  | "green"
  | "yellow"
  | "red"
  | "safety_car"
  | "vsc"
  | "unknown";

export interface WeatherConditions {
  airTemp: number;
  trackTemp: number;
  humidity: number;
  pressure: number;
  rainfall: number;
  windSpeed: number;
  windDirection: number;
  timestamp: Date;
}

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export interface SessionStatus {
  isLive: boolean;
  sessionKey: number | null;
  sessionName: string | null;
}

export type CompanionPanel = "events" | "tires" | "weather";
export type StandingsTab = "drivers" | "constructors";
export type ReplaySpeed = 0.5 | 1 | 2 | 5;
export type LearnSection =
  | "glossary"
  | "flags"
  | "weekend"
  | "strategy"
  | "points";

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: GlossaryCategory;
  relatedTerms?: string[];
}

export type GlossaryCategory =
  | "racing"
  | "technical"
  | "strategy"
  | "rules"
  | "tires";

export interface FlagInfo {
  name: string;
  color: string;
  meaning: string;
  driverAction: string;
}

export interface WeekendSession {
  name: string;
  day: string;
  description: string;
}

export interface WeekendFormat {
  type: "standard" | "sprint";
  sessions: WeekendSession[];
}
