import { FLAGS } from "@/constants/flags";

export function FlagsSection() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {FLAGS.map((flag) => (
        <div
          key={flag.name}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
        >
          <div className="mb-3 flex items-center gap-3">
            <div
              className="h-10 w-10 shrink-0 rounded-full border border-zinc-700"
              style={{ background: flag.color }}
            />
            <span className="font-semibold text-white">{flag.name}</span>
          </div>
          <p className="mb-3 text-sm text-zinc-300">{flag.meaning}</p>
          <div className="flex items-start gap-2">
            <span className="shrink-0 text-xs font-medium text-zinc-500">Driver action:</span>
            <span className="text-xs text-zinc-400">{flag.driverAction}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
