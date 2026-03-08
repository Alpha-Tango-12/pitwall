import SwiftUI

struct NextRaceCardView: View {
    let race: Race?

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Text("Next Race")
                    .font(.headline)
                    .foregroundStyle(.white)
                Spacer()
                if let race {
                    BadgeView(text: "Round \(race.round)")
                }
            }

            if let race {
                VStack(alignment: .leading, spacing: 8) {
                    VStack(alignment: .leading, spacing: 2) {
                        Text(race.raceName)
                            .font(.title3.bold())
                            .foregroundStyle(.white)
                        Text(race.circuitName)
                            .font(.subheadline)
                            .foregroundStyle(Color.pitwallMuted)
                    }

                    Label("\(race.locality), \(race.country)", systemImage: "mappin.circle")
                        .font(.caption)
                        .foregroundStyle(Color.pitwallMuted)

                    if race.isSprint {
                        BadgeView(text: "Sprint Weekend", variant: .yellow)
                    }

                    CountdownView(targetDate: race.date)
                        .padding(.top, 4)
                }
            } else {
                Text("No upcoming races")
                    .font(.subheadline)
                    .foregroundStyle(Color.pitwallMuted)
            }
        }
        .cardStyle()
    }
}
