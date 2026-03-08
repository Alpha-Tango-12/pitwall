import SwiftUI

enum StandingsTab: String, CaseIterable {
    case drivers      = "Drivers"
    case constructors = "Constructors"
}

@MainActor
@Observable
final class StandingsViewModel {
    var activeTab: StandingsTab = .drivers
    var drivers: [DriverStanding] = []
    var constructors: [ConstructorStanding] = []
    var isLoading = false
    var error: Error?

    func load() async {
        guard drivers.isEmpty else { return }
        isLoading = true
        error = nil
        do {
            async let d = fetchDriverStandings(season: "2026")
            async let c = fetchConstructorStandings(season: "2026")
            let (dResult, cResult) = try await (d, c)
            drivers = dResult
            constructors = cResult
        } catch {
            self.error = error
        }
        isLoading = false
    }

    func reload() async {
        drivers = []
        constructors = []
        await load()
    }
}
