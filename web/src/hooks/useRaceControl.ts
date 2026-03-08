import { useQuery } from "@tanstack/react-query";
import { fetchRaceControl } from "@/services/openf1";
import type { RaceEvent, EventSeverity } from "@/types/app";
import type { OpenF1RaceControl } from "@/types/openf1";

const FLAG_EXPLANATIONS: Record<string, { explanation: string; severity: EventSeverity }> = {
  GREEN: { explanation: "The track is clear. Normal racing resumes.", severity: "info" },
  YELLOW: { explanation: "Danger ahead — drivers must slow down. No overtaking allowed in that zone.", severity: "warning" },
  "DOUBLE YELLOW": { explanation: "Serious danger — the track may be blocked. Drivers must slow significantly.", severity: "warning" },
  RED: { explanation: "Session stopped! A serious incident means it's too dangerous to continue.", severity: "danger" },
  CHEQUERED: { explanation: "The session is over!", severity: "info" },
  BLUE: { explanation: "A faster car is approaching from behind to lap this driver.", severity: "info" },
  BLACK: { explanation: "The driver has been disqualified or must return to the pits immediately.", severity: "danger" },
  "BLACK AND ORANGE": { explanation: "The car has a mechanical issue that needs fixing in the pits.", severity: "warning" },
};

const CATEGORY_EXPLANATIONS: Record<string, { explanation: string; severity: EventSeverity }> = {
  SafetyCar: { explanation: "Safety car is out! All drivers must slow down and form a line behind it.", severity: "warning" },
  Vsc: { explanation: "Virtual Safety Car — drivers must stick to a speed limit instead of following an actual safety car.", severity: "warning" },
  Drs: { explanation: "DRS is now available. Drivers within 1 second of the car ahead can open their rear wing for extra speed.", severity: "info" },
};

function transformRaceControl(
  raw: OpenF1RaceControl,
  driverMap: Map<number, { name: string }>,
): RaceEvent {
  let explanation = raw.message;
  let severity: EventSeverity = "info";

  if (raw.flag && FLAG_EXPLANATIONS[raw.flag]) {
    const flagInfo = FLAG_EXPLANATIONS[raw.flag]!;
    explanation = flagInfo.explanation;
    severity = flagInfo.severity;
  } else if (CATEGORY_EXPLANATIONS[raw.category]) {
    const catInfo = CATEGORY_EXPLANATIONS[raw.category]!;
    explanation = catInfo.explanation;
    severity = catInfo.severity;
  }

  const driverName =
    raw.driver_number != null
      ? (driverMap.get(raw.driver_number)?.name ?? null)
      : null;

  return {
    timestamp: new Date(raw.date),
    lapNumber: raw.lap_number,
    driverNumber: raw.driver_number,
    driverName,
    category: raw.category,
    flag: raw.flag,
    message: raw.message,
    explanation,
    severity,
  };
}

export function useRaceControl(
  sessionKey: number | null,
  driverMap: Map<number, { name: string }> = new Map(),
) {
  return useQuery({
    queryKey: ["raceControl", sessionKey],
    queryFn: () => fetchRaceControl({ session_key: sessionKey! }),
    enabled: sessionKey !== null,
    refetchInterval: 10_000,
    select: (data) =>
      data
        .map((raw) => transformRaceControl(raw, driverMap))
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
  });
}
