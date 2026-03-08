import type { FlagInfo } from "@/types/app";

export const FLAGS: FlagInfo[] = [
  {
    name: "Green Flag",
    color: "#22C55E",
    meaning: "Track is clear — racing is on! Drivers can race at full speed.",
    driverAction: "Resume normal racing and push for position.",
  },
  {
    name: "Yellow Flag",
    color: "#EAB308",
    meaning: "Danger ahead in that section of the track. Could be a crash, debris, or a car stopped on track.",
    driverAction: "Slow down, no overtaking in the yellow zone. Be prepared to take evasive action.",
  },
  {
    name: "Double Yellow Flag",
    color: "#EAB308",
    meaning: "Serious danger ahead. The track may be partly or fully blocked.",
    driverAction: "Slow down significantly, no overtaking, be prepared to stop if necessary.",
  },
  {
    name: "Red Flag",
    color: "#EF4444",
    meaning: "Session stopped! A serious incident means it's too dangerous to continue.",
    driverAction: "Slow down immediately and return to the pit lane. The race is paused.",
  },
  {
    name: "Blue Flag",
    color: "#3B82F6",
    meaning: "You're about to be lapped. A faster car is right behind you.",
    driverAction: "Let the faster car pass within 3 blue flag signals or face a penalty.",
  },
  {
    name: "White Flag",
    color: "#F5F5F5",
    meaning: "Slow-moving vehicle on track. Could be a recovery vehicle or a very slow car.",
    driverAction: "Proceed with caution and be aware of the slower vehicle.",
  },
  {
    name: "Black Flag",
    color: "#1C1C1C",
    meaning: "You've been disqualified or must return to the pits immediately.",
    driverAction: "Come into the pit lane within the next lap. You may not continue racing.",
  },
  {
    name: "Black and Orange Flag",
    color: "#F97316",
    meaning: "Your car has a mechanical problem that could be dangerous.",
    driverAction: "Come to the pits to have the issue fixed before continuing.",
  },
  {
    name: "Checkered Flag",
    color: "#A1A1AA",
    meaning: "The session is over! The race is finished.",
    driverAction: "Complete the current lap and slow down. No more racing.",
  },
];
