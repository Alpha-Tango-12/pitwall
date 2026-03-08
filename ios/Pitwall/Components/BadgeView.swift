import SwiftUI

enum BadgeVariant {
    case `default`  // zinc-800 bg, zinc-300 text
    case yellow     // amber for sprint weekends
    case red        // f1-red accent
    case indigo     // replay mode
}

struct BadgeView: View {
    let text: String
    var variant: BadgeVariant = .default

    private var bgColor: Color {
        switch variant {
        case .default: return Color.pitwallBorder
        case .yellow:  return Color(red: 0.451, green: 0.302, blue: 0.000) // amber-950-ish
        case .red:     return Color.f1Red.opacity(0.2)
        case .indigo:  return Color(red: 0.063, green: 0.082, blue: 0.239) // indigo-950
        }
    }

    private var textColor: Color {
        switch variant {
        case .default: return Color(red: 0.820, green: 0.820, blue: 0.839) // zinc-300
        case .yellow:  return Color(red: 0.918, green: 0.702, blue: 0.031) // yellow-400
        case .red:     return Color.f1Red
        case .indigo:  return Color(red: 0.647, green: 0.678, blue: 0.988) // indigo-400
        }
    }

    var body: some View {
        Text(text)
            .font(.system(size: 10, weight: .medium))
            .padding(.horizontal, 8)
            .padding(.vertical, 3)
            .background(bgColor)
            .foregroundStyle(textColor)
            .clipShape(Capsule())
    }
}
