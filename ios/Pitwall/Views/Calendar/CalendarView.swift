import SwiftUI

struct CalendarView: View {
    @State private var vm = CalendarViewModel()

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    VStack(alignment: .leading, spacing: 2) {
                        Text("Calendar")
                            .font(.title2.bold())
                            .foregroundStyle(.white)
                        Text("2026 Formula 1 Season")
                            .font(.subheadline)
                            .foregroundStyle(Color.pitwallMuted)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)

                    if vm.isLoading {
                        LoadingView()
                    } else if vm.error != nil {
                        ErrorView(message: "Could not load race schedule.") {
                            Task { await vm.reload() }
                        }
                    } else {
                        ForEach(vm.schedule) { race in
                            RaceCardView(race: race, isNext: race.round == vm.nextRaceId)
                        }
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
