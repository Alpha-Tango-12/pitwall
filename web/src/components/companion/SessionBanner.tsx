interface SessionBannerProps {
  sessionName: string;
  raceName: string;
  isLive: boolean;
  isReplay?: boolean;
  useMockData: boolean;
  onToggleMock: (value: boolean) => void;
}

export function SessionBanner({
  sessionName,
  raceName,
  isLive,
  isReplay,
  useMockData,
  onToggleMock,
}: SessionBannerProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
      <div className="flex items-center gap-3">
        {isLive ? (
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-f1-red" />
            <span className="text-xs font-semibold uppercase tracking-wider text-f1-red">
              Live
            </span>
          </span>
        ) : isReplay ? (
          <span className="rounded-full bg-indigo-950 px-2 py-0.5 text-xs font-medium text-indigo-400">
            Replay
          </span>
        ) : (
          <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-400">
            No session
          </span>
        )}
        <div>
          <p className="text-sm font-semibold text-white">{raceName}</p>
          <p className="text-xs text-zinc-400">{sessionName}</p>
        </div>
      </div>

      <button
        onClick={() => onToggleMock(!useMockData)}
        className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200"
      >
        {useMockData ? "Go Live" : "Watch a Replay"}
      </button>
    </div>
  );
}
