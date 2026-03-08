import SwiftUI

struct StandingsSnapshotView: View {
    let drivers: [DriverStanding]
    let constructors: [ConstructorStanding]

    private var topDrivers: [DriverStanding] { Array(drivers.prefix(5)) }
    private var topConstructors: [ConstructorStanding] { Array(constructors.prefix(5)) }

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Standings")
                .font(.headline)
                .foregroundStyle(.white)

            HStack(alignment: .top, spacing: 24) {
                // Drivers column
                VStack(alignment: .leading, spacing: 0) {
                    Text("DRIVERS")
                        .font(.system(size: 10, weight: .medium))
                        .tracking(1)
                        .foregroundStyle(Color.pitwallMuted)
                        .padding(.bottom, 8)
                    ForEach(topDrivers) { driver in
                        SnapshotDriverRow(driver: driver)
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)

                // Constructors column
                VStack(alignment: .leading, spacing: 0) {
                    Text("CONSTRUCTORS")
                        .font(.system(size: 10, weight: .medium))
                        .tracking(1)
                        .foregroundStyle(Color.pitwallMuted)
                        .padding(.bottom, 8)
                    ForEach(topConstructors) { team in
                        SnapshotConstructorRow(team: team)
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
            }
        }
        .cardStyle()
    }
}

private struct SnapshotDriverRow: View {
    let driver: DriverStanding

    var body: some View {
        HStack(spacing: 8) {
            Text(String(driver.position))
                .font(.system(size: 12, weight: .medium, design: .monospaced))
                .foregroundStyle(Color.pitwallMuted)
                .frame(width: 16, alignment: .trailing)
            TeamColorBarView(color: driver.teamColor, height: 20)
            HStack(spacing: 2) {
                Text(driver.familyName)
                    .font(.system(size: 12))
                    .foregroundStyle(.white)
                Text(driver.code)
                    .font(.system(size: 12))
                    .foregroundStyle(Color.pitwallMuted)
            }
            Spacer()
            Text(driver.points.formatted())
                .font(.system(size: 12, weight: .medium, design: .monospaced))
                .foregroundStyle(Color(white: 0.8))
        }
        .padding(.vertical, 4)
    }
}

private struct SnapshotConstructorRow: View {
    let team: ConstructorStanding

    var body: some View {
        HStack(spacing: 8) {
            Text(String(team.position))
                .font(.system(size: 12, weight: .medium, design: .monospaced))
                .foregroundStyle(Color.pitwallMuted)
                .frame(width: 16, alignment: .trailing)
            TeamColorBarView(color: team.teamColor, height: 20)
            Text(team.name)
                .font(.system(size: 12))
                .foregroundStyle(.white)
                .lineLimit(1)
            Spacer()
            Text(team.points.formatted())
                .font(.system(size: 12, weight: .medium, design: .monospaced))
                .foregroundStyle(Color(white: 0.8))
        }
        .padding(.vertical, 4)
    }
}
