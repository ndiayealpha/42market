import { describe, expect, it } from "vitest";

import { buildFaqJsonLd, filterFaqItemsByCategory, sortFaqItems, type FaqItem } from "./faq";

const ITEMS: FaqItem[] = [
  { id: "2", slug: "b", question: "B?", answer: "Réponse B", category: "logistique", order: 2 },
  { id: "1", slug: "a", question: "A?", answer: "Réponse A", category: "produits", order: 1 },
  { id: "3", slug: "c", question: "C?", answer: "Réponse C", category: "logistique", order: 3 },
];

describe("sortFaqItems", () => {
  it("orders by the `order` field, not insertion order", () => {
    expect(sortFaqItems(ITEMS).map((item) => item.id)).toEqual(["1", "2", "3"]);
  });

  it("does not mutate the input array", () => {
    const copy = [...ITEMS];
    sortFaqItems(ITEMS);
    expect(ITEMS).toEqual(copy);
  });
});

describe("filterFaqItemsByCategory", () => {
  it("returns every item when category is null", () => {
    expect(filterFaqItemsByCategory(ITEMS, null)).toHaveLength(3);
  });

  it("filters to the matching category only", () => {
    expect(filterFaqItemsByCategory(ITEMS, "logistique").map((item) => item.id)).toEqual(["2", "3"]);
  });
});

describe("buildFaqJsonLd", () => {
  it("produces a schema.org FAQPage with one Question per item", () => {
    const json = JSON.parse(buildFaqJsonLd({ items: ITEMS, canonicalUrl: "/main/faq" }));
    expect(json["@type"]).toBe("FAQPage");
    expect(json.mainEntity).toHaveLength(3);
    expect(json.mainEntity[0]).toEqual({
      "@type": "Question",
      name: "B?",
      acceptedAnswer: { "@type": "Answer", text: "Réponse B" },
    });
  });

  it("escapes '<' to prevent closing the surrounding <script> tag", () => {
    const malicious: FaqItem[] = [{ id: "x", slug: "x", question: "</script><script>alert(1)</script>", answer: "ok", category: "c", order: 1 }];
    const json = buildFaqJsonLd({ items: malicious, canonicalUrl: "/main/faq" });
    expect(json).not.toContain("</script>");
    expect(json).toContain("\\u003c/script>");
  });
});
