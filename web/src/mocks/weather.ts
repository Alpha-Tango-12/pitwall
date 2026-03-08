import type { WeatherConditions } from "@/types/app";

export const MOCK_WEATHER: WeatherConditions = {
  airTemp: 28.5,
  trackTemp: 42.3,
  humidity: 55,
  pressure: 1013.2,
  rainfall: 0,
  windSpeed: 3.2,
  windDirection: 180,
  timestamp: new Date("2026-03-15T04:30:00Z"),
};

export const MOCK_WEATHER_RAINY: WeatherConditions = {
  airTemp: 18.2,
  trackTemp: 22.1,
  humidity: 92,
  pressure: 1005.8,
  rainfall: 1,
  windSpeed: 8.5,
  windDirection: 270,
  timestamp: new Date("2026-03-15T04:30:00Z"),
};
