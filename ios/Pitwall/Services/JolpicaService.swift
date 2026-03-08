import Foundation
import SwiftUI

func fetchRaceSchedule(season: String = "current") async throws -> [Race] {
    let response: JolpicaRaceScheduleResponse = try await fetchJolpica("\(season).json")
    return response.MRData.RaceTable.Races.map(transformRace).sorted { $0.round < $1.round }
}

func fetchDriverStandings(season: String = "current") async throws -> [DriverStanding] {
    let response: JolpicaDriverStandingsResponse = try await fetchJolpica("\(season)/driverStandings.json")
    let list = response.MRData.StandingsTable.StandingsLists.first
    return (list?.DriverStandings ?? []).map(transformDriverStanding)
}

func fetchConstructorStandings(season: String = "current") async throws -> [ConstructorStanding] {
    let response: JolpicaConstructorStandingsResponse = try await fetchJolpica("\(season)/constructorStandings.json")
    let list = response.MRData.StandingsTable.StandingsLists.first
    return (list?.ConstructorStandings ?? []).map(transformConstructorStanding)
}

// MARK: - Transformers

private func transformRace(_ raw: JolpicaRace) -> Race {
    let raceDate = parseDateTime(date: raw.date, time: raw.time)
    let isSprint = raw.Sprint != nil
    let isPast = raceDate < Date()

    var sessions: [RaceSession] = []
    if let fp1 = raw.FirstPractice {
        sessions.append(RaceSession(name: "Free Practice 1", date: parseDateTime(date: fp1.date, time: fp1.time)))
    }
    if let fp2 = raw.SecondPractice {
        sessions.append(RaceSession(name: "Free Practice 2", date: parseDateTime(date: fp2.date, time: fp2.time)))
    }
    if let fp3 = raw.ThirdPractice {
        sessions.append(RaceSession(name: "Free Practice 3", date: parseDateTime(date: fp3.date, time: fp3.time)))
    }
    if let sq = raw.SprintQualifying {
        sessions.append(RaceSession(name: "Sprint Qualifying", date: parseDateTime(date: sq.date, time: sq.time)))
    }
    if let sprint = raw.Sprint {
        sessions.append(RaceSession(name: "Sprint", date: parseDateTime(date: sprint.date, time: sprint.time)))
    }
    if let qual = raw.Qualifying {
        sessions.append(RaceSession(name: "Qualifying", date: parseDateTime(date: qual.date, time: qual.time)))
    }
    sessions.append(RaceSession(name: "Race", date: raceDate))
    sessions.sort { $0.date < $1.date }

    return Race(
        round: Int(raw.round) ?? 0,
        raceName: raw.raceName,
        circuitId: raw.Circuit.circuitId,
        circuitName: raw.Circuit.circuitName,
        locality: raw.Circuit.Location.locality,
        country: raw.Circuit.Location.country,
        date: raceDate,
        time: raw.time,
        isSprint: isSprint,
        isPast: isPast,
        sessions: sessions
    )
}

private func transformDriverStanding(_ raw: JolpicaDriverStanding) -> DriverStanding {
    let constructorId = raw.Constructors.first?.constructorId ?? ""
    return DriverStanding(
        position: Int(raw.position) ?? 0,
        driverId: raw.Driver.driverId,
        code: raw.Driver.code,
        givenName: raw.Driver.givenName,
        familyName: raw.Driver.familyName,
        nationality: raw.Driver.nationality,
        points: Double(raw.points) ?? 0,
        wins: Int(raw.wins) ?? 0,
        constructorId: constructorId,
        constructorName: raw.Constructors.first?.name ?? "",
        teamColor: teamColor(for: constructorId)
    )
}

private func transformConstructorStanding(_ raw: JolpicaConstructorStanding) -> ConstructorStanding {
    let constructorId = raw.Constructor.constructorId
    return ConstructorStanding(
        position: Int(raw.position) ?? 0,
        constructorId: constructorId,
        name: raw.Constructor.name,
        nationality: raw.Constructor.nationality,
        points: Double(raw.points) ?? 0,
        wins: Int(raw.wins) ?? 0,
        teamColor: teamColor(for: constructorId)
    )
}

private func parseDateTime(date: String, time: String) -> Date {
    let formatter = DateFormatter()
    formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ssZ"
    formatter.locale = Locale(identifier: "en_US_POSIX")
    return formatter.date(from: "\(date)T\(time)") ?? Date.distantPast
}
