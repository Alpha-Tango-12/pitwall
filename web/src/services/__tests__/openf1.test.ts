import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "@/test/msw/server";
import { fetchSessions, fetchStints, fetchRaceControl, fetchWeather, fetchDrivers } from "../openf1";

describe("openf1 service", () => {
  it("fetchSessions builds correct URL with year param", async () => {
    const sessions = await fetchSessions({ year: 2026 });
    expect(sessions).toHaveLength(1);
    expect(sessions[0]!.session_name).toBe("Race");
  });

  it("fetchStints passes session_key as query param", async () => {
    const stints = await fetchStints({ session_key: 9999 });
    expect(stints).toHaveLength(2);
    expect(stints[0]!.compound).toBe("MEDIUM");
  });

  it("fetchRaceControl returns typed array", async () => {
    const events = await fetchRaceControl({ session_key: 9999 });
    expect(events).toHaveLength(1);
    expect(events[0]!.category).toBe("Flag");
  });

  it("fetchWeather returns weather entries", async () => {
    const weather = await fetchWeather({ session_key: 9999 });
    expect(weather).toHaveLength(1);
    expect(weather[0]!.air_temperature).toBe(28.5);
  });

  it("fetchDrivers returns driver list", async () => {
    const drivers = await fetchDrivers({ session_key: 9999 });
    expect(drivers).toHaveLength(1);
    expect(drivers[0]!.name_acronym).toBe("NOR");
  });

  it("empty response returns empty array", async () => {
    server.use(
      http.get("https://api.openf1.org/v1/stints", () => {
        return HttpResponse.json([]);
      }),
    );
    const stints = await fetchStints({ session_key: 9999 });
    expect(stints).toEqual([]);
  });
});
