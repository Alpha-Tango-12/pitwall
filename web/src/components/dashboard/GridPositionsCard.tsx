import type { QualifyingResult } from "@/types/app";
import { Card } from "@/components/common/Card";
import { TeamColorBar } from "@/components/common/TeamColorBar";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

interface GridPositionsCardProps {
  results: QualifyingResult[];
  isLoading: boolean;
}

const POSITION_LABELS: Record<number, string> = {
  1: "P1",
  2: "P2",
  3: "P3",
};

function GridRow({ result }: { result: QualifyingResult }) {
  const label = POSITION_LABELS[result.position] ?? `P${result.position}`;
  const isTop3 = result.position <= 3;

  return (
    <div className="flex items-center gap-3 py-1.5">
      <span
        className={`w-7 text-right text-sm font-bold tabular-nums ${
          result.position === 1
            ? "text-yellow-400"
            : result.position === 2
              ? "text-zinc-300"
              : result.position === 3
                ? "text-amber-600"
                : "text-zinc-500"
        }`}
      >
        {label}
      </span>
      <TeamColorBar color={result.teamColor} className="h-6" />
      <div className="flex-1 min-w-0">
        <span className="text-sm text-white">
          {result.familyName}
          <span className="ml-1 text-zinc-500">{result.code}</span>
        </span>
        <p className="text-xs text-zinc-500 truncate">{result.constructorName}</p>
      </div>
      {isTop3 && result.q3 && (
        <span className="text-xs font-medium tabular-nums text-zinc-400">{result.q3}</span>
      )}
    </div>
  );
}

export function GridPositionsCard({ results, isLoading }: GridPositionsCardProps) {
  if (isLoading) {
    return (
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-white">Starting Grid</h2>
        <LoadingSpinner />
      </Card>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Starting Grid</h2>
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Qualifying
        </span>
      </div>

      <div className="space-y-0.5">
        {results.map((result) => (
          <GridRow key={result.driverId} result={result} />
        ))}
      </div>
    </Card>
  );
}
