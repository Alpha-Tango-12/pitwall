import SwiftUI

// Static mock data for replay mode — mirrors web/src/mocks/
// Used when the backend is unavailable or in offline replay.

let MOCK_RACE_EVENTS: [RaceEvent] = [
    RaceEvent(timestamp: Date(timeIntervalSince1970: 1_742_004_120), lapNumber: 1,  driverNumber: nil, driverName: nil,             category: "Flag",      flag: "GREEN",     message: "GREEN LIGHT - PIT EXIT OPEN",   explanation: "The race has started! Pit lane is open.",                                                                     severity: .info),
    RaceEvent(timestamp: Date(timeIntervalSince1970: 1_742_004_930), lapNumber: 8,  driverNumber: 14,  driverName: "Alonso",         category: "Flag",      flag: "YELLOW",    message: "YELLOW IN SECTOR 2",            explanation: "Alonso has gone off track in sector 2. Drivers must slow down in that area.",                                 severity: .warning),
    RaceEvent(timestamp: Date(timeIntervalSince1970: 1_742_004_960), lapNumber: 8,  driverNumber: nil, driverName: nil,             category: "Flag",      flag: "GREEN",     message: "GREEN IN ALL SECTORS",          explanation: "The track is clear again. Normal racing resumes.",                                                            severity: .info),
    RaceEvent(timestamp: Date(timeIntervalSince1970: 1_742_006_100), lapNumber: 18, driverNumber: 4,   driverName: "Norris",         category: "Other",     flag: nil,         message: "PIT ENTRY - CAR 4 (NOR)",       explanation: "Norris is coming in for a pit stop.",                                                                         severity: .info),
    RaceEvent(timestamp: Date(timeIntervalSince1970: 1_742_007_000), lapNumber: 27, driverNumber: nil, driverName: nil,             category: "SafetyCar", flag: "YELLOW",    message: "SAFETY CAR DEPLOYED",           explanation: "Safety car is out! All drivers must slow down and form a line behind it. Gaps between cars will close up.",     severity: .warning),
    RaceEvent(timestamp: Date(timeIntervalSince1970: 1_742_007_300), lapNumber: 30, driverNumber: nil, driverName: nil,             category: "SafetyCar", flag: "GREEN",     message: "SAFETY CAR IN THIS LAP",        explanation: "The safety car is coming in at the end of this lap. Racing will restart!",                                      severity: .info),
    RaceEvent(timestamp: Date(timeIntervalSince1970: 1_742_008_800), lapNumber: 45, driverNumber: nil, driverName: nil,             category: "Drs",       flag: nil,         message: "DRS ENABLED",                   explanation: "DRS is now available. Drivers within 1 second of the car ahead can open their rear wing for extra speed.",      severity: .info),
    RaceEvent(timestamp: Date(timeIntervalSince1970: 1_742_010_600), lapNumber: 58, driverNumber: nil, driverName: nil,             category: "Flag",      flag: "CHEQUERED", message: "CHEQUERED FLAG",                explanation: "The race is over! Checkered flag waves as the leader crosses the line.",                                        severity: .info),
]

let MOCK_DRIVER_STINTS: [DriverStints] = [
    DriverStints(driverNumber: 4,  driverName: "NOR", teamName: "McLaren",  teamColor: Color(hex: "#F58020"), stints: [
        Stint(driverNumber: 4,  driverName: "NOR", teamColor: Color(hex: "#F58020"), stintNumber: 1, compound: .medium, lapStart: 1,  lapEnd: 18, lapCount: 18, tyreAgeAtStart: 0),
        Stint(driverNumber: 4,  driverName: "NOR", teamColor: Color(hex: "#F58020"), stintNumber: 2, compound: .hard,   lapStart: 19, lapEnd: 40, lapCount: 22, tyreAgeAtStart: 0),
        Stint(driverNumber: 4,  driverName: "NOR", teamColor: Color(hex: "#F58020"), stintNumber: 3, compound: .medium, lapStart: 41, lapEnd: 58, lapCount: 18, tyreAgeAtStart: 0),
    ]),
    DriverStints(driverNumber: 1,  driverName: "VER", teamName: "Red Bull", teamColor: Color(hex: "#1E5BC6"), stints: [
        Stint(driverNumber: 1,  driverName: "VER", teamColor: Color(hex: "#1E5BC6"), stintNumber: 1, compound: .soft,   lapStart: 1,  lapEnd: 14, lapCount: 14, tyreAgeAtStart: 0),
        Stint(driverNumber: 1,  driverName: "VER", teamColor: Color(hex: "#1E5BC6"), stintNumber: 2, compound: .hard,   lapStart: 15, lapEnd: 38, lapCount: 24, tyreAgeAtStart: 0),
        Stint(driverNumber: 1,  driverName: "VER", teamColor: Color(hex: "#1E5BC6"), stintNumber: 3, compound: .medium, lapStart: 39, lapEnd: 58, lapCount: 20, tyreAgeAtStart: 0),
    ]),
    DriverStints(driverNumber: 16, driverName: "LEC", teamName: "Ferrari",  teamColor: Color(hex: "#ED1C24"), stints: [
        Stint(driverNumber: 16, driverName: "LEC", teamColor: Color(hex: "#ED1C24"), stintNumber: 1, compound: .medium, lapStart: 1,  lapEnd: 20, lapCount: 20, tyreAgeAtStart: 0),
        Stint(driverNumber: 16, driverName: "LEC", teamColor: Color(hex: "#ED1C24"), stintNumber: 2, compound: .hard,   lapStart: 21, lapEnd: 58, lapCount: 38, tyreAgeAtStart: 0),
    ]),
    DriverStints(driverNumber: 44, driverName: "HAM", teamName: "Ferrari",  teamColor: Color(hex: "#ED1C24"), stints: [
        Stint(driverNumber: 44, driverName: "HAM", teamColor: Color(hex: "#ED1C24"), stintNumber: 1, compound: .medium, lapStart: 1,  lapEnd: 22, lapCount: 22, tyreAgeAtStart: 0),
        Stint(driverNumber: 44, driverName: "HAM", teamColor: Color(hex: "#ED1C24"), stintNumber: 2, compound: .hard,   lapStart: 23, lapEnd: 42, lapCount: 20, tyreAgeAtStart: 0),
        Stint(driverNumber: 44, driverName: "HAM", teamColor: Color(hex: "#ED1C24"), stintNumber: 3, compound: .soft,   lapStart: 43, lapEnd: 58, lapCount: 16, tyreAgeAtStart: 0),
    ]),
]

let MOCK_WEATHER = WeatherConditions(
    airTemp: 28.5,
    trackTemp: 42.3,
    humidity: 55,
    pressure: 1013.2,
    rainfall: 0,
    windSpeed: 3.2,
    windDirection: 180,
    timestamp: Date(timeIntervalSince1970: 1_742_006_400)
)

let MOCK_TOTAL_LAPS = 58
let MOCK_RACE_NAME = "2026 Australian Grand Prix"
