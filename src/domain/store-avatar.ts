/**
 * Store initials + a deterministic color tone for `StoreAvatar`. Distinct
 * from `Avatar`'s private `getInitials` (person names: first letter of up
 * to 2 space-separated words) — store names need stopword-skipping
 * ("Épicerie du Monde" → "EM") and a single-word camel-case split
 * ("LoirIvoire" → "LI"), neither of which the person-oriented helper does.
 */

const STOPWORDS = new Set(["de", "du", "des", "d", "le", "la", "les", "et", "l"]);

function stripDiacritics(value: string): string {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function splitCamelCase(word: string): string[] {
  const parts = word.split(/(?=[A-Z])/).filter(Boolean);
  return parts.length > 1 ? parts : [word];
}

/** "LoirIvoire" → "LI", "Épicerie du Monde" → "EM", "Saveurs d'Afrique" → "SA". */
export function getStoreInitials(name: string): string {
  const words = name
    .split(/[\s'’]+/)
    .filter(Boolean)
    .filter((word) => !STOPWORDS.has(word.toLowerCase()));

  const candidates = words.length > 1 ? words : splitCamelCase(words[0] ?? name);

  return candidates
    .slice(0, 2)
    .map((word) => stripDiacritics(word).charAt(0).toUpperCase())
    .join("");
}

export type StoreAvatarTone = "pink" | "gold" | "cream" | "orange" | "wine" | "success";

const AVATAR_TONES: StoreAvatarTone[] = ["pink", "gold", "cream", "orange", "wine", "success"];

/** Deterministic (hash of the slug) so the same store always gets the same tile color across pages/renders. */
export function getStoreAvatarTone(slug: string): StoreAvatarTone {
  let hash = 0;
  for (let index = 0; index < slug.length; index += 1) {
    hash = (hash * 31 + slug.charCodeAt(index)) >>> 0;
  }
  return AVATAR_TONES[hash % AVATAR_TONES.length];
}
