import { useCountdown } from "@/hooks/useCountdown";

interface CountdownProps {
  targetDate: Date;
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold tabular-nums text-white">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs text-zinc-500 uppercase">{label}</span>
    </div>
  );
}

export function Countdown({ targetDate }: CountdownProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  if (isExpired) {
    return (
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
        <span className="text-sm font-medium text-green-400">Live Now</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <TimeUnit value={days} label="days" />
      <span className="text-zinc-600">:</span>
      <TimeUnit value={hours} label="hrs" />
      <span className="text-zinc-600">:</span>
      <TimeUnit value={minutes} label="min" />
      <span className="text-zinc-600">:</span>
      <TimeUnit value={seconds} label="sec" />
    </div>
  );
}
