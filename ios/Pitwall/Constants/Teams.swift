import SwiftUI

struct Team: Identifiable {
    let id: String
    let name: String
    let shortName: String
    let color: Color
    let drivers: (String, String)
}

let TEAMS: [Team] = [
    Team(id: "red_bull",      name: "Oracle Red Bull Racing",              shortName: "Red Bull",      color: Color(hex: "#1E5BC6"), drivers: ("max_verstappen", "hadjar")),
    Team(id: "ferrari",       name: "Scuderia Ferrari HP",                 shortName: "Ferrari",       color: Color(hex: "#ED1C24"), drivers: ("leclerc", "hamilton")),
    Team(id: "mclaren",       name: "McLaren Mastercard F1 Team",          shortName: "McLaren",       color: Color(hex: "#F58020"), drivers: ("norris", "piastri")),
    Team(id: "mercedes",      name: "Mercedes-AMG PETRONAS F1 Team",       shortName: "Mercedes",      color: Color(hex: "#6CD3BF"), drivers: ("russell", "antonelli")),
    Team(id: "aston_martin",  name: "Aston Martin Aramco F1 Team",         shortName: "Aston Martin",  color: Color(hex: "#002420"), drivers: ("alonso", "stroll")),
    Team(id: "alpine",        name: "BWT Alpine F1 Team",                  shortName: "Alpine",        color: Color(hex: "#2293D1"), drivers: ("gasly", "colapinto")),
    Team(id: "williams",      name: "Atlassian Williams F1 Team",          shortName: "Williams",      color: Color(hex: "#37BEDD"), drivers: ("albon", "sainz")),
    Team(id: "rb",            name: "Visa Cash App Racing Bulls",          shortName: "Racing Bulls",  color: Color(hex: "#4E7C9B"), drivers: ("lawson", "lindblad")),
    Team(id: "haas",          name: "TGR Haas F1 Team",                    shortName: "Haas",          color: Color(hex: "#B6BABD"), drivers: ("ocon", "bearman")),
    Team(id: "sauber",        name: "Audi Revolut F1 Team",                shortName: "Audi",          color: Color(hex: "#BB0A30"), drivers: ("hulkenberg", "bortoleto")),
    Team(id: "cadillac",      name: "Cadillac Formula 1 Team",             shortName: "Cadillac",      color: Color(hex: "#1C1C1C"), drivers: ("bottas", "perez")),
]

private let teamByID: [String: Team] = Dictionary(uniqueKeysWithValues: TEAMS.map { ($0.id, $0) })

func teamColor(for constructorId: String) -> Color {
    teamByID[constructorId]?.color ?? Color.pitwallMuted
}

// MARK: - Hex init
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let r = Double((int >> 16) & 0xFF) / 255
        let g = Double((int >> 8) & 0xFF) / 255
        let b = Double(int & 0xFF) / 255
        self.init(red: r, green: g, blue: b)
    }
}
