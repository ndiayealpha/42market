import { describe, expect, it } from "vitest";

import { toUiScore } from "./usePasswordStrength";

describe("toUiScore", () => {
  it("maps 0 satisfied rules to 0", () => {
    expect(toUiScore(0, 4)).toBe(0);
  });

  it("maps 1 or 2 satisfied rules (out of 4) to 1 — Faible", () => {
    expect(toUiScore(1, 4)).toBe(1);
    expect(toUiScore(2, 4)).toBe(1);
  });

  it("maps 3 satisfied rules (out of 4) to 2 — Moyen", () => {
    expect(toUiScore(3, 4)).toBe(2);
  });

  it("maps every rule satisfied to 3 — Fort", () => {
    expect(toUiScore(4, 4)).toBe(3);
  });
});
