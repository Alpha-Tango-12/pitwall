import SwiftUI

@MainActor
@Observable
final class CalendarViewModel {
    var schedule: [Race] = []
    var isLoading = false
    var error: Error?

    var nextRaceId: Int? {
        schedule.first { !$0.isPast }?.round
    }

    func load() async {
        guard schedule.isEmpty else { return }
        isLoading = true
        error = nil
        do {
            schedule = try await fetchRaceSchedule(season: "2026")
        } catch {
            self.error = error
        }
        isLoading = false
    }

    func reload() async {
        schedule = []
        await load()
    }
}
