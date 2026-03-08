import SwiftUI

enum LearnSection: String, CaseIterable {
    case glossary = "Glossary"
    case flags    = "Flags"
    case weekend  = "Weekend"
    case strategy = "Strategy"
    case points   = "Points"
}

@MainActor
@Observable
final class LearnViewModel {
    var activeSection: LearnSection = .glossary
    var glossarySearch: String = ""
    var glossaryCategoryFilter: GlossaryCategory? = nil

    var filteredGlossary: [GlossaryTerm] {
        let q = glossarySearch.lowercased()
        return GLOSSARY.filter { term in
            let matchesSearch = q.isEmpty
                || term.term.lowercased().contains(q)
                || term.definition.lowercased().contains(q)
            let matchesCategory = glossaryCategoryFilter == nil
                || term.category == glossaryCategoryFilter
            return matchesSearch && matchesCategory
        }
        .sorted { $0.term < $1.term }
    }
}
