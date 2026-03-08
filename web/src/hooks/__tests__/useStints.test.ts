import { describe, it, expect } from "vitest";
import { transformStints } from "../useStints";
import type { OpenF1Stint } from "@/types/openf1";

describe("useStints - transformStints", () => {
  const driverNames = new Map([
    [4, { name: "Lando Norris", team: "McLaren", color: "#F58020" }],
    [1, { name: "Max Verstappen", team: "Red Bull", color: "#1E5BC6" }],
  ]);

  it("groups stints by driver number", () => {
    const raw: OpenF1Stint[] = [
      { meeting_key: 1300, session_key: 9999, stint_number: 1, driver_number: 4, lap_start: 1, lap_end: 18, compound: "MEDIUM", tyre_age_at_start: 0 },
      { meeting_key: 1300, session_key: 9999, stint_number: 1, driver_number: 1, lap_start: 1, lap_end: 14, compound: "SOFT", tyre_age_at_start: 0 },
      { meeting_key: 1300, session_key: 9999, stint_number: 2, driver_number: 4, lap_start: 19, lap_end: 40, compound: "HARD", tyre_age_at_start: 0 },
    ];

    const result = transformStints(raw, driverNames);
    const norris = result.find((d) => d.driverNumber === 4);
    const verstappen = result.find((d) => d.driverNumber === 1);

    expect(norris!.stints).toHaveLength(2);
    expect(verstappen!.stints).toHaveLength(1);
  });

  it("calculates stint lap count", () => {
    const raw: OpenF1Stint[] = [
      { meeting_key: 1300, session_key: 9999, stint_number: 1, driver_number: 4, lap_start: 1, lap_end: 18, compound: "MEDIUM", tyre_age_at_start: 0 },
    ];

    const result = transformStints(raw, driverNames);
    expect(result[0]!.stints[0]!.lapCount).toBe(18);
  });

  it("merges driver names from driver data", () => {
    const raw: OpenF1Stint[] = [
      { meeting_key: 1300, session_key: 9999, stint_number: 1, driver_number: 4, lap_start: 1, lap_end: 18, compound: "MEDIUM", tyre_age_at_start: 0 },
    ];

    const result = transformStints(raw, driverNames);
    expect(result[0]!.driverName).toBe("Lando Norris");
    expect(result[0]!.teamColor).toBe("#F58020");
  });

  it("handles drivers with single stint", () => {
    const raw: OpenF1Stint[] = [
      { meeting_key: 1300, session_key: 9999, stint_number: 1, driver_number: 1, lap_start: 1, lap_end: 58, compound: "HARD", tyre_age_at_start: 0 },
    ];

    const result = transformStints(raw, driverNames);
    expect(result).toHaveLength(1);
    expect(result[0]!.stints).toHaveLength(1);
    expect(result[0]!.stints[0]!.lapCount).toBe(58);
  });

  it("handles drivers with 3+ stints", () => {
    const raw: OpenF1Stint[] = [
      { meeting_key: 1300, session_key: 9999, stint_number: 1, driver_number: 4, lap_start: 1, lap_end: 14, compound: "SOFT", tyre_age_at_start: 0 },
      { meeting_key: 1300, session_key: 9999, stint_number: 2, driver_number: 4, lap_start: 15, lap_end: 30, compound: "MEDIUM", tyre_age_at_start: 0 },
      { meeting_key: 1300, session_key: 9999, stint_number: 3, driver_number: 4, lap_start: 31, lap_end: 58, compound: "HARD", tyre_age_at_start: 0 },
    ];

    const result = transformStints(raw, driverNames);
    expect(result[0]!.stints).toHaveLength(3);
    expect(result[0]!.stints[0]!.compound).toBe("SOFT");
    expect(result[0]!.stints[1]!.compound).toBe("MEDIUM");
    expect(result[0]!.stints[2]!.compound).toBe("HARD");
  });
});
