import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/common/Card";
import { TeamColorBar } from "@/components/common/TeamColorBar";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorCard } from "@/components/common/ErrorCard";
import { useRaceSchedule } from "@/hooks/useRaceSchedule";
import { useTeamStrategies } from "@/hooks/useTeamStrategies";
import { getTireColor } from "@/constants/tire-compounds";
import type { StrategyPrediction, TireCompound } from "@/types/app";

const COMPOUND_ABBREV: Record<TireCompound, string> = {
  SOFT: "S",
  MEDIUM: "M",
  HARD: "H",
  INTERMEDIATE: "I",
  WET: "W",
};

function TireDot({ compound }: { compound: TireCompound }) {
  return (
    <span
      className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-zinc-950"
      style={{ backgroundColor: getTireColor(compound) }}
    >
      {COMPOUND_ABBREV[compound]}
    </span>
  );
}

function StrategyCard({ strategy }: { strategy: StrategyPrediction }) {
  return (
    <Card>
      <div className="flex items-start gap-3">
        <TeamColorBar color={strategy.teamColor} className="h-full min-h-[4rem]" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-base font-semibold text-white">{strategy.teamName}</h3>
            <span className="shrink-0 text-xs font-medium text-zinc-400">
              {strategy.stops}-stop
            </span>
          </div>

          <div className="mb-3 flex items-center gap-2">
            <span className="text-xs text-zinc-500">Stints</span>
            <div className="flex items-center gap-1">
              {strategy.compounds.map((c, i) => (
                <span key={i} className="flex items-center gap-1">
                  <TireDot compound={c} />
                  {i < strategy.compounds.length - 1 && (
                    <span className="text-zinc-600 text-xs">→</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {strategy.pitWindows.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {strategy.pitWindows.map((w, i) => (
                <span
                  key={i}
                  className="rounded-md border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300"
                >
                  Pit {i + 1}: {w}
                </span>
              ))}
            </div>
          )}

          <p className="text-sm text-zinc-400 leading-relaxed">{strategy.prediction}</p>
        </div>
      </div>
    </Card>
  );
}

export function StrategyPage() {
  const { data: schedule = [] } = useRaceSchedule("2026");
  const nextRace = schedule.find((r) => !r.isPast);

  const { data: strategies = [], isLoading, error } = useTeamStrategies(
    nextRace?.raceName,
    nextRace?.circuitName,
  );

  return (
    <div>
      <PageHeader
        title="Team Strategies"
        subtitle={nextRace ? `AI predictions for ${nextRace.raceName}` : "2026 Season"}
      />

      {isLoading && (
        <Card>
          <div className="flex flex-col items-center gap-3 py-6">
            <LoadingSpinner />
            <p className="text-sm text-zinc-500">Analysing strategies with AI…</p>
          </div>
        </Card>
      )}

      {!isLoading && error && (
        <ErrorCard message="Could not load strategy predictions. Make sure the API key is configured." />
      )}

      {!isLoading && !error && strategies.length > 0 && (
        <div className="space-y-3">
          {strategies.map((s) => (
            <StrategyCard key={s.constructorId} strategy={s} />
          ))}
          <p className="px-1 text-center text-xs text-zinc-600">
            AI-generated predictions · Not official team data
          </p>
        </div>
      )}
    </div>
  );
}
