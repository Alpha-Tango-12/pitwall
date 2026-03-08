import type { DriverStanding } from "@/types/app";
import { Card } from "@/components/common/Card";
import { TeamColorBar } from "@/components/common/TeamColorBar";

interface DriverStandingsTableProps {
  standings: DriverStanding[];
}

export function DriverStandingsTable({ standings }: DriverStandingsTableProps) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                <th className="px-4 py-3 w-12">Pos</th>
                <th className="px-4 py-3">Driver</th>
                <th className="px-4 py-3">Team</th>
                <th className="px-4 py-3 text-right">Pts</th>
                <th className="px-4 py-3 text-right">Wins</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {standings.map((driver) => (
                <tr key={driver.driverId} className="bg-zinc-950 hover:bg-zinc-900/50">
                  <td className="px-4 py-3">
                    <span
                      className={`text-sm font-mono ${
                        driver.position <= 3 ? "text-f1-red font-bold" : "text-zinc-400"
                      }`}
                    >
                      {driver.position}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <TeamColorBar color={driver.teamColor} className="h-8" />
                      <span className="text-sm font-medium text-white">
                        {driver.givenName} {driver.familyName}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-500">
                    {driver.constructorName}
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-bold text-white">
                    {driver.points}
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-zinc-400">
                    {driver.wins}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {standings.map((driver) => (
          <Card key={driver.driverId}>
            <div className="flex items-center gap-3">
              <span
                className={`w-8 text-center font-mono text-sm ${
                  driver.position <= 3 ? "text-f1-red font-bold" : "text-zinc-400"
                }`}
              >
                {driver.position}
              </span>
              <TeamColorBar color={driver.teamColor} className="h-12" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">
                  {driver.givenName} {driver.familyName}
                </p>
                <p className="text-xs text-zinc-500">{driver.constructorName}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">{driver.points} pts</p>
                <p className="text-xs text-zinc-500">{driver.wins} wins</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
