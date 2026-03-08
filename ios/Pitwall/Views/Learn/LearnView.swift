import SwiftUI

struct LearnView: View {
    @State private var vm = LearnViewModel()

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    // Page header
                    VStack(alignment: .leading, spacing: 2) {
                        Text("Learn F1")
                            .font(.title2.bold())
                            .foregroundStyle(.white)
                        Text("Understand the sport — flags, strategy, and everything in between.")
                            .font(.subheadline)
                            .foregroundStyle(Color.pitwallMuted)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)

                    // Section nav (scrollable pill row)
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 8) {
                            ForEach(LearnSection.allCases, id: \.self) { section in
                                Button {
                                    vm.activeSection = section
                                } label: {
                                    Text(section.rawValue)
                                        .font(.system(size: 13, weight: .medium))
                                        .foregroundStyle(vm.activeSection == section ? .white : Color.pitwallMuted)
                                        .padding(.horizontal, 14)
                                        .padding(.vertical, 7)
                                        .background(vm.activeSection == section ? Color.pitwallBorder : Color.pitwallCard)
                                        .clipShape(Capsule())
                                        .overlay(
                                            Capsule().stroke(Color.pitwallBorder, lineWidth: 1)
                                        )
                                }
                            }
                        }
                    }

                    // Section content
                    switch vm.activeSection {
                    case .glossary: GlossarySectionView(vm: vm)
                    case .flags:    FlagsSectionView()
                    case .weekend:  WeekendSectionView()
                    case .strategy: StrategySectionView()
                    case .points:   PointsSectionView()
                    }
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 24)
            }
            .background(Color.pitwallBase)
            .scrollContentBackground(.hidden)
        }
    }
}
