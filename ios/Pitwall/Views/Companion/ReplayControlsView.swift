import SwiftUI

struct ReplayControlsView: View {
    let currentLap: Int
    let totalLaps: Int
    let isPlaying: Bool
    let speed: ReplaySpeed
    let onPlayPause: () -> Void
    let onSeek: (Int) -> Void
    let onSpeedChange: (ReplaySpeed) -> Void
    let onReset: () -> Void

    @State private var sliderValue: Double = 0

    var body: some View {
        HStack(spacing: 10) {
            // Play / Pause
            Button(action: onPlayPause) {
                Image(systemName: isPlaying ? "pause.fill" : "play.fill")
                    .font(.system(size: 13))
                    .foregroundStyle(.white)
                    .frame(width: 32, height: 32)
                    .background(Color.pitwallBorder)
                    .clipShape(RoundedRectangle(cornerRadius: 8))
            }

            // Lap counter
            Text("LAP \(currentLap) / \(totalLaps)")
                .font(.system(size: 12, weight: .medium, design: .monospaced))
                .foregroundStyle(Color(white: 0.8))
                .fixedSize()

            // Seek slider
            Slider(
                value: Binding(
                    get: { Double(currentLap) },
                    set: { onSeek(Int($0)) }
                ),
                in: 0...Double(max(totalLaps, 1)),
                step: 1
            )
            .tint(Color.f1Red)

            // Speed buttons
            HStack(spacing: 4) {
                ForEach(ReplaySpeed.allCases, id: \.self) { s in
                    Button {
                        onSpeedChange(s)
                    } label: {
                        Text(s.label)
                            .font(.system(size: 10, weight: .medium))
                            .foregroundStyle(speed == s ? .white : Color.pitwallMuted)
                            .padding(.horizontal, 5)
                            .padding(.vertical, 3)
                            .background(speed == s ? Color.pitwallBorder : Color.clear)
                            .clipShape(RoundedRectangle(cornerRadius: 4))
                    }
                }
            }

            // Reset
            Button(action: onReset) {
                Image(systemName: "arrow.counterclockwise")
                    .font(.system(size: 12))
                    .foregroundStyle(Color.pitwallMuted)
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
