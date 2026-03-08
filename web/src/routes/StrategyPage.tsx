import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/common/Card";
import { TeamColorBar } from "@/components/common/TeamColorBar";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorCard } from "@/components/common/ErrorCard";
import { useRaceSchedule } from "@/hooks/useRaceSchedule";
import { useTeamStrategies } from "@/hooks/useTeamStrategies";
import { getTireColor } from "@/constants/tire-compounds";
import type { StrategyPrediction, TrackProfile, TireCompound } from "@/types/app";

const COMPOUND_ABBREV: Record<TireCompound, string> = {
  SOFT: "S",
  MEDIUM: "M",
  HARD: "H",
  INTERMEDIATE: "I",
  WET: "W",
};

const DEG_LABEL: Record<TrackProfile["tireDegradation"], string> = {
  low: "Low Deg",
  medium: "Medium Deg",
  high: "High Deg",
};

const DEG_COLOR: Record<TrackProfile["tireDegradation"], string> = {
  low: "text-green-400",
  medium: "text-yellow-400",
  high: "text-red-400",
};

const OVT_LABEL: Record<TrackProfile["overtakingDifficulty"], string> = {
  easy: "Easy to overtake",
  medium: "Some overtaking",
  hard: "Hard to overtake",
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

function TrackProfileCard({ profile }: { profile: TrackProfile }) {
  return (
    <Card>
      <h2 className="mb-4 text-lg font-semibold text-white">Track Profile</h2>

      {/* Stats row */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-zinc-800 p-3">
          <p className="text-xs text-zinc-500 mb-1">Laps</p>
          <p className="text-sm font-semibold text-white">{profile.laps}</p>
        </div>
        <div className="rounded-lg bg-zinc-800 p-3">
          <p className="text-xs text-zinc-500 mb-1">Length</p>
          <p className="text-sm font-semibold text-white">{profile.length}</p>
        </div>
        <div className="rounded-lg bg-zinc-800 p-3">
          <p className="text-xs text-zinc-500 mb-1">DRS Zones</p>
          <p className="text-sm font-semibold text-white">{profile.drsZones}</p>
        </div>
        <div className="rounded-lg bg-zinc-800 p-3">
          <p className="text-xs text-zinc-500 mb-1">Tire Deg</p>
          <p className={`text-sm font-semibold ${DEG_COLOR[profile.tireDegradation]}`}>
            {DEG_LABEL[profile.tireDegradation]}
          </p>
        </div>
      </div>

      {/* Lap record */}
      <div className="mb-4 rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 flex items-center justify-between gap-2">
        <span className="text-xs text-zinc-500">Lap Record</span>
        <span className="text-xs text-zinc-300 text-right">{profile.lapRecord}</span>
      </div>

      {/* Characteristics + overtaking */}
      <div className="mb-4 flex flex-wrap gap-2">
        {profile.characteristics.map((c) => (
          <span
            key={c}
            className="rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-300"
          >
            {c}
          </span>
        ))}
        <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400">
          {OVT_LABEL[profile.overtakingDifficulty]}
        </span>
      </div>

      {/* What makes it unique */}
      <p className="mb-4 text-sm text-zinc-400 leading-relaxed">{profile.whatMakesItUnique}</p>

      {/* Key corners */}
      {profile.keyCorners.length > 0 && (
        <div>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Key Corners
          </h3>
          <ul className="space-y-1.5">
            {profile.keyCorners.map((corner) => (
              <li key={corner} className="flex gap-2 text-sm">
                <span className="mt-0.5 shrink-0 text-f1-red">—</span>
                <span className="text-zinc-300">{corner}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
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
  const { data: schedule = [], isLoading: scheduleLoading } = useRaceSchedule("2026");
  const nextRace = schedule.find((r) => !r.isPast);

  const { data, isLoading: strategiesLoading, error } = useTeamStrategies(
    nextRace?.raceName,
    nextRace?.circuitName,
  );

  const isLoading = scheduleLoading || (!!nextRace && strategiesLoading);

  return (
    <div>
      <PageHeader
        title="Race Strategy"
        subtitle={nextRace ? `AI predictions for ${nextRace.raceName}` : "2026 Season"}
      />

      {isLoading && (
        <Card>
          <div className="flex flex-col items-center gap-3 py-6">
            <LoadingSpinner />
            <p className="text-sm text-zinc-500">
              {scheduleLoading ? "Loading schedule…" : "Analysing track & strategies with AI…"}
            </p>
          </div>
        </Card>
      )}

      {!isLoading && !nextRace && (
        <Card>
          <p className="py-4 text-center text-sm text-zinc-500">No upcoming race found.</p>
        </Card>
      )}

      {!isLoading && error && (
        <ErrorCard message="Could not load strategy predictions. Check the Vercel function logs for details." />
      )}

      {!isLoading && !error && data && (
        <div className="space-y-3">
          <TrackProfileCard profile={data.trackProfile} />

          <h2 className="px-1 pt-2 text-base font-semibold text-white">Team Strategies</h2>

          {data.strategies.map((s) => (
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
