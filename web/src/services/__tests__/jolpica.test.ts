import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "@/test/msw/server";
import { fetchRaceSchedule, fetchDriverStandings, fetchConstructorStandings } from "../jolpica";

describe("jolpica service", () => {
  it("fetchRaceSchedule unwraps MRData envelope", async () => {
    const races = await fetchRaceSchedule("2026");
    expect(races).toHaveLength(1);
    expect(races[0]!.raceName).toBe("Australian Grand Prix");
  });

  it("fetchDriverStandings returns typed standings array", async () => {
    const standings = await fetchDriverStandings("2026");
    expect(standings).toHaveLength(1);
    expect(standings[0]!.Driver.familyName).toBe("Norris");
  });

  it("fetchConstructorStandings returns typed standings array", async () => {
    const standings = await fetchConstructorStandings("2026");
    expect(standings).toHaveLength(1);
    expect(standings[0]!.Constructor.name).toBe("McLaren");
  });

  it("handles current season param", async () => {
    const races = await fetchRaceSchedule("current");
    expect(races).toHaveLength(1);
  });

  it("handles API returning zero results", async () => {
    server.use(
      http.get("https://api.jolpi.ca/ergast/f1/:season/driverStandings.json", () => {
        return HttpResponse.json({
          MRData: {
            xmlns: "",
            series: "f1",
            url: "",
            limit: "30",
            offset: "0",
            total: "0",
            StandingsTable: {
              season: "2026",
              round: "0",
              StandingsLists: [],
            },
          },
        });
      }),
    );
    const standings = await fetchDriverStandings("2026");
    expect(standings).toEqual([]);
  });
});
