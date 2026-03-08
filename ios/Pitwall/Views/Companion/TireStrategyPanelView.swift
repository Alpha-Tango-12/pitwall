import SwiftUI

struct TireStrategyPanelView: View {
    let drivers: [DriverStints]
    let currentLap: Int?  // nil = show all stints (live mode)

    private var totalLaps: Int {
        drivers.flatMap { $0.stints.map(\.lapEnd) }.max() ?? 1
    }

    var body: some View {
        if drivers.isEmpty {
            Text("No stint data yet")
                .font(.subheadline)
                .foregroundStyle(Color.pitwallMuted)
                .frame(maxWidth: .infinity, alignment: .center)
                .padding(.vertical, 24)
                .cardStyle()
        } else {
            VStack(spacing: 8) {
                ForEach(drivers) { driver in
                    let visibleStints = visibleStints(for: driver)
                    if !visibleStints.isEmpty {
                        DriverStintRowView(
                            driver: driver,
                            visibleStints: visibleStints,
                            totalLaps: totalLaps,
                            currentLap: currentLap
                        )
                    }
                }
            }
        }
    }

    private func visibleStints(for driver: DriverStints) -> [Stint] {
        guard let lap = currentLap else { return driver.stints }
        return driver.stints.filter { $0.lapStart <= lap }
    }
}

private struct DriverStintRowView: View {
    let driver: DriverStints
    let visibleStints: [Stint]
    let totalLaps: Int
    let currentLap: Int?

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            // Driver header
            HStack(spacing: 8) {
                TeamColorBarView(color: driver.teamColor, height: 16)
                Text(driver.driverName)
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundStyle(.white)
                Text(driver.teamName)
                    .font(.system(size: 11))
                    .foregroundStyle(Color.pitwallMuted)
            }

            // Stint bar
            GeometryReader { geo in
                HStack(spacing: 0) {
                    ForEach(visibleStints) { stint in
                        let visibleLaps = visibleLapCount(stint)
                        let fraction = Double(visibleLaps) / Double(totalLaps)
                        let width = geo.size.width * fraction
                        let color = tireColor(for: stint.compound)
                        let info = tireInfo(for: stint.compound)

                        ZStack {
                            Rectangle().fill(color)
                            if fraction > 0.12 {
                                Text(info.abbreviation)
                                    .font(.system(size: 11, weight: .bold))
                                    .foregroundStyle(Color(hex: "#18181B"))
                            }
                        }
                        .frame(width: width)
                    }
                }
                .clipShape(RoundedRectangle(cornerRadius: 4))
            }
            .frame(height: 28)

            // Stint chips
            HStack(spacing: 6) {
                ForEach(visibleStints) { stint in
                    let info = tireInfo(for: stint.compound)
                    let laps = visibleLapCount(stint)
                    HStack(spacing: 4) {
                        Circle()
                            .fill(tireColor(for: stint.compound))
                            .frame(width: 8, height: 8)
                        Text("\(info.label) · \(laps)L")
                            .font(.system(size: 11))
                            .foregroundStyle(Color(white: 0.75))
                    }
                    .padding(.horizontal, 8)
                    .padding(.vertical, 3)
                    .background(Color.pitwallBorder)
                    .clipShape(Capsule())
                }
            }
        }
        .padding(12)
        .background(Color.pitwallCard)
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color.pitwallBorder, lineWidth: 1)
        )
    }

    private func visibleLapCount(_ stint: Stint) -> Int {
        guard let lap = currentLap else { return stint.lapCount }
        return min(stint.lapEnd, lap) - stint.lapStart + 1
    }
}
