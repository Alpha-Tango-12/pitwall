import SwiftUI

struct WeekendSectionView: View {
    @State private var showSprint = false

    private var format: WeekendFormat {
        showSprint ? SPRINT_WEEKEND : STANDARD_WEEKEND
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Toggle
            HStack(spacing: 0) {
                weekendTypeButton(label: "Standard", active: !showSprint) { showSprint = false }
                weekendTypeButton(label: "Sprint", active: showSprint) { showSprint = true }
            }
            .padding(4)
            .background(Color.pitwallCard)
            .clipShape(RoundedRectangle(cornerRadius: 10))
            .overlay(
                RoundedRectangle(cornerRadius: 10)
                    .stroke(Color.pitwallBorder, lineWidth: 1)
            )

            // Sessions
            VStack(spacing: 8) {
                ForEach(format.sessions) { session in
                    WeekendSessionRowView(session: session)
                }
            }
        }
    }

    private func weekendTypeButton(label: String, active: Bool, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Text(label)
                .font(.system(size: 13, weight: .medium))
                .foregroundStyle(active ? .white : Color.pitwallMuted)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 8)
                .background(active ? Color.pitwallBorder : Color.clear)
                .clipShape(RoundedRectangle(cornerRadius: 8))
        }
    }
}

private struct WeekendSessionRowView: View {
    let session: WeekendSession

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            VStack(alignment: .leading, spacing: 2) {
                Text(session.name)
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundStyle(.white)
                Text(session.day)
                    .font(.system(size: 12))
                    .foregroundStyle(Color.pitwallMuted)
            }
            .frame(width: 130, alignment: .leading)

            Text(session.description)
                .font(.system(size: 13))
                .foregroundStyle(Color(white: 0.7))
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding(12)
        .background(Color.pitwallCard)
        .clipShape(RoundedRectangle(cornerRadius: 10))
        .overlay(
            RoundedRectangle(cornerRadius: 10)
                .stroke(Color.pitwallBorder, lineWidth: 1)
        )
    }
}
