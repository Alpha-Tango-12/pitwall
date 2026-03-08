import type { WeekendFormat } from "@/types/app";

export const STANDARD_WEEKEND: WeekendFormat = {
  type: "standard",
  sessions: [
    {
      name: "Free Practice 1",
      day: "Friday",
      description: "First practice session. Teams test setups, drivers learn the track, and engineers gather data.",
    },
    {
      name: "Free Practice 2",
      day: "Friday",
      description: "Second practice session. Teams refine setups based on FP1 data and simulate race conditions.",
    },
    {
      name: "Free Practice 3",
      day: "Saturday",
      description: "Final practice before qualifying. Last chance to fine-tune the car setup.",
    },
    {
      name: "Qualifying",
      day: "Saturday",
      description: "Three knockout rounds (Q1, Q2, Q3) to determine the starting grid. Slowest cars eliminated each round.",
    },
    {
      name: "Race",
      day: "Sunday",
      description: "The main event. Full race distance with pit stops, strategy, and wheel-to-wheel racing.",
    },
  ],
};

export const SPRINT_WEEKEND: WeekendFormat = {
  type: "sprint",
  sessions: [
    {
      name: "Free Practice 1",
      day: "Friday",
      description: "The only practice session of the weekend. Teams must nail their setup quickly.",
    },
    {
      name: "Sprint Qualifying",
      day: "Friday",
      description: "Three knockout rounds to set the grid for Saturday's Sprint race.",
    },
    {
      name: "Sprint",
      day: "Saturday",
      description: "A shorter race (~100km, about 1/3 race distance). Points for the top 8 finishers. No mandatory pit stops.",
    },
    {
      name: "Qualifying",
      day: "Saturday",
      description: "Three knockout rounds to determine Sunday's race starting grid.",
    },
    {
      name: "Race",
      day: "Sunday",
      description: "The main event. Full race distance with pit stops, strategy, and wheel-to-wheel racing.",
    },
  ],
};

export const POINTS_RACE = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1] as const;
export const POINTS_SPRINT = [8, 7, 6, 5, 4, 3, 2, 1] as const;
export const POINTS_FASTEST_LAP = 1;
