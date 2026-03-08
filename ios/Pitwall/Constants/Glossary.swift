import Foundation

enum GlossaryCategory: String, CaseIterable {
    case racing    = "racing"
    case technical = "technical"
    case strategy  = "strategy"
    case rules     = "rules"
    case tires     = "tires"

    var label: String {
        switch self {
        case .racing:    return "Racing"
        case .technical: return "Technical"
        case .strategy:  return "Strategy"
        case .rules:     return "Rules"
        case .tires:     return "Tires"
        }
    }
}

struct GlossaryTerm: Identifiable {
    var id: String { term }
    let term: String
    let definition: String
    let category: GlossaryCategory
    var relatedTerms: [String] = []
}

let GLOSSARY: [GlossaryTerm] = [
    // Racing
    GlossaryTerm(term: "Apex", definition: "The innermost point of a corner. Hitting the apex perfectly lets drivers carry the most speed through a turn.", category: .racing),
    GlossaryTerm(term: "Braking Zone", definition: "The area before a corner where drivers brake from high speed. Getting the braking point right is crucial for fast lap times.", category: .racing),
    GlossaryTerm(term: "Clean Air", definition: "Undisturbed air in front of a car. Drivers in clean air have better aerodynamic performance than those following closely behind another car.", category: .racing, relatedTerms: ["Dirty Air", "DRS"]),
    GlossaryTerm(term: "Dirty Air", definition: "Turbulent air left behind a car that reduces downforce for the car following. Makes it harder to stay close in corners.", category: .racing, relatedTerms: ["Clean Air", "DRS"]),
    GlossaryTerm(term: "DRS", definition: "Drag Reduction System. A flap on the rear wing that opens on straights to reduce drag and boost top speed. Only available within 1 second of the car ahead in designated zones.", category: .racing, relatedTerms: ["Clean Air", "Dirty Air", "Slipstream"]),
    GlossaryTerm(term: "Fastest Lap", definition: "The quickest single lap completed by any driver during the race. Earns 1 bonus point if the driver finishes in the top 10.", category: .racing),
    GlossaryTerm(term: "Formation Lap", definition: "The lap before the race start where cars follow the pole sitter around the circuit to warm up tires and brakes.", category: .racing),
    GlossaryTerm(term: "Grand Prix", definition: "French for 'Grand Prize.' Each F1 race is called a Grand Prix, usually named after the host country.", category: .racing),
    GlossaryTerm(term: "Grid Position", definition: "A driver's starting position for the race, determined by qualifying results. Pole position is P1.", category: .racing),
    GlossaryTerm(term: "Lapped", definition: "When a car falls an entire lap behind the race leader. Blue flags tell lapped cars to move aside.", category: .racing),
    GlossaryTerm(term: "Overtake", definition: "Passing another car to gain position. Can happen on straights with DRS or through corners with better grip or braking.", category: .racing, relatedTerms: ["DRS", "Undercut", "Overcut"]),
    GlossaryTerm(term: "Pole Position", definition: "First place on the starting grid. The driver with the fastest qualifying time starts here — on the racing line for turn 1.", category: .racing),
    GlossaryTerm(term: "Slipstream", definition: "Tucking behind another car on a straight to reduce air resistance. The following car can then slingshot past with extra speed.", category: .racing, relatedTerms: ["DRS", "Dirty Air"]),

    // Technical
    GlossaryTerm(term: "Aerodynamics", definition: "How air flows over and around the car. F1 cars use wings and body shape to generate downforce (grip) while minimizing drag.", category: .technical),
    GlossaryTerm(term: "Downforce", definition: "Aerodynamic force pushing the car onto the track. More downforce means more grip in corners but also more drag on straights.", category: .technical, relatedTerms: ["Aerodynamics"]),
    GlossaryTerm(term: "ERS", definition: "Energy Recovery System. Captures energy from braking and exhaust heat, then deploys it as extra power. Each car has a limited amount per lap.", category: .technical),
    GlossaryTerm(term: "Flat Spot", definition: "A worn patch on a tire caused by locking up a wheel under braking. Creates vibration and reduces grip — often requires an early pit stop.", category: .technical, relatedTerms: ["Lock-Up"]),
    GlossaryTerm(term: "G-Force", definition: "Gravitational force experienced by drivers in corners and under braking. F1 drivers experience up to 6G in fast corners.", category: .technical),
    GlossaryTerm(term: "Lock-Up", definition: "When a wheel stops rotating under heavy braking while the car is still moving. Creates a flat spot on the tire and a puff of smoke.", category: .technical, relatedTerms: ["Flat Spot"]),
    GlossaryTerm(term: "Power Unit", definition: "The engine and hybrid system combined. Includes the internal combustion engine, turbo, and two electric motor-generator units (MGU-H and MGU-K).", category: .technical, relatedTerms: ["ERS"]),
    GlossaryTerm(term: "Setup", definition: "How the car is configured for a specific track — wing angles, suspension, ride height, etc. Teams spend practice sessions dialing in the setup.", category: .technical),
    GlossaryTerm(term: "Telemetry", definition: "Real-time data streamed from the car to the pit wall. Engineers monitor hundreds of sensors covering engine, tires, brakes, and more.", category: .technical),

    // Strategy
    GlossaryTerm(term: "Box, Box", definition: "Radio message telling a driver to come into the pit lane for a stop. 'Box' comes from the German word for pit stop area.", category: .strategy, relatedTerms: ["Pit Stop"]),
    GlossaryTerm(term: "Free Stop", definition: "When a driver has such a large gap to the car behind that they can pit and rejoin without losing position.", category: .strategy, relatedTerms: ["Pit Stop", "Undercut"]),
    GlossaryTerm(term: "Overcut", definition: "Staying out longer than a rival before pitting. Works when fresh tires don't give enough speed advantage to jump ahead.", category: .strategy, relatedTerms: ["Undercut", "Pit Stop"]),
    GlossaryTerm(term: "Pit Stop", definition: "Coming into the pit lane to change tires and/or make adjustments. A fast F1 pit stop takes about 2-3 seconds for tire changes.", category: .strategy, relatedTerms: ["Box, Box", "Undercut", "Overcut"]),
    GlossaryTerm(term: "Pit Window", definition: "The range of laps where teams plan to make a pit stop. Determined by tire wear, strategy, and traffic.", category: .strategy, relatedTerms: ["Pit Stop"]),
    GlossaryTerm(term: "Safety Car", definition: "A Mercedes-AMG GT that leads the field at reduced speed after a serious incident. Bunches the cars up and closes gaps.", category: .strategy, relatedTerms: ["Virtual Safety Car"]),
    GlossaryTerm(term: "Stint", definition: "The period between pit stops where a driver runs on one set of tires. A typical race has 1-3 stints.", category: .strategy, relatedTerms: ["Pit Stop"]),
    GlossaryTerm(term: "Undercut", definition: "Pitting before a rival to get fresh tires first. The faster tire performance can gain enough time to jump ahead when they pit.", category: .strategy, relatedTerms: ["Overcut", "Pit Stop"]),
    GlossaryTerm(term: "Virtual Safety Car", definition: "Drivers must slow to a target delta time instead of following a safety car. Maintains gaps between cars while reducing speed for a hazard.", category: .strategy, relatedTerms: ["Safety Car"]),

    // Rules
    GlossaryTerm(term: "DNF", definition: "Did Not Finish. When a driver has to retire from the race due to a crash, mechanical failure, or other issue.", category: .rules),
    GlossaryTerm(term: "DNS", definition: "Did Not Start. When a driver cannot take the start of the race, usually due to car problems on the grid.", category: .rules),
    GlossaryTerm(term: "DSQ", definition: "Disqualified. Removed from the results for a rule violation, such as a technical infringement or dangerous driving.", category: .rules),
    GlossaryTerm(term: "Parc Fermé", definition: "French for 'closed park.' After qualifying, cars are locked down — teams can't make major setup changes before the race.", category: .rules),
    GlossaryTerm(term: "Penalty", definition: "Punishment for rule-breaking. Can be time penalties (5s, 10s), grid drops, drive-through penalties, or disqualification.", category: .rules),
    GlossaryTerm(term: "Sprint", definition: "A shorter race (about 100km) held on Saturday at select weekends. Awards points to the top 8 finishers.", category: .rules),
    GlossaryTerm(term: "Stewards", definition: "The race officials who make decisions on penalties, investigations, and rule enforcement during a Grand Prix.", category: .rules),
    GlossaryTerm(term: "Track Limits", definition: "The defined boundaries of the circuit. Drivers who exceed track limits (all four wheels off track) may have lap times deleted or receive penalties.", category: .rules),

    // Tires
    GlossaryTerm(term: "Blistering", definition: "When the tire surface overheats and forms bubbles. Reduces grip and can happen when pushing too hard on worn tires.", category: .tires),
    GlossaryTerm(term: "Compound", definition: "The rubber mixture of a tire. Softer compounds grip better but wear faster. Each race weekend uses three dry compounds (C1-C5 range).", category: .tires, relatedTerms: ["Stint"]),
    GlossaryTerm(term: "Degradation", definition: "How quickly a tire loses performance over a stint. High degradation means more pit stops and more strategy options.", category: .tires, relatedTerms: ["Stint", "Compound"]),
    GlossaryTerm(term: "Graining", definition: "When small pieces of rubber tear off the tire surface, forming a layer that reduces grip. Usually clears after a few laps.", category: .tires),
    GlossaryTerm(term: "Marbles", definition: "Small balls of rubber that collect off the racing line. Driving over marbles dramatically reduces grip — risky during overtaking.", category: .tires),
    GlossaryTerm(term: "Tire Blankets", definition: "Electric heaters wrapped around tires before fitting to warm them to optimal temperature. Being phased out in coming seasons.", category: .tires),
    GlossaryTerm(term: "Tire Wear", definition: "How much rubber has been lost from the tire surface. Teams monitor wear carefully to decide when to pit.", category: .tires, relatedTerms: ["Degradation", "Stint"]),
]
