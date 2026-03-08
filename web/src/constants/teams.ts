export interface Team {
  id: string;
  name: string;
  shortName: string;
  color: string;
  drivers: [string, string];
}

export const TEAMS: Team[] = [
  {
    id: "red_bull",
    name: "Oracle Red Bull Racing",
    shortName: "Red Bull",
    color: "#1E5BC6",
    drivers: ["max_verstappen", "hadjar"],
  },
  {
    id: "ferrari",
    name: "Scuderia Ferrari HP",
    shortName: "Ferrari",
    color: "#ED1C24",
    drivers: ["leclerc", "hamilton"],
  },
  {
    id: "mclaren",
    name: "McLaren Mastercard F1 Team",
    shortName: "McLaren",
    color: "#F58020",
    drivers: ["norris", "piastri"],
  },
  {
    id: "mercedes",
    name: "Mercedes-AMG PETRONAS F1 Team",
    shortName: "Mercedes",
    color: "#6CD3BF",
    drivers: ["russell", "antonelli"],
  },
  {
    id: "aston_martin",
    name: "Aston Martin Aramco F1 Team",
    shortName: "Aston Martin",
    color: "#002420",
    drivers: ["alonso", "stroll"],
  },
  {
    id: "alpine",
    name: "BWT Alpine F1 Team",
    shortName: "Alpine",
    color: "#2293D1",
    drivers: ["gasly", "colapinto"],
  },
  {
    id: "williams",
    name: "Atlassian Williams F1 Team",
    shortName: "Williams",
    color: "#37BEDD",
    drivers: ["albon", "sainz"],
  },
  {
    id: "rb",
    name: "Visa Cash App Racing Bulls",
    shortName: "Racing Bulls",
    color: "#4E7C9B",
    drivers: ["lawson", "lindblad"],
  },
  {
    id: "haas",
    name: "TGR Haas F1 Team",
    shortName: "Haas",
    color: "#B6BABD",
    drivers: ["ocon", "bearman"],
  },
  {
    id: "sauber",
    name: "Audi Revolut F1 Team",
    shortName: "Audi",
    color: "#BB0A30",
    drivers: ["hulkenberg", "bortoleto"],
  },
  {
    id: "cadillac",
    name: "Cadillac Formula 1 Team",
    shortName: "Cadillac",
    color: "#1C1C1C",
    drivers: ["bottas", "perez"],
  },
];

export const TEAM_BY_ID = new Map(TEAMS.map((t) => [t.id, t]));

export const TEAM_BY_CONSTRUCTOR_ID = TEAM_BY_ID;

export function getTeamColor(constructorId: string): string {
  return TEAM_BY_ID.get(constructorId)?.color ?? "#71717A";
}
