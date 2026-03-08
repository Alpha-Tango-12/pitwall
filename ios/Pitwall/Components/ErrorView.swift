import SwiftUI

struct ErrorView: View {
    let message: String
    var onRetry: (() -> Void)?

    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: "exclamationmark.triangle")
                .font(.title2)
                .foregroundStyle(Color.pitwallMuted)
            Text(message)
                .font(.subheadline)
                .foregroundStyle(Color.pitwallMuted)
                .multilineTextAlignment(.center)
            if let onRetry {
                Button("Retry", action: onRetry)
                    .font(.subheadline.weight(.medium))
                    .foregroundStyle(Color.f1Red)
            }
        }
        .padding()
        .frame(maxWidth: .infinity)
        .cardStyle()
    }
}
