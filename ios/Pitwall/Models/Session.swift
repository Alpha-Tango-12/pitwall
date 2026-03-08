import Foundation

struct SessionStatus {
    let isLive: Bool
    let sessionKey: Int?
    let sessionName: String?
}

// MARK: - OpenF1 raw Codable types

struct OpenF1Session: Codable {
    let session_key: Int
    let session_type: String
    let session_name: String
    let date_start: String
    let date_end: String
    let meeting_key: Int
    let location: String
    let country_name: String
    let year: Int
}

struct OpenF1Driver: Codable {
    let driver_number: Int
    let full_name: String
    let name_acronym: String
    let team_name: String
    let team_colour: String?
}

struct OpenF1Stint: Codable {
    let stint_number: Int
    let driver_number: Int
    let lap_start: Int
    let lap_end: Int
    let compound: String
    let tyre_age_at_start: Int
}

struct OpenF1RaceControl: Codable {
    let date: String
    let driver_number: Int?
    let lap_number: Int?
    let category: String
    let flag: String?
    let message: String
}

struct OpenF1Weather: Codable {
    let date: String
    let air_temperature: Double
    let track_temperature: Double
    let humidity: Double
    let pressure: Double
    let rainfall: Double
    let wind_speed: Double
    let wind_direction: Double
}

// MARK: - Jolpica raw Codable types

struct JolpicaRaceScheduleResponse: Codable {
    let MRData: JolpicaMRData
}

struct JolpicaMRData: Codable {
    let RaceTable: JolpicaRaceTable
}

struct JolpicaRaceTable: Codable {
    let Races: [JolpicaRace]
}

struct JolpicaRace: Codable {
    let round: String
    let raceName: String
    let Circuit: JolpicaCircuit
    let date: String
    let time: String
    let FirstPractice: JolpicaSessionTime?
    let SecondPractice: JolpicaSessionTime?
    let ThirdPractice: JolpicaSessionTime?
    let Qualifying: JolpicaSessionTime?
    let Sprint: JolpicaSessionTime?
    let SprintQualifying: JolpicaSessionTime?
}

struct JolpicaCircuit: Codable {
    let circuitId: String
    let circuitName: String
    let Location: JolpicaLocation
}

struct JolpicaLocation: Codable {
    let locality: String
    let country: String
}

struct JolpicaSessionTime: Codable {
    let date: String
    let time: String
}

// MARK: - Standings raw types

struct JolpicaDriverStandingsResponse: Codable {
    let MRData: JolpicaStandingsMRData
}

struct JolpicaConstructorStandingsResponse: Codable {
    let MRData: JolpicaStandingsMRData
}

struct JolpicaStandingsMRData: Codable {
    let StandingsTable: JolpicaStandingsTable
}

struct JolpicaStandingsTable: Codable {
    let StandingsLists: [JolpicaStandingsList]
}

struct JolpicaStandingsList: Codable {
    let DriverStandings: [JolpicaDriverStanding]?
    let ConstructorStandings: [JolpicaConstructorStanding]?
}

struct JolpicaDriverStanding: Codable {
    let position: String
    let points: String
    let wins: String
    let Driver: JolpicaDriver
    let Constructors: [JolpicaConstructor]
}

struct JolpicaConstructorStanding: Codable {
    let position: String
    let points: String
    let wins: String
    let Constructor: JolpicaConstructor
}

struct JolpicaDriver: Codable {
    let driverId: String
    let code: String
    let givenName: String
    let familyName: String
    let nationality: String
}

struct JolpicaConstructor: Codable {
    let constructorId: String
    let name: String
    let nationality: String
}
