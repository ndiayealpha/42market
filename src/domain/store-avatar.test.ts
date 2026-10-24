import { describe, expect, it } from "vitest";

import { getStoreAvatarTone, getStoreInitials } from "./store-avatar";

describe("getStoreInitials", () => {
  it("splits a single camel-cased word", () => {
    expect(getStoreInitials("LoirIvoire")).toBe("LI");
  });

  it("skips stopwords between real words", () => {
    expect(getStoreInitials("Épicerie du Monde")).toBe("EM");
  });

  it("strips the apostrophe before a stopword and diacritics from the result", () => {
    expect(getStoreInitials("Saveurs d'Afrique")).toBe("SA");
  });

  it("takes the first 2 words when there's no stopword", () => {
    expect(getStoreInitials("Nimba Market")).toBe("NM");
  });
});

describe("getStoreAvatarTone", () => {
  it("is deterministic for the same slug", () => {
    expect(getStoreAvatarTone("loirivoire")).toBe(getStoreAvatarTone("loirivoire"));
  });

  it("can differ across slugs", () => {
    const slugs = ["loirivoire", "nimba-market", "saveurs-dafrique", "salam-market", "epicerie-du-monde", "le-comptoir-tropical"];
    const tones = new Set(slugs.map(getStoreAvatarTone));
    expect(tones.size).toBeGreaterThan(1);
  });
});
