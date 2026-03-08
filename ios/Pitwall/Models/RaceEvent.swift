import Foundation

enum EventSeverity {
    case info, warning, danger
}

struct RaceEvent: Identifiable {
    var id: Date { timestamp }
    let timestamp: Date
    let lapNumber: Int?
    let driverNumber: Int?
    let driverName: String?
    let category: String
    let flag: String?
    let message: String
    let explanation: String
    let severity: EventSeverity
}
