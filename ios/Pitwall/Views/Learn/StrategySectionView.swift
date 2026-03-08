import SwiftUI

private struct StrategyCard: Identifiable {
    let id = UUID()
    let title: String
    let body: String
}

private let strategyCards: [StrategyCard] = [
    StrategyCard(
        title: "The Undercut",
        body: "A team pits their driver early to give them fresh tires. The faster pace on new rubber lets them gain enough time so when the rival pits, they come out behind. Classic move to switch track position without overtaking on track."
    ),
    StrategyCard(
        title: "The Overcut",
        body: "The opposite — a driver stays out longer than their rival. Works when tire performance degrades quickly or when traffic means the fresh tire advantage isn't enough to jump ahead in the pits."
    ),
    StrategyCard(
        title: "One-Stop vs Two-Stop",
        body: "One-stop: fewer pit stops, more total laps per set of tires. Two-stop: fresher tires more often, but time lost in pit lane. Teams model both strategies based on tire degradation rates and traffic."
    ),
    StrategyCard(
        title: "Safety Car Opportunity",
        body: "When the safety car comes out, gaps close up. Teams with nothing to lose may 'free pit' — ducking into the pits costs much less time than normal because everyone slows down. This can dramatically change race outcomes."
    ),
    StrategyCard(
        title: "Track Position vs Tire Advantage",
        body: "Running ahead in clear air is often worth more than having newer tires. 'Dirty air' from the car ahead reduces a trailing car's aerodynamic efficiency, making overtaking difficult even with a tire advantage."
    ),
]

struct StrategySectionView: View {
    var body: some View {
        VStack(spacing: 8) {
            ForEach(strategyCards) { card in
                VStack(alignment: .leading, spacing: 8) {
                    Text(card.title)
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundStyle(.white)
                    Text(card.body)
                        .font(.system(size: 13))
                        .foregroundStyle(Color(white: 0.7))
                }
                .padding(16)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Color.pitwallCard)
                .clipShape(RoundedRectangle(cornerRadius: 12))
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(Color.pitwallBorder, lineWidth: 1)
                )
            }
        }
    }
}
