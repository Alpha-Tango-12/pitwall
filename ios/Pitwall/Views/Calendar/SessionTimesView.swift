import SwiftUI

struct SessionTimesView: View {
    let sessions: [RaceSession]

    var body: some View {
        VStack(spacing: 6) {
            ForEach(sessions) { session in
                HStack {
                    Text(session.name)
                        .font(.system(size: 13))
                        .foregroundStyle(Color(white: 0.8))
                    Spacer()
                    Text(session.date.formatted(date: .abbreviated, time: .shortened))
                        .font(.system(size: 12, design: .monospaced))
                        .foregroundStyle(Color.pitwallMuted)
                }
                .padding(.vertical, 4)
                if session.id != sessions.last?.id {
                    Divider().background(Color.pitwallBorder)
                }
            }
        }
        .padding(.top, 8)
    }
}
