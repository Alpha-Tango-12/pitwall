import SwiftUI

struct FlagInfo: Identifiable {
    var id: String { name }
    let name: String
    let color: Color
    let meaning: String
    let driverAction: String
}

let FLAGS: [FlagInfo] = [
    FlagInfo(name: "Green Flag",         color: Color(hex: "#22C55E"), meaning: "Track is clear — racing is on! Drivers can race at full speed.", driverAction: "Resume normal racing and push for position."),
    FlagInfo(name: "Yellow Flag",        color: Color(hex: "#EAB308"), meaning: "Danger ahead in that section of the track. Could be a crash, debris, or a car stopped on track.", driverAction: "Slow down, no overtaking in the yellow zone. Be prepared to take evasive action."),
    FlagInfo(name: "Double Yellow Flag", color: Color(hex: "#EAB308"), meaning: "Serious danger ahead. The track may be partly or fully blocked.", driverAction: "Slow down significantly, no overtaking, be prepared to stop if necessary."),
    FlagInfo(name: "Red Flag",           color: Color(hex: "#EF4444"), meaning: "Session stopped! A serious incident means it's too dangerous to continue.", driverAction: "Slow down immediately and return to the pit lane. The race is paused."),
    FlagInfo(name: "Blue Flag",          color: Color(hex: "#3B82F6"), meaning: "You're about to be lapped. A faster car is right behind you.", driverAction: "Let the faster car pass within 3 blue flag signals or face a penalty."),
    FlagInfo(name: "White Flag",         color: Color(hex: "#F5F5F5"), meaning: "Slow-moving vehicle on track. Could be a recovery vehicle or a very slow car.", driverAction: "Proceed with caution and be aware of the slower vehicle."),
    FlagInfo(name: "Black Flag",         color: Color(hex: "#1C1C1C"), meaning: "You've been disqualified or must return to the pits immediately.", driverAction: "Come into the pit lane within the next lap. You may not continue racing."),
    FlagInfo(name: "Black and Orange",   color: Color(hex: "#F97316"), meaning: "Your car has a mechanical problem that could be dangerous.", driverAction: "Come to the pits to have the issue fixed before continuing."),
    FlagInfo(name: "Checkered Flag",     color: Color(hex: "#A1A1AA"), meaning: "The session is over! The race is finished.", driverAction: "Complete the current lap and slow down. No more racing."),
]
