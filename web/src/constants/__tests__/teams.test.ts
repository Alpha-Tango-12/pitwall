import { describe, it, expect } from "vitest";
import { TEAMS, TEAM_BY_ID, getTeamColor } from "../teams";

describe("teams", () => {
  it("has 11 teams for 2026 season", () => {
    expect(TEAMS).toHaveLength(11);
  });

  it("every team has a unique id", () => {
    const ids = TEAMS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every team has a valid hex color", () => {
    for (const team of TEAMS) {
      expect(team.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });

  it("every team has exactly 2 drivers", () => {
    for (const team of TEAMS) {
      expect(team.drivers).toHaveLength(2);
    }
  });

  it("every team has a non-empty name and shortName", () => {
    for (const team of TEAMS) {
      expect(team.name.length).toBeGreaterThan(0);
      expect(team.shortName.length).toBeGreaterThan(0);
    }
  });

  it("includes Cadillac as the new 2026 entry", () => {
    const cadillac = TEAMS.find((t) => t.id === "cadillac");
    expect(cadillac).toBeDefined();
    expect(cadillac!.shortName).toBe("Cadillac");
  });

  it("TEAM_BY_ID lookup returns correct team", () => {
    const ferrari = TEAM_BY_ID.get("ferrari");
    expect(ferrari).toBeDefined();
    expect(ferrari!.shortName).toBe("Ferrari");
  });

  it("getTeamColor returns correct color for known team", () => {
    expect(getTeamColor("mclaren")).toBe("#F58020");
  });

  it("getTeamColor returns fallback for unknown team", () => {
    expect(getTeamColor("unknown_team")).toBe("#71717A");
  });
});
