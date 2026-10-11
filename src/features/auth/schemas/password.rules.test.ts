import { describe, expect, it } from "vitest";

import { PASSWORD_RULES, scorePassword } from "./password.rules";

describe("PASSWORD_RULES", () => {
  it("has exactly the four documented rules", () => {
    expect(PASSWORD_RULES.map((rule) => rule.id)).toEqual(["minLength", "uppercase", "number", "specialChar"]);
  });
});

describe("scorePassword", () => {
  it("scores an empty string 0", () => {
    expect(scorePassword("")).toBe(0);
  });

  it("scores a password satisfying every rule 4", () => {
    expect(scorePassword("Sup3rS3cret!")).toBe(4);
  });

  it("counts only the rules actually satisfied", () => {
    expect(scorePassword("alllowercase")).toBe(1); // length only
    expect(scorePassword("Alllowercase")).toBe(2); // length + uppercase
    expect(scorePassword("Alllowercase1")).toBe(3); // + number
  });

  it("does not count a rule for a password that is too short, even with every character class", () => {
    expect(scorePassword("aB3!")).toBe(3); // uppercase + number + special, but < 8 chars
  });
});
