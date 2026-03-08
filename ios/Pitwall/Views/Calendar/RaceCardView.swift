import SwiftUI

struct RaceCardView: View {
    let race: Race
    let isNext: Bool
    @State private var expanded = false

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Card content with optional left border for next race
            HStack(alignment: .top, spacing: 12) {
                // Next race indicator: red left border
                if isNext {
                    Rectangle()
                        .fill(Color.f1Red)
                        .frame(width: 3)
                        .clipShape(RoundedRectangle(cornerRadius: 1.5))
                }

                VStack(alignment: .leading, spacing: 4) {
                    // Round + sprint badge
                    HStack(spacing: 6) {
                        Text("R\(race.round)")
                            .font(.system(size: 11, weight: .medium))
                            .foregroundStyle(Color.pitwallMuted)
                        if race.isSprint {
                            BadgeView(text: "Sprint", variant: .yellow)
                        }
                    }

                    Text(race.raceName)
                        .font(.system(size: 15, weight: .semibold))
                        .foregroundStyle(.white)

                    Text("\(race.locality), \(race.country)")
                        .font(.subheadline)
                        .foregroundStyle(Color.pitwallMuted)

                    Text(race.date.formatted(date: .abbreviated, time: .omitted))
                        .font(.subheadline)
                        .foregroundStyle(Color.pitwallMuted)
                }

                Spacer()

                Button {
                    withAnimation(.easeInOut(duration: 0.2)) {
                        expanded.toggle()
                    }
                } label: {
                    Image(systemName: expanded ? "chevron.up" : "chevron.down")
                        .font(.system(size: 14, weight: .medium))
                        .foregroundStyle(Color.pitwallMuted)
                        .padding(6)
                        .background(Color.pitwallBorder)
                        .clipShape(RoundedRectangle(cornerRadius: 6))
                }
            }
            .padding(16)

            if expanded {
                Divider()
                    .background(Color.pitwallBorder)
                SessionTimesView(sessions: race.sessions)
                    .padding(.horizontal, 16)
                    .padding(.bottom, 12)
            }
        }
        .background(Color.pitwallCard)
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color.pitwallBorder, lineWidth: 1)
        )
        .opacity(race.isPast ? 0.5 : 1.0)
    }
}
