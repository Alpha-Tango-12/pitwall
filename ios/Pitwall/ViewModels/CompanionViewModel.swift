import SwiftUI

enum CompanionPanel: String, CaseIterable {
    case events  = "Events"
    case tires   = "Tires"
    case weather = "Weather"
}

enum ReplaySpeed: Double, CaseIterable {
    case half = 0.5
    case one  = 1
    case two  = 2
    case five = 5

    var label: String {
        switch self {
        case .half: return "0.5×"
        case .one:  return "1×"
        case .two:  return "2×"
        case .five: return "5×"
        }
    }

    var intervalMs: Int {
        switch self {
        case .half: return 2000
        case .one:  return 1000
        case .two:  return 500
        case .five: return 200
        }
    }
}

@MainActor
@Observable
final class CompanionViewModel {
    // UI state
    var activePanel: CompanionPanel = .events
    var useMockData: Bool = true

    // Replay state
    var replayLap: Int = 0
    var isPlaying: Bool = false
    var replaySpeed: ReplaySpeed = .one

    // Replay session data
    var replaySessionKey: Int? = nil
    var replayRaceName: String = "2025 Australian Grand Prix"
    var allEvents: [RaceEvent] = []          // sorted ascending for lap-filter
    var allDriverStints: [DriverStints] = []
    var replayWeather: WeatherConditions? = nil
    var totalLaps: Int = 58

    // Live session data
    var liveEvents: [RaceEvent] = []
    var liveDriverStints: [DriverStints] = []
    var liveWeather: WeatherConditions? = nil
    var liveIsLive: Bool = false
    var liveSessionKey: Int? = nil
    var liveSessionName: String = "Live Session"

    var isLoading: Bool = false
    var error: Error? = nil

    // Task references for cancellation
    private var replayTask: Task<Void, Never>? = nil
    private var livePollTask: Task<Void, Never>? = nil
    private var lapTimerTask: Task<Void, Never>? = nil

    // MARK: - Computed

    var raceName: String {
        useMockData ? replayRaceName : liveSessionName
    }

    var sessionName: String {
        useMockData ? "Race · Replay" : (liveIsLive ? "Live" : "Race")
    }

    var visibleEvents: [RaceEvent] {
        if useMockData {
            return allEvents
                .filter { $0.lapNumber == nil || ($0.lapNumber ?? 0) <= replayLap }
                .sorted { $0.timestamp > $1.timestamp }
        } else {
            return liveEvents
        }
    }

    var visibleDriverStints: [DriverStints] {
        useMockData ? allDriverStints : liveDriverStints
    }

    var visibleWeather: WeatherConditions? {
        useMockData ? replayWeather : liveWeather
    }

    // MARK: - Load

    func load() async {
        if useMockData {
            await loadReplayData()
        } else {
            await startLivePolling()
        }
    }

    func toggleDataSource() async {
        useMockData.toggle()
        replayLap = 0
        isPlaying = false
        lapTimerTask?.cancel()
        lapTimerTask = nil
        await load()
    }

    // MARK: - Replay (uses bundled mock data — no network required)

    func loadReplayData() async {
        guard allEvents.isEmpty else { return }
        replayRaceName = MOCK_RACE_NAME
        allEvents      = MOCK_RACE_EVENTS.sorted { $0.timestamp < $1.timestamp }
        allDriverStints = MOCK_DRIVER_STINTS
        replayWeather  = MOCK_WEATHER
        totalLaps      = MOCK_TOTAL_LAPS
    }

    // MARK: - Live polling

    func startLivePolling() async {
        livePollTask?.cancel()
        livePollTask = Task {
            while !Task.isCancelled {
                await fetchLiveData()
                try? await Task.sleep(for: .seconds(10))
            }
        }
    }

    private func fetchLiveData() async {
        do {
            let sessions: [OpenF1Session] = try await fetchOpenF1("sessions", params: ["year": "2026"])
            guard let latest = sessions.max(by: { $0.session_key < $1.session_key }) else { return }

            let key = latest.session_key
            liveSessionKey = key

            // Check if live (started but not ended)
            let now = Date()
            let isoFormatter = ISO8601DateFormatter()
            isoFormatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
            let startDate = isoFormatter.date(from: latest.date_start) ?? .distantFuture
            liveIsLive = startDate <= now
            liveSessionName = latest.session_name

            async let rawControl: [OpenF1RaceControl] = fetchOpenF1("race_control", params: ["session_key": String(key)])
            async let rawStints: [OpenF1Stint]         = fetchOpenF1("stints", params: ["session_key": String(key)])
            async let rawDrivers: [OpenF1Driver]       = fetchOpenF1("drivers", params: ["session_key": String(key)])
            async let rawWeather: [OpenF1Weather]      = fetchOpenF1("weather", params: ["session_key": String(key)])

            let (control, stints, drivers, weather) = try await (rawControl, rawStints, rawDrivers, rawWeather)

            liveEvents = control
                .map(transformRaceControl)
                .sorted { $0.timestamp > $1.timestamp }

            let driverMap = Dictionary(uniqueKeysWithValues: drivers.map { ($0.driver_number, $0) })
            liveDriverStints = buildDriverStints(stints: stints, driverMap: driverMap)

            liveWeather = weather
                .sorted { (isoFormatter.date(from: $0.date) ?? .distantPast) < (isoFormatter.date(from: $1.date) ?? .distantPast) }
                .last
                .map(transformWeather)
        } catch {
            // Silently ignore polling errors
        }
    }

    // MARK: - Replay timer

    func togglePlayPause() {
        isPlaying.toggle()
        if isPlaying {
            startLapTimer()
        } else {
            lapTimerTask?.cancel()
        }
    }

    func seekTo(lap: Int) {
        replayLap = lap
        isPlaying = false
        lapTimerTask?.cancel()
    }

    func resetReplay() {
        replayLap = 0
        isPlaying = false
        lapTimerTask?.cancel()
    }

    private func startLapTimer() {
        lapTimerTask?.cancel()
        lapTimerTask = Task {
            while !Task.isCancelled && isPlaying {
                try? await Task.sleep(for: .milliseconds(replaySpeed.intervalMs))
                if Task.isCancelled { break }
                if replayLap >= totalLaps {
                    isPlaying = false
                    break
                }
                replayLap += 1
            }
        }
    }

    // MARK: - Helpers for live data

    private func buildDriverStints(stints: [OpenF1Stint], driverMap: [Int: OpenF1Driver]) -> [DriverStints] {
        let grouped = Dictionary(grouping: stints, by: \.driver_number)
        return grouped.compactMap { (driverNumber, rawStints) -> DriverStints? in
            guard let driver = driverMap[driverNumber] else { return nil }

            let teamColor: SwiftUI.Color = driver.team_colour.map { Color(hex: "#\($0)") } ?? Color.pitwallMuted

            let transformedStints = rawStints.map { s in
                Stint(
                    driverNumber: s.driver_number,
                    driverName: driver.name_acronym,
                    teamColor: teamColor,
                    stintNumber: s.stint_number,
                    compound: tireCompound(from: s.compound),
                    lapStart: s.lap_start,
                    lapEnd: s.lap_end,
                    lapCount: s.lap_end - s.lap_start + 1,
                    tyreAgeAtStart: s.tyre_age_at_start
                )
            }.sorted { $0.stintNumber < $1.stintNumber }

            return DriverStints(
                driverNumber: driverNumber,
                driverName: driver.name_acronym,
                teamName: driver.team_name,
                teamColor: teamColor,
                stints: transformedStints
            )
        }
        .sorted { $0.driverNumber < $1.driverNumber }
    }
}
