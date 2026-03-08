import { Thermometer, Droplets, Wind, Gauge, CloudRain } from "lucide-react";
import { Card } from "@/components/common/Card";
import type { WeatherConditions } from "@/types/app";

interface WeatherPanelProps {
  weather: WeatherConditions;
}

function WeatherStat({
  icon: Icon,
  label,
  value,
  unit,
  highlight,
}: {
  icon: typeof Thermometer;
  label: string;
  value: string | number;
  unit: string;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-lg p-3 ${highlight ? "bg-blue-950/50 border border-blue-800" : "bg-zinc-800"}`}>
      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className={`mt-1 text-xl font-bold ${highlight ? "text-blue-300" : "text-white"}`}>
        {value}
        <span className="ml-0.5 text-sm font-normal text-zinc-400">{unit}</span>
      </p>
    </div>
  );
}

function getWindDirection(degrees: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(degrees / 45) % 8] ?? "N";
}

export function WeatherPanel({ weather }: WeatherPanelProps) {
  const isRaining = weather.rainfall > 0;

  return (
    <Card>
      {isRaining && (
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-blue-950/50 border border-blue-800 px-3 py-2 text-sm text-blue-300">
          <CloudRain className="h-4 w-4" />
          <span className="font-medium">Rain detected on track</span>
          <span className="text-blue-400">— tire strategy may change</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        <WeatherStat
          icon={Thermometer}
          label="Air Temp"
          value={weather.airTemp.toFixed(1)}
          unit="°C"
        />
        <WeatherStat
          icon={Thermometer}
          label="Track Temp"
          value={weather.trackTemp.toFixed(1)}
          unit="°C"
        />
        <WeatherStat
          icon={Droplets}
          label="Humidity"
          value={weather.humidity}
          unit="%"
        />
        <WeatherStat
          icon={Wind}
          label={`Wind (${getWindDirection(weather.windDirection)})`}
          value={weather.windSpeed.toFixed(1)}
          unit="m/s"
        />
        <WeatherStat
          icon={Gauge}
          label="Pressure"
          value={weather.pressure.toFixed(0)}
          unit="hPa"
        />
        <WeatherStat
          icon={CloudRain}
          label="Rainfall"
          value={weather.rainfall.toFixed(1)}
          unit="mm"
          highlight={isRaining}
        />
      </div>

      <p className="mt-3 text-xs text-zinc-600">
        Track is {weather.trackTemp - weather.airTemp > 10 ? "much " : ""}warmer than air — tires will
        degrade {weather.trackTemp > 45 ? "quickly" : "at a normal rate"}.
      </p>
    </Card>
  );
}
