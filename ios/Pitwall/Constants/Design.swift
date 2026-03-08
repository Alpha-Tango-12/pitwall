import SwiftUI

extension Color {
    // F1 brand
    static let f1Red = Color(red: 0.882, green: 0.024, blue: 0.000)      // #E10600
    static let f1RedDark = Color(red: 0.722, green: 0.020, blue: 0.000)  // #B80500

    // App backgrounds
    static let pitwallBase = Color(red: 0.035, green: 0.035, blue: 0.043)   // zinc-950 #09090B
    static let pitwallCard = Color(red: 0.094, green: 0.094, blue: 0.110)   // zinc-900 #18181B
    static let pitwallBorder = Color(red: 0.153, green: 0.153, blue: 0.165) // zinc-800 #27272A
    static let pitwallMuted = Color(red: 0.557, green: 0.557, blue: 0.600)  // zinc-500 #71717A

    // Severity
    static let severityWarning = Color(red: 0.918, green: 0.702, blue: 0.031) // yellow-400
    static let severityDanger = Color.f1Red
}

// MARK: - Card modifier
struct CardModifier: ViewModifier {
    var padding: CGFloat = 16

    func body(content: Content) -> some View {
        content
            .padding(padding)
            .background(Color.pitwallCard)
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(Color.pitwallBorder, lineWidth: 1)
            )
    }
}

extension View {
    func cardStyle(padding: CGFloat = 16) -> some View {
        modifier(CardModifier(padding: padding))
    }
}
