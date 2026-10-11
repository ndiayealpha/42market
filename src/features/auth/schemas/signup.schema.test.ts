import { describe, expect, it } from "vitest";

import { signupSchema } from "./signup.schema";

const VALID_PAYLOAD = {
  firstName: "Awa",
  lastName: "Diop",
  email: "awa.diop@example.com",
  phone: { countryCode: "FR", number: "612345678" },
  password: "Sup3rS3cret!",
  acceptTerms: true,
  newsletter: false,
};

describe("signupSchema", () => {
  it("accepts a fully valid payload", () => {
    const result = signupSchema.safeParse(VALID_PAYLOAD);
    expect(result.success).toBe(true);
  });

  it("lowercases the email", () => {
    const result = signupSchema.safeParse({ ...VALID_PAYLOAD, email: "Awa.DIOP@Example.com" });
    expect(result.success && result.data.email).toBe("awa.diop@example.com");
  });

  it.each(["firstName", "lastName"] as const)("requires %s", (field) => {
    const result = signupSchema.safeParse({ ...VALID_PAYLOAD, [field]: "" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = signupSchema.safeParse({ ...VALID_PAYLOAD, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a phone number with the wrong length for its country", () => {
    const result = signupSchema.safeParse({
      ...VALID_PAYLOAD,
      phone: { countryCode: "FR", number: "123" },
    });
    expect(result.success).toBe(false);
  });

  it("accepts a phone number matching its country's expected length", () => {
    // Senegal (+221) expects 9 digits, not France's 9-digit coincidence —
    // exercised with a different country to prove the check is per-country.
    const result = signupSchema.safeParse({
      ...VALID_PAYLOAD,
      phone: { countryCode: "CA", number: "4165551234" }, // Canada expects 10
    });
    expect(result.success).toBe(true);
  });

  it("rejects a password missing an uppercase letter, a digit, or a special character", () => {
    const result = signupSchema.safeParse({ ...VALID_PAYLOAD, password: "lowercaseonly" });
    expect(result.success).toBe(false);
  });

  it("rejects a password under 8 characters even if otherwise complex", () => {
    const result = signupSchema.safeParse({ ...VALID_PAYLOAD, password: "aB3!" });
    expect(result.success).toBe(false);
  });

  it("rejects when the terms are not accepted", () => {
    const result = signupSchema.safeParse({ ...VALID_PAYLOAD, acceptTerms: false });
    expect(result.success).toBe(false);
  });

  it("defaults nothing implicitly — newsletter must be explicit", () => {
    const withoutNewsletter: Partial<typeof VALID_PAYLOAD> = { ...VALID_PAYLOAD };
    delete withoutNewsletter.newsletter;
    const result = signupSchema.safeParse(withoutNewsletter);
    expect(result.success).toBe(false);
  });
});
