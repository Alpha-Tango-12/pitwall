import SwiftUI

enum TireCompound: String, CaseIterable {
    case soft         = "SOFT"
    case medium       = "MEDIUM"
    case hard         = "HARD"
    case intermediate = "INTERMEDIATE"
    case wet          = "WET"
}

struct TireCompoundInfo {
    let compound: TireCompound
    let label: String
    let abbreviation: String
    let color: Color
    let description: String
}

let TIRE_COMPOUNDS: [TireCompoundInfo] = [
    TireCompoundInfo(compound: .soft,         label: "Soft",         abbreviation: "S", color: Color(hex: "#EF4444"), description: "Fastest tire but wears out quickly. Used for qualifying and short stints."),
    TireCompoundInfo(compound: .medium,       label: "Medium",       abbreviation: "M", color: Color(hex: "#EAB308"), description: "Balanced tire for speed and durability. The most versatile compound."),
    TireCompoundInfo(compound: .hard,         label: "Hard",         abbreviation: "H", color: Color(hex: "#F5F5F5"), description: "Slowest but longest-lasting tire. Used for long stints in races."),
    TireCompoundInfo(compound: .intermediate, label: "Intermediate", abbreviation: "I", color: Color(hex: "#22C55E"), description: "For damp conditions with light rain. Has shallow grooves to clear water."),
    TireCompoundInfo(compound: .wet,          label: "Wet",          abbreviation: "W", color: Color(hex: "#3B82F6"), description: "For heavy rain. Deep grooves clear the most water from the track surface."),
]

private let tireCompoundMap: [TireCompound: TireCompoundInfo] = Dictionary(
    uniqueKeysWithValues: TIRE_COMPOUNDS.map { ($0.compound, $0) }
)

func tireInfo(for compound: TireCompound) -> TireCompoundInfo {
    tireCompoundMap[compound] ?? TIRE_COMPOUNDS[0]
}

func tireColor(for compound: TireCompound) -> Color {
    tireCompoundMap[compound]?.color ?? Color.pitwallMuted
}

func tireCompound(from string: String) -> TireCompound {
    TireCompound(rawValue: string.uppercased()) ?? .hard
}
