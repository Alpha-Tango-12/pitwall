import SwiftUI

/// A card container matching the web Card.tsx pattern:
/// zinc-900 background, zinc-800 border, 12pt corner radius.
struct CardView<Content: View>: View {
    let content: Content

    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    var body: some View {
        content
            .cardStyle()
    }
}
