import type { DriverStints } from "@/types/app";

export const MOCK_DRIVER_STINTS: DriverStints[] = [
  {
    driverNumber: 4,
    driverName: "Lando Norris",
    teamName: "McLaren",
    teamColor: "#F58020",
    stints: [
      { driverNumber: 4, driverName: "Lando Norris", teamColor: "#F58020", stintNumber: 1, compound: "MEDIUM", lapStart: 1, lapEnd: 18, lapCount: 18, tyreAgeAtStart: 0 },
      { driverNumber: 4, driverName: "Lando Norris", teamColor: "#F58020", stintNumber: 2, compound: "HARD", lapStart: 19, lapEnd: 40, lapCount: 22, tyreAgeAtStart: 0 },
      { driverNumber: 4, driverName: "Lando Norris", teamColor: "#F58020", stintNumber: 3, compound: "MEDIUM", lapStart: 41, lapEnd: 58, lapCount: 18, tyreAgeAtStart: 0 },
    ],
  },
  {
    driverNumber: 1,
    driverName: "Max Verstappen",
    teamName: "Red Bull",
    teamColor: "#1E5BC6",
    stints: [
      { driverNumber: 1, driverName: "Max Verstappen", teamColor: "#1E5BC6", stintNumber: 1, compound: "SOFT", lapStart: 1, lapEnd: 14, lapCount: 14, tyreAgeAtStart: 0 },
      { driverNumber: 1, driverName: "Max Verstappen", teamColor: "#1E5BC6", stintNumber: 2, compound: "HARD", lapStart: 15, lapEnd: 38, lapCount: 24, tyreAgeAtStart: 0 },
      { driverNumber: 1, driverName: "Max Verstappen", teamColor: "#1E5BC6", stintNumber: 3, compound: "MEDIUM", lapStart: 39, lapEnd: 58, lapCount: 20, tyreAgeAtStart: 0 },
    ],
  },
  {
    driverNumber: 16,
    driverName: "Charles Leclerc",
    teamName: "Ferrari",
    teamColor: "#ED1C24",
    stints: [
      { driverNumber: 16, driverName: "Charles Leclerc", teamColor: "#ED1C24", stintNumber: 1, compound: "MEDIUM", lapStart: 1, lapEnd: 20, lapCount: 20, tyreAgeAtStart: 0 },
      { driverNumber: 16, driverName: "Charles Leclerc", teamColor: "#ED1C24", stintNumber: 2, compound: "HARD", lapStart: 21, lapEnd: 58, lapCount: 38, tyreAgeAtStart: 0 },
    ],
  },
  {
    driverNumber: 44,
    driverName: "Lewis Hamilton",
    teamName: "Ferrari",
    teamColor: "#ED1C24",
    stints: [
      { driverNumber: 44, driverName: "Lewis Hamilton", teamColor: "#ED1C24", stintNumber: 1, compound: "MEDIUM", lapStart: 1, lapEnd: 22, lapCount: 22, tyreAgeAtStart: 0 },
      { driverNumber: 44, driverName: "Lewis Hamilton", teamColor: "#ED1C24", stintNumber: 2, compound: "HARD", lapStart: 23, lapEnd: 42, lapCount: 20, tyreAgeAtStart: 0 },
      { driverNumber: 44, driverName: "Lewis Hamilton", teamColor: "#ED1C24", stintNumber: 3, compound: "SOFT", lapStart: 43, lapEnd: 58, lapCount: 16, tyreAgeAtStart: 0 },
    ],
  },
];
