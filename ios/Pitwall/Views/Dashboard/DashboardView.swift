import SwiftUI

struct DashboardView: View {
    @State private var vm = DashboardViewModel()

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    // Page header
                    VStack(alignment: .leading, spacing: 2) {
                        Text("Dashboard")
                            .font(.title2.bold())
                            .foregroundStyle(.white)
                        Text("2026 Formula 1 Season")
                            .font(.subheadline)
                            .foregroundStyle(Color.pitwallMuted)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)

                    if vm.isLoading {
                        LoadingView()
                    } else if let error = vm.error {
                        ErrorView(message: "Could not load season data.") {
                            Task { await vm.reload() }
                        }
                        .padding(.horizontal)
                        let _ = print(error)
                    } else {
                        SeasonProgressView(
                            completedRaces: vm.completedRaces,
                            totalRaces: vm.totalRaces
                        )
                        NextRaceCardView(race: vm.nextRace)
                        StandingsSnapshotView(
                            drivers: vm.drivers,
                            constructors: vm.constructors
                        )
                    }
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 24)
            }
            .background(Color.pitwallBase)
            .scrollContentBackground(.hidden)
        }
        .task { await vm.load() }
    }
}
