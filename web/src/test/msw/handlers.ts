import { http, HttpResponse } from "msw";

export const handlers = [
  // OpenF1 - Sessions
  http.get("https://api.openf1.org/v1/sessions", ({ request }) => {
    const url = new URL(request.url);
    const year = url.searchParams.get("year");
    if (year === "2026") {
      return HttpResponse.json([
        {
          session_key: 9999,
          session_type: "Race",
          session_name: "Race",
          date_start: "2026-03-15T04:00:00+00:00",
          date_end: "2026-03-15T06:00:00+00:00",
          meeting_key: 1300,
          circuit_key: 10,
          circuit_short_name: "Melbourne",
          country_key: 5,
          country_code: "AUS",
          country_name: "Australia",
          location: "Melbourne",
          gmt_offset: "11:00:00",
          year: 2026,
        },
      ]);
    }
    return HttpResponse.json([]);
  }),

  // OpenF1 - Stints
  http.get("https://api.openf1.org/v1/stints", () => {
    return HttpResponse.json([
      {
        meeting_key: 1300,
        session_key: 9999,
        stint_number: 1,
        driver_number: 4,
        lap_start: 1,
        lap_end: 18,
        compound: "MEDIUM",
        tyre_age_at_start: 0,
      },
      {
        meeting_key: 1300,
        session_key: 9999,
        stint_number: 2,
        driver_number: 4,
        lap_start: 19,
        lap_end: 40,
        compound: "HARD",
        tyre_age_at_start: 0,
      },
    ]);
  }),

  // OpenF1 - Race Control
  http.get("https://api.openf1.org/v1/race_control", () => {
    return HttpResponse.json([
      {
        meeting_key: 1300,
        session_key: 9999,
        date: "2026-03-15T04:15:30+00:00",
        driver_number: null,
        lap_number: 8,
        category: "Flag",
        flag: "YELLOW",
        scope: "Sector",
        sector: 2,
        qualifying_phase: null,
        message: "YELLOW IN SECTOR 2",
      },
    ]);
  }),

  // OpenF1 - Weather
  http.get("https://api.openf1.org/v1/weather", () => {
    return HttpResponse.json([
      {
        date: "2026-03-15T04:30:00+00:00",
        session_key: 9999,
        meeting_key: 1300,
        air_temperature: 28.5,
        track_temperature: 42.3,
        humidity: 55,
        pressure: 1013.2,
        rainfall: 0,
        wind_speed: 3.2,
        wind_direction: 180,
      },
    ]);
  }),

  // OpenF1 - Drivers
  http.get("https://api.openf1.org/v1/drivers", () => {
    return HttpResponse.json([
      {
        meeting_key: 1300,
        session_key: 9999,
        driver_number: 4,
        broadcast_name: "L NORRIS",
        full_name: "Lando NORRIS",
        name_acronym: "NOR",
        team_name: "McLaren",
        team_colour: "F58020",
        first_name: "Lando",
        last_name: "Norris",
        headshot_url: null,
        country_code: "GBR",
      },
    ]);
  }),

  // Jolpica - Schedule
  http.get("https://api.jolpi.ca/ergast/f1/:season.json", ({ params }) => {
    return HttpResponse.json({
      MRData: {
        xmlns: "",
        series: "f1",
        url: `https://api.jolpi.ca/ergast/f1/${params["season"] as string}.json`,
        limit: "30",
        offset: "0",
        total: "1",
        RaceTable: {
          season: params["season"] as string,
          Races: [
            {
              season: params["season"] as string,
              round: "1",
              url: "https://en.wikipedia.org/wiki/2026_Australian_Grand_Prix",
              raceName: "Australian Grand Prix",
              Circuit: {
                circuitId: "albert_park",
                url: "https://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit",
                circuitName: "Albert Park Grand Prix Circuit",
                Location: {
                  lat: "-37.8497",
                  long: "144.968",
                  locality: "Melbourne",
                  country: "Australia",
                },
              },
              date: "2026-03-15",
              time: "04:00:00Z",
              FirstPractice: { date: "2026-03-13", time: "01:30:00Z" },
              SecondPractice: { date: "2026-03-13", time: "05:00:00Z" },
              ThirdPractice: { date: "2026-03-14", time: "01:30:00Z" },
              Qualifying: { date: "2026-03-14", time: "05:00:00Z" },
            },
          ],
        },
      },
    });
  }),

  // Jolpica - Driver Standings
  http.get(
    "https://api.jolpi.ca/ergast/f1/:season/driverStandings.json",
    ({ params }) => {
      return HttpResponse.json({
        MRData: {
          xmlns: "",
          series: "f1",
          url: `https://api.jolpi.ca/ergast/f1/${params["season"] as string}/driverStandings.json`,
          limit: "30",
          offset: "0",
          total: "1",
          StandingsTable: {
            season: params["season"] as string,
            round: "2",
            StandingsLists: [
              {
                season: params["season"] as string,
                round: "2",
                DriverStandings: [
                  {
                    position: "1",
                    positionText: "1",
                    points: "51",
                    wins: "2",
                    Driver: {
                      driverId: "norris",
                      permanentNumber: "4",
                      code: "NOR",
                      url: "https://en.wikipedia.org/wiki/Lando_Norris",
                      givenName: "Lando",
                      familyName: "Norris",
                      dateOfBirth: "1999-11-13",
                      nationality: "British",
                    },
                    Constructors: [
                      {
                        constructorId: "mclaren",
                        url: "https://en.wikipedia.org/wiki/McLaren",
                        name: "McLaren",
                        nationality: "British",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      });
    },
  ),

  // Jolpica - Constructor Standings
  http.get(
    "https://api.jolpi.ca/ergast/f1/:season/constructorStandings.json",
    ({ params }) => {
      return HttpResponse.json({
        MRData: {
          xmlns: "",
          series: "f1",
          url: `https://api.jolpi.ca/ergast/f1/${params["season"] as string}/constructorStandings.json`,
          limit: "30",
          offset: "0",
          total: "1",
          StandingsTable: {
            season: params["season"] as string,
            round: "2",
            StandingsLists: [
              {
                season: params["season"] as string,
                round: "2",
                ConstructorStandings: [
                  {
                    position: "1",
                    positionText: "1",
                    points: "85",
                    wins: "2",
                    Constructor: {
                      constructorId: "mclaren",
                      url: "https://en.wikipedia.org/wiki/McLaren",
                      name: "McLaren",
                      nationality: "British",
                    },
                  },
                ],
              },
            ],
          },
        },
      });
    },
  ),
];
