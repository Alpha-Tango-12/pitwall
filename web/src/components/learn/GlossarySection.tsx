import { useMemo } from "react";
import { Search } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { GLOSSARY, GLOSSARY_CATEGORIES } from "@/constants/glossary";
import type { GlossaryCategory } from "@/types/app";

export function GlossarySection() {
  const glossarySearch = useAppStore((state) => state.glossarySearch);
  const glossaryCategoryFilter = useAppStore((state) => state.glossaryCategoryFilter);
  const setGlossarySearch = useAppStore((state) => state.setGlossarySearch);
  const setGlossaryCategoryFilter = useAppStore((state) => state.setGlossaryCategoryFilter);

  const filtered = useMemo(() => {
    const q = glossarySearch.toLowerCase();
    return GLOSSARY
      .filter((t) => {
        const matchesSearch =
          !q ||
          t.term.toLowerCase().includes(q) ||
          t.definition.toLowerCase().includes(q);
        const matchesCategory =
          !glossaryCategoryFilter || t.category === glossaryCategoryFilter;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [glossarySearch, glossaryCategoryFilter]);

  function handleCategoryClick(id: GlossaryCategory | null) {
    setGlossaryCategoryFilter(id === glossaryCategoryFilter ? null : id);
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          value={glossarySearch}
          onChange={(e) => setGlossarySearch(e.target.value)}
          placeholder="Search terms and definitions…"
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2.5 pl-9 pr-4 text-sm text-white placeholder-zinc-500 outline-none focus:border-zinc-600"
        />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setGlossaryCategoryFilter(null)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            !glossaryCategoryFilter
              ? "bg-zinc-700 text-white"
              : "text-zinc-400 hover:text-zinc-300"
          }`}
        >
          All
        </button>
        {GLOSSARY_CATEGORIES.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => handleCategoryClick(id)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              glossaryCategoryFilter === id
                ? "bg-zinc-700 text-white"
                : "text-zinc-400 hover:text-zinc-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-8 text-center text-sm text-zinc-500">
          No terms match your search.
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((term) => (
            <div
              key={term.term}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="font-semibold text-white">{term.term}</span>
                <span className="rounded-md bg-zinc-700 px-2 py-0.5 text-xs text-zinc-300">
                  {term.category}
                </span>
              </div>
              <p className="text-sm text-zinc-300">{term.definition}</p>
              {term.relatedTerms && term.relatedTerms.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="text-xs text-zinc-500">Related:</span>
                  {term.relatedTerms.map((rel) => (
                    <span
                      key={rel}
                      className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400"
                    >
                      {rel}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
