import type { ConstructorStanding } from "@/types/app";
import { Card } from "@/components/common/Card";
import { TeamColorBar } from "@/components/common/TeamColorBar";

interface ConstructorStandingsTableProps {
  standings: ConstructorStanding[];
}

export function ConstructorStandingsTable({ standings }: ConstructorStandingsTableProps) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                <th className="px-4 py-3 w-12">Pos</th>
                <th className="px-4 py-3">Team</th>
                <th className="px-4 py-3 text-right">Pts</th>
                <th className="px-4 py-3 text-right">Wins</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {standings.map((team) => (
                <tr key={team.constructorId} className="bg-zinc-950 hover:bg-zinc-900/50">
                  <td className="px-4 py-3">
                    <span
                      className={`text-sm font-mono ${
                        team.position <= 3 ? "text-f1-red font-bold" : "text-zinc-400"
                      }`}
                    >
                      {team.position}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <TeamColorBar color={team.teamColor} className="h-8" />
                      <span className="text-sm font-medium text-white">{team.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-bold text-white">
                    {team.points}
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-zinc-400">
                    {team.wins}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {standings.map((team) => (
          <Card key={team.constructorId}>
            <div className="flex items-center gap-3">
              <span
                className={`w-8 text-center font-mono text-sm ${
                  team.position <= 3 ? "text-f1-red font-bold" : "text-zinc-400"
                }`}
              >
                {team.position}
              </span>
              <TeamColorBar color={team.teamColor} className="h-12" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{team.name}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">{team.points} pts</p>
                <p className="text-xs text-zinc-500">{team.wins} wins</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
