export interface NewArrivalProduct {
  id: string;
  storeSlug: string;
  productSlug: string;
  name: string;
  image: { src: string; alt: string; fit?: "cover" | "contain" };
  price: number;
  /** "/ pièce", "/ 500g", "/ kg" — shown next to the price, not part of it. */
  unit: string;
  origin: string;
  detail: string;
  /** Top-left vignette — "Avion Jeudi" (light), "Stock limité : 8 restants" (danger). Absent for a plain arrival with nothing special to call out. */
  badge?: { label: string; tone: "light" | "danger" };
  status: { label: string; tone: "success" | "danger" };
  categorySlug: string;
}

export interface NewArrivalCategory {
  slug: string;
  label: string;
}

export interface NewArrivalStoreRef {
  slug: string;
  name: string;
}

export interface NewArrivalSection {
  /** 1 store, or several for a combined section (e.g. "Nimba & Salam Market"). */
  stores: NewArrivalStoreRef[];
  address: string;
  pickupLabel: string;
  closesAt: string;
  tagline: string;
  products: NewArrivalProduct[];
}

export type NewArrivalsBlock = { kind: "section"; section: NewArrivalSection } | { kind: "fleet-alert-banner" };

/** One id per section, stable across the store-selector tile and the section it scrolls to — same rule as `getStoreDealsAnchorId`, extended to a list since a section can span several stores. */
export function getNewArrivalsAnchorId(storeSlugs: string[]): string {
  return `arrivages-${storeSlugs.join("-")}`;
}

/** "all" or an unknown value disables the category filter entirely. */
export function filterNewArrivalSectionsByCategory(sections: NewArrivalSection[], categorySlug: string): NewArrivalSection[] {
  if (categorySlug === "all") return sections;
  return sections
    .map((section) => ({ ...section, products: section.products.filter((product) => product.categorySlug === categorySlug) }))
    .filter((section) => section.products.length > 0);
}

/**
 * Same section-count rule as `assembleDealsBlocks`: the fleet-alert banner
 * sits after the 2nd section (or at the end if there are fewer than 2) —
 * always inserted, unlike the loyalty banner, since there's no "already
 * subscribed" state to hide it behind yet.
 */
export function assembleNewArrivalBlocks(sections: NewArrivalSection[]): NewArrivalsBlock[] {
  const sectionBlocks: NewArrivalsBlock[] = sections.map((section) => ({ kind: "section", section }));
  const insertAt = Math.min(2, sectionBlocks.length);
  return [...sectionBlocks.slice(0, insertAt), { kind: "fleet-alert-banner" }, ...sectionBlocks.slice(insertAt)];
}

/** Validates a `?categorie=` URL param against the known categories — same convention as `parsePromoFilterType`. */
export function parseNewArrivalCategory(value: string | string[] | undefined, categories: NewArrivalCategory[]): string {
  return typeof value === "string" && categories.some((category) => category.slug === value) ? value : "all";
}

/** "12 nouveautés" / "1 nouveauté" — fr-FR treats 0 as plural, same convention as `formatPromoCountLabel`. */
export function formatNewArrivalCountLabel(count: number): string {
  return count === 1 ? "1 nouveauté" : `${count} nouveautés`;
}
