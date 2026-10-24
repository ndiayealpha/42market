import { describe, expect, it } from "vitest";

import { formatAddressesLabel, formatPaymentMethodLabel, formatSecurityLabel, maskPhone } from "./account-settings";

describe("maskPhone", () => {
  it("masks the middle groups of a +33-style number, keeping the first 3 and the last", () => {
    expect(maskPhone("+33 6 42 18 90 18")).toBe("+33 6 42 ** ** 18");
  });

  it("leaves a short, already-compact number untouched", () => {
    expect(maskPhone("0477321840")).toBe("0477321840");
  });
});

describe("formatPaymentMethodLabel", () => {
  it("appends the verification source when verified", () => {
    expect(formatPaymentMethodLabel({ brand: "Visa", last4: "4210", isVerified: true, verifiedWith: "Apple Pay" })).toBe(
      "Visa •••• 4210 • Apple Pay vérifié"
    );
  });

  it("omits the suffix when not verified", () => {
    expect(formatPaymentMethodLabel({ brand: "Visa", last4: "4210", isVerified: false })).toBe("Visa •••• 4210");
  });
});

describe("formatAddressesLabel", () => {
  it("pluralizes 'points relais favoris'", () => {
    expect(formatAddressesLabel({ homeCity: "Saint-Étienne", favoritePickupCount: 2 })).toBe(
      "Domicile Saint-Étienne • 2 points relais favoris"
    );
  });

  it("uses the singular for exactly one", () => {
    expect(formatAddressesLabel({ homeCity: "Saint-Étienne", favoritePickupCount: 1 })).toBe(
      "Domicile Saint-Étienne • 1 point relais favori"
    );
  });

  it("uses the plural for zero (fr-FR treats 0 as plural, not singular)", () => {
    expect(formatAddressesLabel({ homeCity: "Saint-Étienne", favoritePickupCount: 0 })).toBe(
      "Domicile Saint-Étienne • 0 points relais favoris"
    );
  });
});

describe("formatSecurityLabel", () => {
  it("combines password and 2FA status", () => {
    expect(formatSecurityLabel({ isPasswordUpToDate: true, isTwoFactorEnabled: false })).toBe(
      "Mot de passe à jour • Double authentification désactivée"
    );
  });
});
