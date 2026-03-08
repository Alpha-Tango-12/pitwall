import SwiftUI

struct DriverStandingsView: View {
    let standings: [DriverStanding]

    var body: some View {
        VStack(spacing: 8) {
            ForEach(standings) { driver in
                DriverRowView(driver: driver)
            }
        }
    }
}

struct DriverRowView: View {
    let driver: DriverStanding

    private var isTop3: Bool { driver.position <= 3 }

    var body: some View {
        HStack(spacing: 12) {
            Text(String(driver.position))
                .font(.system(size: 13, weight: .bold, design: .monospaced))
                .foregroundStyle(isTop3 ? Color.f1Red : Color.pitwallMuted)
                .frame(width: 24, alignment: .trailing)

            TeamColorBarView(color: driver.teamColor, height: 44)

            VStack(alignment: .leading, spacing: 2) {
                Text("\(driver.givenName) \(driver.familyName)")
                    .font(.system(size: 14, weight: .medium))
                    .foregroundStyle(.white)
                Text(driver.constructorName)
                    .font(.system(size: 12))
                    .foregroundStyle(Color.pitwallMuted)
            }

            Spacer()

            VStack(alignment: .trailing, spacing: 2) {
                Text("\(driver.points.formatted()) pts")
                    .font(.system(size: 13, weight: .bold))
                    .foregroundStyle(.white)
                Text("\(driver.wins) wins")
                    .font(.system(size: 12))
                    .foregroundStyle(Color.pitwallMuted)
            }
        }
        .cardStyle(padding: 12)
    }
}
