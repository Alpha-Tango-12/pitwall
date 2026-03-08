import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "@/services/openf1";
import type { WeatherConditions } from "@/types/app";
import type { OpenF1Weather } from "@/types/openf1";

function transformWeather(raw: OpenF1Weather): WeatherConditions {
  return {
    airTemp: raw.air_temperature,
    trackTemp: raw.track_temperature,
    humidity: raw.humidity,
    pressure: raw.pressure,
    rainfall: raw.rainfall,
    windSpeed: raw.wind_speed,
    windDirection: raw.wind_direction,
    timestamp: new Date(raw.date),
  };
}

export function useWeather(sessionKey: number | null) {
  return useQuery({
    queryKey: ["weather", sessionKey],
    queryFn: () => fetchWeather({ session_key: sessionKey! }),
    enabled: sessionKey !== null,
    refetchInterval: 60_000,
    select: (data) => {
      if (data.length === 0) return null;
      const latest = data[data.length - 1]!;
      return transformWeather(latest);
    },
  });
}
