import SwiftUI

private let tvCategories: Set<String> = ["Flag", "SafetyCar", "Vsc", "Drs"]

private let flagColors: [String: Color] = [
    "GREEN":            Color(hex: "#22C55E"),
    "YELLOW":           Color(hex: "#EAB308"),
    "DOUBLE YELLOW":    Color(hex: "#EAB308"),
    "RED":              Color(hex: "#EF4444"),
    "CHEQUERED":        .white,
    "BLUE":             Color(hex: "#3B82F6"),
    "BLACK":            .black,
    "BLACK AND ORANGE": Color(hex: "#F97316"),
]

struct RaceEventsPanelView: View {
    let events: [RaceEvent]
    @State private var showAll = false

    private var visibleEvents: [RaceEvent] {
        showAll ? events : events.filter { tvCategories.contains($0.category) }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            // Filter toggle
            HStack(spacing: 8) {
                filterButton(label: "Key Events", active: !showAll) { showAll = false }
                filterButton(label: "All", active: showAll) { showAll = true }
            }

            if events.isEmpty {
                Text("No events yet")
                    .font(.subheadline)
                    .foregroundStyle(Color.pitwallMuted)
                    .frame(maxWidth: .infinity, alignment: .center)
                    .padding(.vertical, 24)
                    .cardStyle()
            } else if visibleEvents.isEmpty {
                Text("No key events yet")
                    .font(.subheadline)
                    .foregroundStyle(Color.pitwallMuted)
                    .frame(maxWidth: .infinity, alignment: .center)
                    .padding(.vertical, 24)
                    .cardStyle()
            } else {
                ForEach(Array(visibleEvents.enumerated()), id: \.offset) { _, event in
                    RaceEventRowView(event: event)
                }
            }
        }
    }

    private func filterButton(label: String, active: Bool, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Text(label)
                .font(.system(size: 12, weight: .medium))
                .foregroundStyle(active ? .white : Color.pitwallMuted)
                .padding(.horizontal, 12)
                .padding(.vertical, 5)
                .background(active ? Color.pitwallBorder : Color.clear)
                .clipShape(Capsule())
        }
    }
}

private struct RaceEventRowView: View {
    let event: RaceEvent

    private var borderColor: Color {
        switch event.severity {
        case .info:    return Color.pitwallBorder
        case .warning: return Color(hex: "#713F12")   // yellow-800
        case .danger:  return Color(hex: "#991B1B")   // red-800
        }
    }

    private var bgColor: Color {
        switch event.severity {
        case .info:    return Color.pitwallCard
        case .warning: return Color(hex: "#422006").opacity(0.4)  // yellow-950
        case .danger:  return Color(hex: "#450A0A").opacity(0.4)  // red-950
        }
    }

    private var iconName: String {
        switch event.severity {
        case .info:    return "info.circle"
        case .warning: return "exclamationmark.triangle"
        case .danger:  return "octagon"
        }
    }

    private var iconColor: Color {
        switch event.severity {
        case .info:    return Color.pitwallMuted
        case .warning: return Color(hex: "#FACC15")   // yellow-400
        case .danger:  return Color.f1Red
        }
    }

    private static let timeFormatter: DateFormatter = {
        let f = DateFormatter()
        f.dateFormat = "HH:mm:ss"
        return f
    }()

    var body: some View {
        HStack(alignment: .top, spacing: 10) {
            Image(systemName: iconName)
                .font(.system(size: 13))
                .foregroundStyle(iconColor)
                .padding(.top, 2)

            VStack(alignment: .leading, spacing: 4) {
                HStack(spacing: 6) {
                    if let flag = event.flag, let flagColor = flagColors[flag] {
                        Circle()
                            .fill(flagColor)
                            .frame(width: 10, height: 10)
                    }
                    Text(event.message)
                        .font(.system(size: 12, weight: .semibold))
                        .tracking(0.5)
                        .foregroundStyle(Color(white: 0.85))
                }

                Text(event.explanation)
                    .font(.system(size: 13))
                    .foregroundStyle(Color(white: 0.65))

                HStack(spacing: 8) {
                    if let lap = event.lapNumber {
                        Text("Lap \(lap)")
                            .font(.system(size: 11))
                            .foregroundStyle(Color.pitwallMuted)
                    }
                    if let name = event.driverName {
                        Text("· \(name)")
                            .font(.system(size: 11))
                            .foregroundStyle(Color.pitwallMuted)
                    }
                    Text("· \(Self.timeFormatter.string(from: event.timestamp))")
                        .font(.system(size: 11))
                        .foregroundStyle(Color.pitwallMuted)
                }
            }
        }
        .padding(12)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(bgColor)
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(borderColor, lineWidth: 1)
        )
    }
}
