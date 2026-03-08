import SwiftUI

struct Stint: Identifiable {
    var id: Int { stintNumber }
    let driverNumber: Int
    let driverName: String
    let teamColor: Color
    let stintNumber: Int
    let compound: TireCompound
    let lapStart: Int
    let lapEnd: Int
    let lapCount: Int
    let tyreAgeAtStart: Int
}

struct DriverStints: Identifiable {
    var id: Int { driverNumber }
    let driverNumber: Int
    let driverName: String
    let teamName: String
    let teamColor: Color
    let stints: [Stint]
}
