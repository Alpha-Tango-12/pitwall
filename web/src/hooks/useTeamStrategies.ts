import { useQuery } from "@tanstack/react-query";
import { getTeamColor } from "@/constants/teams";
import type { StrategyPrediction, TrackProfile, TireCompound } from "@/types/app";

interface RawStrategy {
  constructorId: string;
  teamName: string;
  stops: number;
  compounds: string[];
  pitWindows: string[];
  prediction: string;
}

interface ApiResponse {
  trackProfile: TrackProfile;
  strategies: RawStrategy[];
}

export interface StrategiesResult {
  trackProfile: TrackProfile;
  strategies: StrategyPrediction[];
}

async function fetchStrategies(raceName: string, circuitName: string): Promise<StrategiesResult> {
  const res = await fetch("/api/strategy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ raceName, circuitName }),
  });

  if (!res.ok) throw new Error("Failed to fetch strategies");

  const data = (await res.json()) as ApiResponse;
  return {
    trackProfile: data.trackProfile,
    strategies: data.strategies.map((s) => ({
      ...s,
      compounds: s.compounds as TireCompound[],
      teamColor: getTeamColor(s.constructorId),
    })),
  };
}

export function useTeamStrategies(raceName: string | undefined, circuitName: string | undefined) {
  return useQuery({
    queryKey: ["teamStrategies", raceName, circuitName],
    queryFn: () => fetchStrategies(raceName!, circuitName!),
    enabled: !!raceName && !!circuitName,
    staleTime: 60 * 60 * 1000,
  });
}
