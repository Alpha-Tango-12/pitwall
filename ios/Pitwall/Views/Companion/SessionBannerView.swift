import SwiftUI

struct SessionBannerView: View {
    let raceName: String
    let sessionName: String
    let isLive: Bool
    let isReplay: Bool
    let onToggle: () -> Void

    @State private var pulse = false

    var body: some View {
        HStack(spacing: 12) {
            // Status badge
            Group {
                if isLive {
                    HStack(spacing: 6) {
                        Circle()
                            .fill(Color.f1Red)
                            .frame(width: 8, height: 8)
                            .scaleEffect(pulse ? 1.4 : 1.0)
                            .animation(.easeInOut(duration: 0.8).repeatForever(autoreverses: true), value: pulse)
                            .onAppear { pulse = true }
                        Text("LIVE")
                            .font(.system(size: 10, weight: .semibold))
                            .tracking(1)
                            .foregroundStyle(Color.f1Red)
                    }
                } else if isReplay {
                    BadgeView(text: "Replay", variant: .indigo)
                } else {
                    BadgeView(text: "Simulated")
                }
            }

            // Race / session name
            VStack(alignment: .leading, spacing: 1) {
                Text(raceName)
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundStyle(.white)
                Text(sessionName)
                    .font(.system(size: 11))
                    .foregroundStyle(Color.pitwallMuted)
            }

            Spacer()

            Button(action: onToggle) {
                Text(isReplay ? "Use Live Data" : "Use Mock Data")
                    .font(.system(size: 11, weight: .medium))
                    .foregroundStyle(Color(white: 0.7))
                    .padding(.horizontal, 10)
                    .padding(.vertical, 6)
                    .background(Color.pitwallBorder)
                    .clipShape(RoundedRectangle(cornerRadius: 8))
            }
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 10)
        .background(Color.pitwallCard)
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color.pitwallBorder, lineWidth: 1)
        )
    }
}
