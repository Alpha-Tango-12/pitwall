import { getTireColor } from "@/constants/tire-compounds";
import { TIRE_COMPOUND_MAP } from "@/constants/tire-compounds";
import { TeamColorBar } from "@/components/common/TeamColorBar";
import type { DriverStints, Stint } from "@/types/app";

interface TireStrategyPanelProps {
  drivers: DriverStints[];
  currentLap?: number;
}

export function TireStrategyPanel({ drivers, currentLap }: TireStrategyPanelProps) {
  if (drivers.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <p className="text-center text-sm text-zinc-500">No stint data yet</p>
      </div>
    );
  }

  const totalLaps = Math.max(
    ...drivers.flatMap((d) => d.stints.map((s) => s.lapEnd)),
  );

  function getVisibleStints(stints: Stint[]): Stint[] {
    if (currentLap === undefined) return stints;
    return stints.filter((s) => s.lapStart <= currentLap);
  }

  function getVisibleLaps(stint: Stint): number {
    if (currentLap === undefined) return stint.lapCount;
    return Math.min(stint.lapEnd, currentLap) - stint.lapStart + 1;
  }

  return (
    <div className="space-y-2">
      {drivers.map((driver) => {
        const visibleStints = getVisibleStints(driver.stints);
        if (currentLap !== undefined && visibleStints.length === 0) return null;

        return (
          <div
            key={driver.driverNumber}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-3"
          >
            <div className="flex items-center gap-2 pb-2">
              <TeamColorBar color={driver.teamColor} className="h-4" />
              <span className="text-sm font-semibold text-white">
                {driver.driverName}
              </span>
              <span className="text-xs text-zinc-500">{driver.teamName}</span>
            </div>

            {/* Stint bar */}
            <div className="flex h-7 overflow-hidden rounded-md">
              {visibleStints.map((stint) => {
                const visibleLaps = getVisibleLaps(stint);
                const widthPct = (visibleLaps / totalLaps) * 100;
                const color = getTireColor(stint.compound);
                const info = TIRE_COMPOUND_MAP.get(stint.compound);
                return (
                  <div
                    key={stint.stintNumber}
                    className="group relative flex items-center justify-center text-xs font-bold"
                    style={{
                      width: `${widthPct}%`,
                      backgroundColor: color,
                      color: "#18181B",
                    }}
                    title={`${info?.label ?? stint.compound} · Laps ${stint.lapStart}–${stint.lapEnd} (${stint.lapCount} laps)`}
                  >
                    {widthPct > 12 ? (info?.abbreviation ?? stint.compound[0]) : ""}
                  </div>
                );
              })}
            </div>

            {/* Stint detail chips */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {visibleStints.map((stint) => {
                const info = TIRE_COMPOUND_MAP.get(stint.compound);
                const visibleLaps = getVisibleLaps(stint);
                return (
                  <span
                    key={stint.stintNumber}
                    className="inline-flex items-center gap-1 rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: getTireColor(stint.compound) }}
                    />
                    {info?.label} · {visibleLaps}L
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
