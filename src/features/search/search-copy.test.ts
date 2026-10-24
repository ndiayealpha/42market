import { describe, expect, it } from "vitest";

import { formatSearchResultsSummary, parsePickupMinutes } from "./search-copy";

describe("formatSearchResultsSummary", () => {
  it("uses the singular for exactly 1 result and 1 store", () => {
    expect(formatSearchResultsSummary(1, 1, "Saint-Étienne")).toBe(
      "1 résultat Click & Collect • 1 épicerie partenaire active à Saint-Étienne"
    );
  });

  it("uses the plural for 0 (fr-FR convention) and for more than 1", () => {
    expect(formatSearchResultsSummary(0, 0, "Saint-Étienne")).toBe(
      "0 résultats Click & Collect • 0 épiceries partenaires actives à Saint-Étienne"
    );
    expect(formatSearchResultsSummary(38, 4, "Saint-Étienne")).toBe(
      "38 résultats Click & Collect • 4 épiceries partenaires actives à Saint-Étienne"
    );
  });
});

describe("parsePickupMinutes", () => {
  it("extracts the first minute figure from a free-text pickup label", () => {
    expect(parsePickupMinutes("Click & Collect prêt en 15 min")).toBe(15);
    expect(parsePickupMinutes("Retrait garanti sous 30 min • Ouvert jusqu'à 20h00")).toBe(30);
  });

  it("returns null when the label carries no parseable minute figure", () => {
    expect(parsePickupMinutes("Retrait dès 16h30 aujourd'hui")).toBeNull();
  });
});
