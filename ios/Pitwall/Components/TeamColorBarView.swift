import SwiftUI

/// A 4pt-wide vertical colored bar representing a team.
/// Matches the web's TeamColorBar.tsx pattern.
struct TeamColorBarView: View {
    let color: Color
    var height: CGFloat = 24

    var body: some View {
        Rectangle()
            .fill(color)
            .frame(width: 4, height: height)
            .clipShape(RoundedRectangle(cornerRadius: 2))
    }
}
