import { Card } from "@/components/common/Card";

interface SeasonProgressBarProps {
  completedRaces: number;
  totalRaces: number;
}

export function SeasonProgressBar({ completedRaces, totalRaces }: SeasonProgressBarProps) {
  const progress = totalRaces > 0 ? (completedRaces / totalRaces) * 100 : 0;

  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Season Progress</h2>
        <span className="text-sm text-zinc-400">
          Round {completedRaces} of {totalRaces}
        </span>
      </div>

      <div className="mt-3">
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-f1-red transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Card>
  );
}
