import { useQuery } from "@tanstack/react-query";
import { fetchStints } from "@/services/openf1";
import type { DriverStints, Stint, TireCompound } from "@/types/app";
import type { OpenF1Stint } from "@/types/openf1";

const VALID_COMPOUNDS = new Set(["SOFT", "MEDIUM", "HARD", "INTERMEDIATE", "WET"]);

function normalizeCompound(compound: string): TireCompound {
  const upper = compound.toUpperCase();
  if (VALID_COMPOUNDS.has(upper)) return upper as TireCompound;
  if (upper === "INTER") return "INTERMEDIATE";
  return "MEDIUM";
}

function transformStints(
  rawStints: OpenF1Stint[],
  driverNames: Map<number, { name: string; team: string; color: string }>,
): DriverStints[] {
  const byDriver = new Map<number, OpenF1Stint[]>();
  for (const stint of rawStints) {
    const existing = byDriver.get(stint.driver_number) ?? [];
    existing.push(stint);
    byDriver.set(stint.driver_number, existing);
  }

  const result: DriverStints[] = [];
  for (const [driverNumber, stints] of byDriver) {
    const driverInfo = driverNames.get(driverNumber);
    const mappedStints: Stint[] = stints.map((s) => ({
      driverNumber: s.driver_number,
      driverName: driverInfo?.name ?? `#${s.driver_number}`,
      teamColor: driverInfo?.color ?? "#71717A",
      stintNumber: s.stint_number,
      compound: normalizeCompound(s.compound),
      lapStart: s.lap_start,
      lapEnd: s.lap_end,
      lapCount: s.lap_end - s.lap_start + 1,
      tyreAgeAtStart: s.tyre_age_at_start,
    }));

    result.push({
      driverNumber,
      driverName: driverInfo?.name ?? `#${driverNumber}`,
      teamName: driverInfo?.team ?? "Unknown",
      teamColor: driverInfo?.color ?? "#71717A",
      stints: mappedStints.sort((a, b) => a.stintNumber - b.stintNumber),
    });
  }

  return result;
}

export { transformStints };

export function useStints(
  sessionKey: number | null,
  driverNames: Map<number, { name: string; team: string; color: string }> = new Map(),
) {
  return useQuery({
    queryKey: ["stints", sessionKey],
    queryFn: () => fetchStints({ session_key: sessionKey! }),
    enabled: sessionKey !== null,
    refetchInterval: 30_000,
    select: (data) => transformStints(data, driverNames),
  });
}
