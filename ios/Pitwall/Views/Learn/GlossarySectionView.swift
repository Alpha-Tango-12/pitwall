import SwiftUI

struct GlossarySectionView: View {
    @Bindable var vm: LearnViewModel

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Search bar
            HStack(spacing: 8) {
                Image(systemName: "magnifyingglass")
                    .font(.system(size: 14))
                    .foregroundStyle(Color.pitwallMuted)
                TextField("Search terms and definitions…", text: $vm.glossarySearch)
                    .font(.system(size: 14))
                    .foregroundStyle(.white)
                    .tint(Color.f1Red)
                if !vm.glossarySearch.isEmpty {
                    Button {
                        vm.glossarySearch = ""
                    } label: {
                        Image(systemName: "xmark.circle.fill")
                            .foregroundStyle(Color.pitwallMuted)
                    }
                }
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 10)
            .background(Color.pitwallCard)
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(Color.pitwallBorder, lineWidth: 1)
            )

            // Category filter chips
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    categoryButton(label: "All", id: nil)
                    ForEach(GlossaryCategory.allCases, id: \.self) { cat in
                        categoryButton(label: cat.label, id: cat)
                    }
                }
            }

            // Results
            if vm.filteredGlossary.isEmpty {
                Text("No terms match your search.")
                    .font(.subheadline)
                    .foregroundStyle(Color.pitwallMuted)
                    .frame(maxWidth: .infinity, alignment: .center)
                    .padding(.vertical, 32)
                    .cardStyle()
            } else {
                VStack(spacing: 8) {
                    ForEach(vm.filteredGlossary) { term in
                        GlossaryTermView(term: term)
                    }
                }
            }
        }
    }

    private func categoryButton(label: String, id: GlossaryCategory?) -> some View {
        let active = vm.glossaryCategoryFilter == id
        return Button {
            if id == nil {
                vm.glossaryCategoryFilter = nil
            } else {
                vm.glossaryCategoryFilter = (vm.glossaryCategoryFilter == id) ? nil : id
            }
        } label: {
            Text(label)
                .font(.system(size: 12, weight: .medium))
                .foregroundStyle(active ? .white : Color.pitwallMuted)
                .padding(.horizontal, 12)
                .padding(.vertical, 5)
                .background(active ? Color.pitwallBorder : Color.clear)
                .clipShape(Capsule())
        }
    }
}

private struct GlossaryTermView: View {
    let term: GlossaryTerm

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack(spacing: 8) {
                Text(term.term)
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundStyle(.white)
                Text(term.category.label)
                    .font(.system(size: 10, weight: .medium))
                    .foregroundStyle(Color(white: 0.75))
                    .padding(.horizontal, 6)
                    .padding(.vertical, 2)
                    .background(Color.pitwallBorder)
                    .clipShape(RoundedRectangle(cornerRadius: 4))
            }

            Text(term.definition)
                .font(.system(size: 13))
                .foregroundStyle(Color(white: 0.75))

            if !term.relatedTerms.isEmpty {
                HStack(spacing: 6) {
                    Text("Related:")
                        .font(.system(size: 11))
                        .foregroundStyle(Color.pitwallMuted)
                    ForEach(term.relatedTerms, id: \.self) { rel in
                        Text(rel)
                            .font(.system(size: 11))
                            .foregroundStyle(Color(white: 0.6))
                            .padding(.horizontal, 6)
                            .padding(.vertical, 2)
                            .background(Color.pitwallBorder)
                            .clipShape(RoundedRectangle(cornerRadius: 4))
                    }
                }
            }
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
