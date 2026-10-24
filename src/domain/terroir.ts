import type { Media } from "@/src/domain/store-merchandising";

/** The one region taxonomy shared by "Mes terroirs de cœur" (Profil) and the Favoris terroir filter chips — a single source, never duplicated. */
export type TerroirRegionSlug = "afrique-ouest" | "caraibes-ocean-indien" | "maghreb";

export const TERROIR_REGION_CONFIG: Record<TerroirRegionSlug, { label: string }> = {
  "afrique-ouest": { label: "Afrique de l'Ouest" },
  "caraibes-ocean-indien": { label: "Caraïbes & Océan Indien" },
  maghreb: { label: "Maghreb" },
};

export interface Terroir {
  id: string;
  country: string;
  region: TerroirRegionSlug;
  /** "Dakar • Saint-Louis" — pre-joined, the maquette never shows a raw list. */
  citiesLabel: string;
  /** At most 2 are shown; callers slice if a mock ever provides more. */
  productTags: string[];
  isActive: boolean;
  image: Media;
}
