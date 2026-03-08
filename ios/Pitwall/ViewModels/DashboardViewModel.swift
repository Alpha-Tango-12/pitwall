import SwiftUI

@MainActor
@Observable
final class DashboardViewModel {
    var schedule: [Race] = []
    var drivers: [DriverStanding] = []
    var constructors: [ConstructorStanding] = []
    var isLoading = false
    var error: Error?

    var nextRace: Race? {
        schedule.first { !$0.isPast }
    }

    var completedRaces: Int {
        schedule.filter(\.isPast).count
    }

    var totalRaces: Int {
        schedule.count
    }

    func load() async {
        guard schedule.isEmpty else { return }
        isLoading = true
        error = nil
        do {
            async let scheduleResult = fetchRaceSchedule(season: "2026")
            async let driversResult = fetchDriverStandings(season: "2026")
            async let constructorsResult = fetchConstructorStandings(season: "2026")
            let (s, d, c) = try await (scheduleResult, driversResult, constructorsResult)
            schedule = s
            drivers = d
            constructors = c
        } catch {
            self.error = error
        }
        isLoading = false
    }

    func reload() async {
        schedule = []
        drivers = []
        constructors = []
        await load()
    }
}
