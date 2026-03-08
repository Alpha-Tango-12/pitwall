import SwiftUI

struct StandingsView: View {
    @State private var vm = StandingsViewModel()

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    VStack(alignment: .leading, spacing: 2) {
                        Text("Standings")
                            .font(.title2.bold())
                            .foregroundStyle(.white)
                        Text("2026 Formula 1 Season")
                            .font(.subheadline)
                            .foregroundStyle(Color.pitwallMuted)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)

                    // Tab toggle
                    HStack(spacing: 0) {
                        ForEach(StandingsTab.allCases, id: \.self) { tab in
                            Button {
                                vm.activeTab = tab
                            } label: {
                                Text(tab.rawValue)
                                    .font(.system(size: 13, weight: .medium))
                                    .foregroundStyle(vm.activeTab == tab ? .white : Color.pitwallMuted)
                                    .frame(maxWidth: .infinity)
                                    .padding(.vertical, 8)
                                    .background(vm.activeTab == tab ? Color.pitwallBorder : Color.clear)
                                    .clipShape(RoundedRectangle(cornerRadius: 8))
                            }
                        }
                    }
                    .padding(4)
                    .background(Color.pitwallCard)
                    .clipShape(RoundedRectangle(cornerRadius: 10))
                    .overlay(
                        RoundedRectangle(cornerRadius: 10)
                            .stroke(Color.pitwallBorder, lineWidth: 1)
                    )

                    if vm.isLoading {
                        LoadingView()
                    } else if vm.error != nil {
                        ErrorView(message: "Could not load standings.") {
                            Task { await vm.reload() }
                        }
                    } else {
                        if vm.activeTab == .drivers {
                            DriverStandingsView(standings: vm.drivers)
                        } else {
                            ConstructorStandingsView(standings: vm.constructors)
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
