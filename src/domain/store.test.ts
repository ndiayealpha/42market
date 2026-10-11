import { describe, expect, it } from "vitest";

import { getStatusLabel } from "./store";

describe("getStatusLabel", () => {
  it("returns \"Ouvert\" when open", () => {
    expect(getStatusLabel({ kind: "open" })).toBe("Ouvert");
  });

  it("returns \"Fermé (Ouvre à {opensAt})\" when closed with an opening time", () => {
    expect(getStatusLabel({ kind: "closed", opensAt: "14h" })).toBe("Fermé (Ouvre à 14h)");
  });
});
