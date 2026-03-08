import type { DriverStanding } from "@/types/app";

export const MOCK_DRIVER_STANDINGS: DriverStanding[] = [
  { position: 1, driverId: "norris", code: "NOR", givenName: "Lando", familyName: "Norris", nationality: "British", points: 51, wins: 2, constructorId: "mclaren", constructorName: "McLaren", teamColor: "#F58020" },
  { position: 2, driverId: "max_verstappen", code: "VER", givenName: "Max", familyName: "Verstappen", nationality: "Dutch", points: 43, wins: 1, constructorId: "red_bull", constructorName: "Red Bull", teamColor: "#1E5BC6" },
  { position: 3, driverId: "leclerc", code: "LEC", givenName: "Charles", familyName: "Leclerc", nationality: "Monegasque", points: 38, wins: 1, constructorId: "ferrari", constructorName: "Ferrari", teamColor: "#ED1C24" },
  { position: 4, driverId: "hamilton", code: "HAM", givenName: "Lewis", familyName: "Hamilton", nationality: "British", points: 36, wins: 0, constructorId: "ferrari", constructorName: "Ferrari", teamColor: "#ED1C24" },
  { position: 5, driverId: "piastri", code: "PIA", givenName: "Oscar", familyName: "Piastri", nationality: "Australian", points: 34, wins: 0, constructorId: "mclaren", constructorName: "McLaren", teamColor: "#F58020" },
  { position: 6, driverId: "russell", code: "RUS", givenName: "George", familyName: "Russell", nationality: "British", points: 28, wins: 0, constructorId: "mercedes", constructorName: "Mercedes", teamColor: "#6CD3BF" },
  { position: 7, driverId: "antonelli", code: "ANT", givenName: "Kimi", familyName: "Antonelli", nationality: "Italian", points: 20, wins: 0, constructorId: "mercedes", constructorName: "Mercedes", teamColor: "#6CD3BF" },
  { position: 8, driverId: "alonso", code: "ALO", givenName: "Fernando", familyName: "Alonso", nationality: "Spanish", points: 18, wins: 0, constructorId: "aston_martin", constructorName: "Aston Martin", teamColor: "#002420" },
  { position: 9, driverId: "sainz", code: "SAI", givenName: "Carlos", familyName: "Sainz", nationality: "Spanish", points: 15, wins: 0, constructorId: "williams", constructorName: "Williams", teamColor: "#37BEDD" },
  { position: 10, driverId: "gasly", code: "GAS", givenName: "Pierre", familyName: "Gasly", nationality: "French", points: 12, wins: 0, constructorId: "alpine", constructorName: "Alpine", teamColor: "#2293D1" },
];
