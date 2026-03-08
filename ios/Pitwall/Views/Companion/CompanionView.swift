import SwiftUI

struct CompanionView: View {
    @State private var vm = CompanionViewModel()

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    // Page header
                    VStack(alignment: .leading, spacing: 2) {
                        Text("Race Companion")
                            .font(.title2.bold())
                            .foregroundStyle(.white)
                        Text("Follow along during the race")
                            .font(.subheadline)
                            .foregroundStyle(Color.pitwallMuted)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)

                    // Session banner
                    SessionBannerView(
                        raceName: vm.raceName,
                        sessionName: vm.sessionName,
                        isLive: vm.liveIsLive && !vm.useMockData,
                        isReplay: vm.useMockData,
                        onToggle: {
                            Task { await vm.toggleDataSource() }
                        }
                    )

                    // Replay controls (only in mock mode)
                    if vm.useMockData && !vm.isLoading && vm.error == nil {
                        ReplayControlsView(
                            currentLap: vm.replayLap,
                            totalLaps: vm.totalLaps,
                            isPlaying: vm.isPlaying,
                            speed: vm.replaySpeed,
                            onPlayPause: { vm.togglePlayPause() },
                            onSeek: { vm.seekTo(lap: $0) },
                            onSpeedChange: { vm.replaySpeed = $0 },
                            onReset: { vm.resetReplay() }
                        )
                    }

                    // Panel nav
                    CompanionPanelNavView(activePanel: vm.activePanel) { panel in
                        vm.activePanel = panel
                    }

                    // Content
                    if vm.isLoading {
                        LoadingView()
                    } else if let error = vm.error {
                        ErrorView(message: "Could not load session data. Try switching to mock data.") {
                            Task { await vm.load() }
                        }
                        let _ = print(error)
                    } else {
                        switch vm.activePanel {
                        case .events:
                            RaceEventsPanelView(events: vm.visibleEvents)
                        case .tires:
                            TireStrategyPanelView(
                                drivers: vm.visibleDriverStints,
                                currentLap: vm.useMockData ? vm.replayLap : nil
                            )
                        case .weather:
                            if let weather = vm.visibleWeather {
                                WeatherPanelView(weather: weather)
                            } else {
                                Text("No weather data available")
                                    .font(.subheadline)
                                    .foregroundStyle(Color.pitwallMuted)
                                    .frame(maxWidth: .infinity, alignment: .center)
                                    .padding(.vertical, 24)
                                    .cardStyle()
                            }
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

// MARK: - Panel nav

private struct CompanionPanelNavView: View {
    let activePanel: CompanionPanel
    let onSelect: (CompanionPanel) -> Void

    var body: some View {
        HStack(spacing: 8) {
            ForEach(CompanionPanel.allCases, id: \.self) { panel in
                Button {
                    onSelect(panel)
                } label: {
                    Text(panel.rawValue)
                        .font(.system(size: 13, weight: .medium))
                        .foregroundStyle(activePanel == panel ? .white : Color.pitwallMuted)
                        .padding(.horizontal, 14)
                        .padding(.vertical, 7)
                        .background(activePanel == panel ? Color.pitwallBorder : Color.clear)
                        .clipShape(Capsule())
                }
            }
            Spacer()
        }
    }
}
