import { describe, it, expect } from "vitest";
import { TIRE_COMPOUNDS, TIRE_COMPOUND_MAP, getTireColor } from "../tire-compounds";

describe("tire-compounds", () => {
  it("has all 5 compounds defined", () => {
    expect(TIRE_COMPOUNDS).toHaveLength(5);
  });

  it("includes SOFT, MEDIUM, HARD, INTERMEDIATE, WET", () => {
    const compounds = TIRE_COMPOUNDS.map((t) => t.compound);
    expect(compounds).toContain("SOFT");
    expect(compounds).toContain("MEDIUM");
    expect(compounds).toContain("HARD");
    expect(compounds).toContain("INTERMEDIATE");
    expect(compounds).toContain("WET");
  });

  it("every compound has a valid hex color", () => {
    for (const tire of TIRE_COMPOUNDS) {
      expect(tire.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });

  it("every compound has a unique abbreviation", () => {
    const abbrevs = TIRE_COMPOUNDS.map((t) => t.abbreviation);
    expect(new Set(abbrevs).size).toBe(abbrevs.length);
  });

  it("every compound has a non-empty description", () => {
    for (const tire of TIRE_COMPOUNDS) {
      expect(tire.description.length).toBeGreaterThan(0);
    }
  });

  it("TIRE_COMPOUND_MAP returns correct compound", () => {
    const soft = TIRE_COMPOUND_MAP.get("SOFT");
    expect(soft).toBeDefined();
    expect(soft!.label).toBe("Soft");
  });

  it("getTireColor returns correct color for known compound", () => {
    expect(getTireColor("SOFT")).toBe("#EF4444");
  });

  it("getTireColor returns fallback for unknown compound", () => {
    expect(getTireColor("UNKNOWN" as never)).toBe("#71717A");
  });
});
