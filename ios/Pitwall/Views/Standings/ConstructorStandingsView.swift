import SwiftUI

struct ConstructorStandingsView: View {
    let standings: [ConstructorStanding]

    var body: some View {
        VStack(spacing: 8) {
            ForEach(standings) { team in
                ConstructorRowView(team: team)
            }
        }
    }
}

struct ConstructorRowView: View {
    let team: ConstructorStanding

    private var isTop3: Bool { team.position <= 3 }

    var body: some View {
        HStack(spacing: 12) {
            Text(String(team.position))
                .font(.system(size: 13, weight: .bold, design: .monospaced))
                .foregroundStyle(isTop3 ? Color.f1Red : Color.pitwallMuted)
                .frame(width: 24, alignment: .trailing)

            TeamColorBarView(color: team.teamColor, height: 44)

            VStack(alignment: .leading, spacing: 2) {
                Text(team.name)
                    .font(.system(size: 14, weight: .medium))
                    .foregroundStyle(.white)
                Text(team.nationality)
                    .font(.system(size: 12))
                    .foregroundStyle(Color.pitwallMuted)
            }

            Spacer()

            VStack(alignment: .trailing, spacing: 2) {
                Text("\(team.points.formatted()) pts")
                    .font(.system(size: 13, weight: .bold))
                    .foregroundStyle(.white)
                Text("\(team.wins) wins")
                    .font(.system(size: 12))
                    .foregroundStyle(Color.pitwallMuted)
            }
        }
        .cardStyle(padding: 12)
    }
}
