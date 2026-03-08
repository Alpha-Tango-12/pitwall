import { describe, it, expect } from "vitest";
import { GLOSSARY, GLOSSARY_CATEGORIES } from "../glossary";

describe("glossary", () => {
  it("has at least 40 terms", () => {
    expect(GLOSSARY.length).toBeGreaterThanOrEqual(40);
  });

  it("has no duplicate terms", () => {
    const terms = GLOSSARY.map((g) => g.term);
    expect(new Set(terms).size).toBe(terms.length);
  });

  it("every term has a non-empty definition", () => {
    for (const entry of GLOSSARY) {
      expect(entry.definition.length).toBeGreaterThan(0);
    }
  });

  it("every term has a valid category", () => {
    const validCategories = GLOSSARY_CATEGORIES.map((c) => c.id);
    for (const entry of GLOSSARY) {
      expect(validCategories).toContain(entry.category);
    }
  });

  it("related terms reference existing entries", () => {
    const allTerms = new Set(GLOSSARY.map((g) => g.term));
    for (const entry of GLOSSARY) {
      if (entry.relatedTerms) {
        for (const related of entry.relatedTerms) {
          expect(allTerms.has(related)).toBe(true);
        }
      }
    }
  });

  it("has terms in all categories", () => {
    const categoriesUsed = new Set(GLOSSARY.map((g) => g.category));
    for (const cat of GLOSSARY_CATEGORIES) {
      expect(categoriesUsed.has(cat.id)).toBe(true);
    }
  });
});
