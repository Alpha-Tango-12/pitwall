import type { TireCompound } from "@/types/app";

export interface TireCompoundInfo {
  compound: TireCompound;
  label: string;
  abbreviation: string;
  color: string;
  description: string;
}

export const TIRE_COMPOUNDS: TireCompoundInfo[] = [
  {
    compound: "SOFT",
    label: "Soft",
    abbreviation: "S",
    color: "#EF4444",
    description: "Fastest tire but wears out quickly. Used for qualifying and short stints.",
  },
  {
    compound: "MEDIUM",
    label: "Medium",
    abbreviation: "M",
    color: "#EAB308",
    description: "Balanced tire for speed and durability. The most versatile compound.",
  },
  {
    compound: "HARD",
    label: "Hard",
    abbreviation: "H",
    color: "#F5F5F5",
    description: "Slowest but longest-lasting tire. Used for long stints in races.",
  },
  {
    compound: "INTERMEDIATE",
    label: "Intermediate",
    abbreviation: "I",
    color: "#22C55E",
    description: "For damp conditions with light rain. Has shallow grooves to clear water.",
  },
  {
    compound: "WET",
    label: "Wet",
    abbreviation: "W",
    color: "#3B82F6",
    description: "For heavy rain. Deep grooves clear the most water from the track surface.",
  },
];

export const TIRE_COMPOUND_MAP = new Map(
  TIRE_COMPOUNDS.map((t) => [t.compound, t]),
);

export function getTireColor(compound: TireCompound): string {
  return TIRE_COMPOUND_MAP.get(compound)?.color ?? "#71717A";
}
