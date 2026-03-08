import { describe, it, expect } from "vitest";
import {
  STANDARD_WEEKEND,
  SPRINT_WEEKEND,
  POINTS_RACE,
  POINTS_SPRINT,
  POINTS_FASTEST_LAP,
} from "../weekend-format";

describe("weekend-format", () => {
  it("standard weekend has 5 sessions", () => {
    expect(STANDARD_WEEKEND.sessions).toHaveLength(5);
  });

  it("sprint weekend has 5 sessions", () => {
    expect(SPRINT_WEEKEND.sessions).toHaveLength(5);
  });

  it("standard weekend type is standard", () => {
    expect(STANDARD_WEEKEND.type).toBe("standard");
  });

  it("sprint weekend type is sprint", () => {
    expect(SPRINT_WEEKEND.type).toBe("sprint");
  });

  it("standard weekend includes FP1, FP2, FP3, Qualifying, Race", () => {
    const names = STANDARD_WEEKEND.sessions.map((s) => s.name);
    expect(names).toContain("Free Practice 1");
    expect(names).toContain("Free Practice 2");
    expect(names).toContain("Free Practice 3");
    expect(names).toContain("Qualifying");
    expect(names).toContain("Race");
  });

  it("sprint weekend includes Sprint and Sprint Qualifying", () => {
    const names = SPRINT_WEEKEND.sessions.map((s) => s.name);
    expect(names).toContain("Sprint");
    expect(names).toContain("Sprint Qualifying");
  });

  it("every session has a non-empty description", () => {
    for (const session of [...STANDARD_WEEKEND.sessions, ...SPRINT_WEEKEND.sessions]) {
      expect(session.description.length).toBeGreaterThan(0);
    }
  });

  it("race points awards top 10 positions", () => {
    expect(POINTS_RACE).toHaveLength(10);
    expect(POINTS_RACE[0]).toBe(25);
  });

  it("sprint points awards top 8 positions", () => {
    expect(POINTS_SPRINT).toHaveLength(8);
    expect(POINTS_SPRINT[0]).toBe(8);
  });

  it("fastest lap bonus is 1 point", () => {
    expect(POINTS_FASTEST_LAP).toBe(1);
  });
});
