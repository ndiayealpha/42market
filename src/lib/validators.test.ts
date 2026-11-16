import { describe, expect, it } from "vitest";

import { isValidEmail, isValidFrenchPhone } from "./validators";

describe("isValidFrenchPhone", () => {
  it.each(["06 12 34 56 78", "+33 6 12 34 56 78", "01.23.45.67.89", "0612345678"])("accepts %s", (value) => {
    expect(isValidFrenchPhone(value)).toBe(true);
  });

  it.each(["123", "", "06 12 34 56"])("rejects %s", (value) => {
    expect(isValidFrenchPhone(value)).toBe(false);
  });
});

describe("isValidEmail", () => {
  it("accepts a well-formed email", () => {
    expect(isValidEmail("contact@mon-epicerie.fr")).toBe(true);
  });

  it("rejects a malformed email", () => {
    expect(isValidEmail("not-an-email")).toBe(false);
  });
});
