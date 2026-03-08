import { describe, it, expect } from "vitest";
import { FLAGS } from "../flags";

describe("flags", () => {
  it("has all key flag types", () => {
    const names = FLAGS.map((f) => f.name);
    expect(names).toContain("Green Flag");
    expect(names).toContain("Yellow Flag");
    expect(names).toContain("Red Flag");
    expect(names).toContain("Blue Flag");
    expect(names).toContain("Checkered Flag");
    expect(names).toContain("Black Flag");
  });

  it("every flag has a valid hex color", () => {
    for (const flag of FLAGS) {
      expect(flag.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });

  it("every flag has non-empty meaning", () => {
    for (const flag of FLAGS) {
      expect(flag.meaning.length).toBeGreaterThan(0);
    }
  });

  it("every flag has non-empty driverAction", () => {
    for (const flag of FLAGS) {
      expect(flag.driverAction.length).toBeGreaterThan(0);
    }
  });

  it("every flag has a non-empty name", () => {
    for (const flag of FLAGS) {
      expect(flag.name.length).toBeGreaterThan(0);
    }
  });
});
