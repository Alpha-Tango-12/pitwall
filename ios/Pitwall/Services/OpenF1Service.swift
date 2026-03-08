import Foundation

func fetchSessions(year: Int? = nil, sessionName: String? = nil, meetingKey: Int? = nil) async throws -> [OpenF1Session] {
    var params: [String: String] = [:]
    if let year { params["year"] = String(year) }
    if let sessionName { params["session_name"] = sessionName }
    if let meetingKey { params["meeting_key"] = String(meetingKey) }
    return try await fetchOpenF1("sessions", params: params)
}

func fetchDrivers(sessionKey: Int) async throws -> [OpenF1Driver] {
    return try await fetchOpenF1("drivers", params: ["session_key": String(sessionKey)])
}

func fetchStints(sessionKey: Int) async throws -> [OpenF1Stint] {
    return try await fetchOpenF1("stints", params: ["session_key": String(sessionKey)])
}

func fetchRaceControl(sessionKey: Int) async throws -> [OpenF1RaceControl] {
    return try await fetchOpenF1("race_control", params: ["session_key": String(sessionKey)])
}

func fetchWeather(sessionKey: Int) async throws -> [OpenF1Weather] {
    return try await fetchOpenF1("weather", params: ["session_key": String(sessionKey)])
}

// MARK: - Transformers

func transformRaceControl(_ raw: OpenF1RaceControl) -> RaceEvent {
    let flagExplanations: [String: (String, EventSeverity)] = [
        "GREEN":            ("The track is clear. Normal racing resumes.", .info),
        "YELLOW":           ("Danger ahead — drivers must slow down. No overtaking allowed in that zone.", .warning),
        "DOUBLE YELLOW":    ("Serious danger — the track may be blocked. Drivers must slow significantly.", .warning),
        "RED":              ("Session stopped! A serious incident means it's too dangerous to continue.", .danger),
        "CHEQUERED":        ("The session is over!", .info),
        "BLUE":             ("A faster car is approaching from behind to lap this driver.", .info),
        "BLACK":            ("The driver has been disqualified or must return to the pits immediately.", .danger),
        "BLACK AND ORANGE": ("The car has a mechanical issue that needs fixing in the pits.", .warning),
    ]

    let categoryExplanations: [String: (String, EventSeverity)] = [
        "SafetyCar": ("Safety car is out! All drivers must slow down and form a line behind it.", .warning),
        "Vsc":       ("Virtual Safety Car — drivers must stick to a speed limit instead of following an actual safety car.", .warning),
        "Drs":       ("DRS is now available. Drivers within 1 second of the car ahead can open their rear wing for extra speed.", .info),
    ]

    var explanation = raw.message
    var severity: EventSeverity = .info

    if let flag = raw.flag, let info = flagExplanations[flag] {
        explanation = info.0
        severity = info.1
    } else if let info = categoryExplanations[raw.category] {
        explanation = info.0
        severity = info.1
    }

    let isoFormatter = ISO8601DateFormatter()
    isoFormatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
    let timestamp = isoFormatter.date(from: raw.date) ?? Date()

    return RaceEvent(
        timestamp: timestamp,
        lapNumber: raw.lap_number,
        driverNumber: raw.driver_number,
        driverName: nil,
        category: raw.category,
        flag: raw.flag,
        message: raw.message,
        explanation: explanation,
        severity: severity
    )
}

func transformWeather(_ raw: OpenF1Weather) -> WeatherConditions {
    let isoFormatter = ISO8601DateFormatter()
    isoFormatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
    let timestamp = isoFormatter.date(from: raw.date) ?? Date()

    return WeatherConditions(
        airTemp: raw.air_temperature,
        trackTemp: raw.track_temperature,
        humidity: raw.humidity,
        pressure: raw.pressure,
        rainfall: raw.rainfall,
        windSpeed: raw.wind_speed,
        windDirection: raw.wind_direction,
        timestamp: timestamp
    )
}
