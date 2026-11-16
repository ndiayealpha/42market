import { describe, expect, it } from "vitest";

import { foldAccents } from "./text";

describe("foldAccents", () => {
  it("strips accents and lowercases", () => {
    expect(foldAccents("Thiéboudienne")).toBe("thieboudienne");
  });

  it("matches an unaccented substring against an accented word", () => {
    expect(foldAccents("Thiéboudienne").includes(foldAccents("thieboudienne"))).toBe(true);
  });

  it("leaves accent-free text unchanged apart from case", () => {
    expect(foldAccents("Gombos")).toBe("gombos");
  });
});
