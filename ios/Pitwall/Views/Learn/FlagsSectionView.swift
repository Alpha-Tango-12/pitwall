import SwiftUI

struct FlagsSectionView: View {
    var body: some View {
        VStack(spacing: 8) {
            ForEach(FLAGS) { flag in
                FlagRowView(flag: flag)
            }
        }
    }
}

private struct FlagRowView: View {
    let flag: FlagInfo

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(spacing: 12) {
                Circle()
                    .fill(flag.color)
                    .frame(width: 28, height: 28)
                    .overlay(
                        Circle().stroke(Color.pitwallBorder, lineWidth: 1)
                    )
                Text(flag.name)
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundStyle(.white)
            }

            Text(flag.meaning)
                .font(.system(size: 13))
                .foregroundStyle(Color(white: 0.75))

            HStack(alignment: .top, spacing: 6) {
                Text("Driver action:")
                    .font(.system(size: 12, weight: .medium))
                    .foregroundStyle(Color.pitwallMuted)
                Text(flag.driverAction)
                    .font(.system(size: 12))
                    .foregroundStyle(Color(white: 0.65))
            }
        }
        .padding(16)
        .frame(maxWidth: .infinity, alignment: .leading)
        .cardStyle(padding: 0)
        .padding(16)
        .background(Color.pitwallCard)
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color.pitwallBorder, lineWidth: 1)
        )
    }
}
