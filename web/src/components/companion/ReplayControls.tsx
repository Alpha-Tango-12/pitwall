import { Play, Pause, RotateCcw } from "lucide-react";
import type { ReplaySpeed } from "@/types/app";

interface ReplayControlsProps {
  currentLap: number;
  totalLaps: number;
  isPlaying: boolean;
  speed: ReplaySpeed;
  onPlayPause: () => void;
  onSeek: (lap: number) => void;
  onSpeedChange: (speed: ReplaySpeed) => void;
  onReset: () => void;
}

const SPEEDS: ReplaySpeed[] = [0.5, 1, 2, 5];

export function ReplayControls({
  currentLap,
  totalLaps,
  isPlaying,
  speed,
  onPlayPause,
  onSeek,
  onSpeedChange,
  onReset,
}: ReplayControlsProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
      {/* Play/Pause */}
      <button
        onClick={onPlayPause}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-white transition-colors hover:bg-zinc-700"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>

      {/* Lap counter */}
      <span className="shrink-0 text-sm font-medium tabular-nums text-zinc-300">
        LAP {currentLap} / {totalLaps}
      </span>

      {/* Slider */}
      <input
        type="range"
        min={0}
        max={totalLaps}
        value={currentLap}
        onChange={(e) => onSeek(Number(e.target.value))}
        className="flex-1 accent-f1-red"
        aria-label="Seek to lap"
      />

      {/* Speed buttons */}
      <div className="flex shrink-0 gap-1">
        {SPEEDS.map((s) => (
          <button
            key={s}
            onClick={() => onSpeedChange(s)}
            className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
              speed === s
                ? "bg-zinc-700 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {s}×
          </button>
        ))}
      </div>

      {/* Reset */}
      <button
        onClick={onReset}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:text-zinc-200"
        aria-label="Reset replay"
      >
        <RotateCcw size={16} />
      </button>
    </div>
  );
}
