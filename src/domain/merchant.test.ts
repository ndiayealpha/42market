import { describe, expect, it } from "vitest";

import { hasMerchantApplicationErrors, validateMerchantApplication, type MerchantApplicationInput } from "./merchant";

function makeInput(overrides: Partial<MerchantApplicationInput> = {}): MerchantApplicationInput {
  return {
    managerName: "Amadou Diallo",
    storeName: "Loirivoire Marché Exotique",
    siret: "89412345600012",
    address: "14 rue du Général Leclerc",
    city: "Saint-Étienne",
    postalCode: "42000",
    phone: "06 12 34 56 78",
    email: "contact@mon-epicerie.fr",
    specialties: ["afrique-ouest"],
    services: [],
    estimatedReferenceCount: 300,
    plan: "decouverte",
    kbisFileName: "kbis.pdf",
    ...overrides,
  };
}

describe("validateMerchantApplication", () => {
  it("returns no errors for a valid input", () => {
    expect(hasMerchantApplicationErrors(validateMerchantApplication(makeInput()))).toBe(false);
  });

  it("flags a SIRET that isn't exactly 14 digits", () => {
    expect(validateMerchantApplication(makeInput({ siret: "1234" })).siret).toBeDefined();
  });

  it("flags a postal code that isn't 5 digits", () => {
    expect(validateMerchantApplication(makeInput({ postalCode: "abc" })).postalCode).toBeDefined();
  });

  it("flags an invalid email", () => {
    expect(validateMerchantApplication(makeInput({ email: "not-an-email" })).email).toBeDefined();
  });

  it("flags a missing Kbis file", () => {
    expect(validateMerchantApplication(makeInput({ kbisFileName: "" })).kbisFileName).toBeDefined();
  });
});
