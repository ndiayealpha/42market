import { describe, expect, it } from "vitest";

import { hasContactFormErrors, isContactMotif, validateContactRequest, type ContactRequestInput } from "./contact";

function makeInput(overrides: Partial<ContactRequestInput> = {}): ContactRequestInput {
  return {
    fullName: "Aïcha Diallo",
    phone: "06 12 34 56 78",
    motif: "panier",
    message: "Bonjour, j'ai une question sur mon panier Click & Collect.",
    ...overrides,
  };
}

describe("isContactMotif", () => {
  it("accepts a known motif", () => {
    expect(isContactMotif("probleme")).toBe(true);
  });

  it("rejects an unknown motif", () => {
    expect(isContactMotif("inconnu")).toBe(false);
  });
});

describe("validateContactRequest", () => {
  it("returns no errors for a valid input", () => {
    expect(hasContactFormErrors(validateContactRequest(makeInput()))).toBe(false);
  });

  it("flags a name that's too short", () => {
    const errors = validateContactRequest(makeInput({ fullName: "A" }));
    expect(errors.fullName).toBeDefined();
  });

  it("flags an invalid phone number", () => {
    const errors = validateContactRequest(makeInput({ phone: "123" }));
    expect(errors.phone).toBeDefined();
  });

  it("accepts a +33-formatted phone number", () => {
    const errors = validateContactRequest(makeInput({ phone: "+33 6 12 34 56 78" }));
    expect(errors.phone).toBeUndefined();
  });

  it("flags an unknown motif", () => {
    const errors = validateContactRequest(makeInput({ motif: "inconnu" as never }));
    expect(errors.motif).toBeDefined();
  });

  it("flags a message that's too short", () => {
    const errors = validateContactRequest(makeInput({ message: "Salut" }));
    expect(errors.message).toBeDefined();
  });
});
