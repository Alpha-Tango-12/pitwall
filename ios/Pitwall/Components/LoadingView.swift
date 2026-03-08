import SwiftUI

struct LoadingView: View {
    var body: some View {
        HStack {
            Spacer()
            ProgressView()
                .tint(Color.pitwallMuted)
                .padding(.vertical, 24)
            Spacer()
        }
    }
}
