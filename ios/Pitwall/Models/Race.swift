import Foundation

struct Race: Identifiable {
    var id: Int { round }
    let round: Int
    let raceName: String
    let circuitId: String
    let circuitName: String
    let locality: String
    let country: String
    let date: Date
    let time: String
    let isSprint: Bool
    let isPast: Bool
    let sessions: [RaceSession]
}

struct RaceSession: Identifiable {
    var id: String { name }
    let name: String
    let date: Date
}
