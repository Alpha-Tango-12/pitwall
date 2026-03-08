import Foundation

struct WeekendSession: Identifiable {
    var id: String { name }
    let name: String
    let day: String
    let description: String
}

struct WeekendFormat {
    let type: String  // "standard" | "sprint"
    let sessions: [WeekendSession]
}

let STANDARD_WEEKEND = WeekendFormat(type: "standard", sessions: [
    WeekendSession(name: "Free Practice 1", day: "Friday",   description: "First practice session. Teams test setups, drivers learn the track, and engineers gather data."),
    WeekendSession(name: "Free Practice 2", day: "Friday",   description: "Second practice session. Teams refine setups based on FP1 data and simulate race conditions."),
    WeekendSession(name: "Free Practice 3", day: "Saturday", description: "Final practice before qualifying. Last chance to fine-tune the car setup."),
    WeekendSession(name: "Qualifying",      day: "Saturday", description: "Three knockout rounds (Q1, Q2, Q3) to determine the starting grid. Slowest cars eliminated each round."),
    WeekendSession(name: "Race",            day: "Sunday",   description: "The main event. Full race distance with pit stops, strategy, and wheel-to-wheel racing."),
])

let SPRINT_WEEKEND = WeekendFormat(type: "sprint", sessions: [
    WeekendSession(name: "Free Practice 1",    day: "Friday",   description: "The only practice session of the weekend. Teams must nail their setup quickly."),
    WeekendSession(name: "Sprint Qualifying",  day: "Friday",   description: "Three knockout rounds to set the grid for Saturday's Sprint race."),
    WeekendSession(name: "Sprint",             day: "Saturday", description: "A shorter race (~100km, about 1/3 race distance). Points for the top 8 finishers. No mandatory pit stops."),
    WeekendSession(name: "Qualifying",         day: "Saturday", description: "Three knockout rounds to determine Sunday's race starting grid."),
    WeekendSession(name: "Race",               day: "Sunday",   description: "The main event. Full race distance with pit stops, strategy, and wheel-to-wheel racing."),
])

let POINTS_RACE: [Int]   = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1]
let POINTS_SPRINT: [Int] = [8, 7, 6, 5, 4, 3, 2, 1]
let POINTS_FASTEST_LAP   = 1
