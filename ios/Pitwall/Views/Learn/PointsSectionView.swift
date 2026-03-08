import SwiftUI

struct PointsSectionView: View {
    var body: some View {
        VStack(spacing: 12) {
            HStack(alignment: .top, spacing: 12) {
                PointsTableView(title: "Race Points", points: POINTS_RACE)
                PointsTableView(title: "Sprint Points", points: POINTS_SPRINT)
            }

            // Fastest lap note
            HStack(spacing: 4) {
                Text("Fastest Lap")
                    .font(.system(size: 13, weight: .medium))
                    .foregroundStyle(.white)
                Text("— +\(POINTS_FASTEST_LAP) point if you finish in the top 10")
                    .font(.system(size: 13))
                    .foregroundStyle(Color.pitwallMuted)
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 10)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Color.pitwallCard)
            .clipShape(RoundedRectangle(cornerRadius: 10))
            .overlay(
                RoundedRectangle(cornerRadius: 10)
                    .stroke(Color.pitwallBorder, lineWidth: 1)
            )
        }
    }
}

private struct PointsTableView: View {
    let title: String
    let points: [Int]

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.system(size: 13, weight: .semibold))
                .foregroundStyle(.white)

            VStack(spacing: 0) {
                // Header
                HStack {
                    Text("Position")
                        .font(.system(size: 10, weight: .medium))
                        .foregroundStyle(Color.pitwallMuted)
                    Spacer()
                    Text("Points")
                        .font(.system(size: 10, weight: .medium))
                        .foregroundStyle(Color.pitwallMuted)
                }
                .padding(.horizontal, 8)
                .padding(.bottom, 6)

                ForEach(Array(points.enumerated()), id: \.offset) { index, pts in
                    HStack {
                        Text(ordinal(index + 1))
                            .font(.system(size: 13))
                            .foregroundStyle(Color(white: 0.75))
                        Spacer()
                        Text("\(pts)")
                            .font(.system(size: 13, weight: .medium))
                            .foregroundStyle(.white)
                    }
                    .padding(.horizontal, 8)
                    .padding(.vertical, 6)
                    .background(index == 0 ? Color.pitwallBorder : Color.clear)
                    .clipShape(RoundedRectangle(cornerRadius: 4))

                    if index < points.count - 1 {
                        Divider().background(Color.pitwallBorder)
                    }
                }
            }
        }
        .padding(12)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color.pitwallCard)
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color.pitwallBorder, lineWidth: 1)
        )
    }

    private func ordinal(_ n: Int) -> String {

        // Simple switch is safer
        switch n {
        case 1: return "P1st"
        case 2: return "P2nd"
        case 3: return "P3rd"
        default: return "P\(n)th"
        }
    }
}
