import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { fetchDrivers } from "@/services/openf1";
import type { OpenF1Driver } from "@/types/openf1";

type DriverInfo = { name: string; team: string; color: string };

function transformDrivers(drivers: OpenF1Driver[]): Map<number, DriverInfo> {
  const map = new Map<number, DriverInfo>();
  for (const d of drivers) {
    map.set(d.driver_number, {
      name: d.full_name,
      team: d.team_name,
      color: d.team_colour ? `#${d.team_colour}` : "#71717A",
    });
  }
  return map;
}

export function useDrivers(
  sessionKey: number | null,
): UseQueryResult<Map<number, DriverInfo>> {
  return useQuery({
    queryKey: ["drivers", sessionKey],
    queryFn: () => fetchDrivers({ session_key: sessionKey! }),
    enabled: sessionKey !== null,
    staleTime: Infinity,
    select: transformDrivers,
  });
}
