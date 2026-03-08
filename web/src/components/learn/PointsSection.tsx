import { POINTS_RACE, POINTS_SPRINT, POINTS_FASTEST_LAP } from "@/constants/weekend-format";

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `P${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`;
}

export function PointsSection() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Race points */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <h3 className="mb-3 font-semibold text-white">Race Points</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-zinc-500">
                <th className="pb-2 text-left font-medium">Position</th>
                <th className="pb-2 text-right font-medium">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {POINTS_RACE.map((pts, i) => (
                <tr
                  key={i}
                  className={i === 0 ? "bg-zinc-800" : ""}
                >
                  <td className="py-2 text-zinc-300">{ordinal(i + 1)}</td>
                  <td className="py-2 text-right font-medium text-white">{pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sprint points */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <h3 className="mb-3 font-semibold text-white">Sprint Points</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-zinc-500">
                <th className="pb-2 text-left font-medium">Position</th>
                <th className="pb-2 text-right font-medium">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {POINTS_SPRINT.map((pts, i) => (
                <tr
                  key={i}
                  className={i === 0 ? "bg-zinc-800" : ""}
                >
                  <td className="py-2 text-zinc-300">{ordinal(i + 1)}</td>
                  <td className="py-2 text-right font-medium text-white">{pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
        <span className="text-sm text-zinc-400">
          <span className="font-medium text-white">Fastest Lap</span>{" "}
          — +{POINTS_FASTEST_LAP} point if you finish in the top 10
        </span>
      </div>
    </div>
  );
}
