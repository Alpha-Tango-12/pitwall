import SwiftUI

struct SeasonProgressView: View {
    let completedRaces: Int
    let totalRaces: Int

    private var progress: Double {
        guard totalRaces > 0 else { return 0 }
        return Double(completedRaces) / Double(totalRaces)
    }

    var body: some View {
        VStack(spacing: 12) {
            HStack {
                Text("Season Progress")
                    .font(.headline)
                    .foregroundStyle(.white)
                Spacer()
                Text("Round \(completedRaces) of \(totalRaces)")
                    .font(.subheadline)
                    .foregroundStyle(Color.pitwallMuted)
            }

            ProgressView(value: progress)
                .tint(Color.f1Red)
                .scaleEffect(x: 1, y: 1.5)
        }
        .cardStyle()
    }
}
