import type { Store } from "@/src/domain/store";
import type { Media } from "@/src/domain/store-merchandising";

export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface StoreDetail {
  id: string;
  name: string;
  isIndependent: boolean;
  rating: { average: number; reviewCount: number };
  distanceKm: number;
  /** Absent for stores with no real merchandising fixture yet (`buildStaticStoreDetail`) — omitted rather than invented, never a fabricated number. */
  phone?: string;
  address?: { street: string; city: string };
  openingHours: Partial<Record<Weekday, { open: string; close: string }>>;
  /** `fit` carries through from `Store.image.fit` for stores whose placeholder is a logo mark rather than a photo (`buildStaticStoreDetail`) — `Media` itself stays photo-shaped for every other consumer. */
  image: Media & { fit?: "cover" | "contain" };
}

/** The narrower shape Checkout relies on — it only ever renders the one store with a full merchandising fixture (`STORE_DETAIL`), never a `buildStaticStoreDetail` fallback, so its components can assume `phone`/`address` are always present instead of guarding against the general case. */
export type StoreDetailWithContact = StoreDetail & { phone: string; address: { street: string; city: string } };

export interface OpeningStatus {
  isOpen: boolean;
  label: string;
}

const WEEKDAYS: Weekday[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/** "Ouvert • Ferme à 19h30" / "Fermé • Ouvre à 08h00" / "Fermé" (no hours for today). */
export function getOpeningStatus(hours: StoreDetail["openingHours"], now: Date): OpeningStatus {
  const weekday = WEEKDAYS[(now.getUTCDay() + 6) % 7];
  const today = hours[weekday];
  if (!today) return { isOpen: false, label: "Fermé" };

  const nowMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const isOpen = nowMinutes >= toMinutes(today.open) && nowMinutes < toMinutes(today.close);
  const label = isOpen
    ? `Ouvert • Ferme à ${today.close.replace(":", "h")}`
    : `Fermé • Ouvre à ${today.open.replace(":", "h")}`;
  return { isOpen, label };
}

/** Opens Google Maps directions to the store's address in a new tab. Callers only have an address to pass once they've already checked it's present. */
export function buildDirectionsUrl(address: NonNullable<StoreDetail["address"]>): string {
  const query = encodeURIComponent(`${address.street}, ${address.city}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
}

/** Normalizes a French phone number (spaces, dots) into a dialable `tel:` URL. */
export function buildTelUrl(phone: string): string {
  return `tel:${phone.replace(/[\s.]/g, "")}`;
}

/** A generous, identical daily schedule used only by `buildStaticStoreDetail` — there's no real weekly schedule for these stores, and inventing a *different* one per store would look more authoritative than it is. */
const GENERIC_DAILY_HOURS = { open: "08:00", close: "20:00" };
const GENERIC_OPENING_HOURS: StoreDetail["openingHours"] = {
  mon: GENERIC_DAILY_HOURS,
  tue: GENERIC_DAILY_HOURS,
  wed: GENERIC_DAILY_HOURS,
  thu: GENERIC_DAILY_HOURS,
  fri: GENERIC_DAILY_HOURS,
  sat: GENERIC_DAILY_HOURS,
  sun: GENERIC_DAILY_HOURS,
};

/**
 * Synthesizes a minimal-but-real `StoreDetail` from the lightweight
 * `Store` summary already shown on the home page's "Épiceries près de
 * vous"/"Épiceries de la ville" grids — so every store card that links to
 * the fiche boutique resolves to a real page instead of a 404, even
 * though only "loirivoire" has a full merchandising fixture (categories,
 * offers, etc. still render their own empty states for every other
 * store, see `StorePageView`). `phone`/`address` are left absent rather
 * than invented (rule: "rien n'est inventé"); `reviewCount` is 0 for the
 * same reason, which hides the "(N avis)" line in `StoreHeaderCard`.
 * Opening hours are a single generic daily window, not derived from
 * `Store.status` (a point-in-time demo flag, not a real weekly schedule).
 */
export function buildStaticStoreDetail(store: Store): StoreDetail {
  return {
    id: store.id,
    name: store.name,
    isIndependent: true,
    rating: { average: store.rating, reviewCount: 0 },
    distanceKm: store.distanceMeters / 1000,
    openingHours: GENERIC_OPENING_HOURS,
    image: { src: store.image.src, alt: store.image.alt, fit: store.image.fit },
  };
}
