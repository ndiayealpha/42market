import type { ProfileDetails, ProfileStats } from "@/src/domain/profile";
import type { ReferenceStore } from "@/src/domain/reference-store";
import type { Terroir } from "@/src/domain/terroir";

/**
 * Fixture for user id "1" (matches `mockUser`/`SessionUser` used across
 * auth, Storybook's `preview.tsx` fixture, and the `jane@example.com` /
 * "Jane Doe" test login). Name/email themselves still come from
 * `SessionUser`, never duplicated here — whoever is actually signed in
 * sees their own name on this page; only the portrait photo below is a
 * fixture asset (cropped from the reference maquette, not invented).
 */
export const PROFILE_DETAILS: ProfileDetails = {
  id: "1",
  avatarSrc: "/profile-avatar-portrait.jpg",
  bio: "Amoureuse de gastronomie métissée et de saveurs authentiques sénégalo-maliennes en Loire.",
  memberSinceIso: "2023-01-15",
  city: "Saint-Étienne",
  department: "42",
  loyaltyTier: "vip",
  isVerified: true,
};

export const PROFILE_STATS: ProfileStats = {
  ordersCount: 12,
  favoritesCount: 8,
  loyaltyPoints: 420,
};

/** Dynamic suggestion copy for the "Ajouter" terroir tile — content data, not a component literal. */
export const TERROIR_SUGGESTION_LABEL = "Explorer Côte d'Ivoire, Guinée, Forez...";

export const TERROIRS: Terroir[] = [
  {
    id: "senegal",
    country: "Sénégal",
    region: "afrique-ouest",
    citiesLabel: "Dakar • Saint-Louis",
    productTags: ["Bissap frais", "Thiéboudienne"],
    isActive: true,
    // Cropped from the reference maquette (bakes in its own "Terroir Actif" badge,
    // top-right — not masked, same "assets à remplacer" situation as the store page).
    image: { src: "/terroir-senegal-market.jpg", alt: "Marché au Sénégal" },
  },
  {
    id: "mali",
    country: "Mali",
    region: "afrique-ouest",
    citiesLabel: "Bamako • Pays Dogon",
    productTags: ["Fonio bio", "Moringa"],
    isActive: true,
    image: { src: "/terroir-mali-market.jpg", alt: "Marché au Mali" },
  },
];

/**
 * Fixture for user id "2" (`admin@example.com` / "Admin" test login, see
 * `src/features/auth/api/auth-provider.ts`). A second, deliberately
 * different demo profile — non-VIP, unverified, smaller stats — so this
 * account also renders a complete page instead of only empty states.
 */
export const ADMIN_PROFILE_DETAILS: ProfileDetails = {
  id: "2",
  avatarSrc: undefined, // no reference photo for this account — initials fallback
  bio: "Compte de test interne : sert à vérifier le bon fonctionnement de l'espace personnel avant mise en production.",
  memberSinceIso: "2024-06-01",
  city: "Saint-Étienne",
  department: "42",
  loyaltyTier: "none",
  isVerified: false,
};

export const ADMIN_PROFILE_STATS: ProfileStats = {
  ordersCount: 3,
  favoritesCount: 2,
  loyaltyPoints: 50,
};

/** The "Mon épicerie référente" reference store (N5) — the dates are illustrative placeholders, recomputed relative to the page's own `now` by `formatPickupWindow`, never shown raw. */
export const REFERENCE_STORE: ReferenceStore = {
  name: "Saveurs d'Afrique",
  address: "14 Rue de la République, 42000 Saint-Étienne",
  pickupStartIso: "2026-11-10T14:00:00Z",
  pickupEndIso: "2026-11-10T19:00:00Z",
};

export const ADMIN_TERROIRS: Terroir[] = [
  {
    id: "cote-ivoire",
    country: "Côte d'Ivoire",
    region: "afrique-ouest",
    citiesLabel: "Abidjan • Yamoussoukro",
    productTags: ["Attiéké frais", "Café Robusta"],
    isActive: true,
    image: { alt: "Marché en Côte d'Ivoire" }, // no reference photo — neutral placeholder
  },
];
