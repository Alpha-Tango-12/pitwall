import SwiftUI

struct DriverStanding: Identifiable {
    var id: String { driverId }
    let position: Int
    let driverId: String
    let code: String
    let givenName: String
    let familyName: String
    let nationality: String
    let points: Double
    let wins: Int
    let constructorId: String
    let constructorName: String
    let teamColor: Color
}

struct ConstructorStanding: Identifiable {
    var id: String { constructorId }
    let position: Int
    let constructorId: String
    let name: String
    let nationality: String
    let points: Double
    let wins: Int
    let teamColor: Color
}
