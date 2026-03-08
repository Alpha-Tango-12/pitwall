import SwiftUI

struct CountdownView: View {
    let targetDate: Date

    @State private var timeRemaining: DateComponents = DateComponents()
    private let timer = Timer.publish(every: 1, on: .main, in: .common).autoconnect()

    var body: some View {
        Group {
            if isExpired {
                Text("Race has started!")
                    .font(.subheadline)
                    .foregroundStyle(Color.pitwallMuted)
            } else {
                HStack(spacing: 12) {
                    countdownUnit(value: timeRemaining.day ?? 0, label: "D")
                    countdownUnit(value: timeRemaining.hour ?? 0, label: "H")
                    countdownUnit(value: timeRemaining.minute ?? 0, label: "M")
                    countdownUnit(value: timeRemaining.second ?? 0, label: "S")
                }
            }
        }
        .onReceive(timer) { _ in
            updateCountdown()
        }
        .onAppear {
            updateCountdown()
        }
    }

    private var isExpired: Bool {
        targetDate <= Date()
    }

    private func updateCountdown() {
        let now = Date()
        if targetDate <= now {
            timeRemaining = DateComponents()
            return
        }
        let components = Calendar.current.dateComponents(
            [.day, .hour, .minute, .second],
            from: now,
            to: targetDate
        )
        timeRemaining = components
    }

    private func countdownUnit(value: Int, label: String) -> some View {
        VStack(spacing: 2) {
            Text(String(format: "%02d", value))
                .font(.system(size: 24, weight: .bold, design: .monospaced))
                .foregroundStyle(.white)
            Text(label)
                .font(.system(size: 10, weight: .medium))
                .foregroundStyle(Color.pitwallMuted)
        }
    }
}
