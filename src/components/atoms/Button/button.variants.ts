export type ButtonVariant = "soft" | "primary" | "primary-sm" | "primary-md" | "primary-lg" | "accent";

const BASE =
  "inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap font-bold transition-colors duration-150 ease-out motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground-strong disabled:pointer-events-none disabled:opacity-50";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  soft: "h-9 rounded-xl bg-catalog-chip px-4 text-[14px] text-foreground-strong hover:bg-catalog-chip-hover",
  primary: "h-[26px] rounded-lg bg-foreground px-3 text-[13px] text-white shadow-card hover:bg-catalog-cta-hover",
  // Recipe card's "Voir le panier" — same dark CTA, smaller/no shadow.
  "primary-sm": "h-7 rounded-md bg-foreground px-3 text-xs text-white hover:bg-catalog-cta-hover",
  // Profile page header's "Modifier mon profil" — same height/radius as `soft`, filled dark instead.
  "primary-md": "h-9 rounded-xl bg-foreground px-4 text-sm text-white shadow-card hover:bg-catalog-cta-hover",
  // Full-width, large CTA — Panier's "Finaliser Click & Collect" and Page K's "Confirmer la commande" (additive: no existing variant is full-width or this tall).
  "primary-lg": "h-12 w-full rounded-xl bg-foreground px-4 text-base text-white shadow-card hover:bg-catalog-cta-hover",
  // Flash-sale notification CTA ("Réserver en Click & Collect") — the cream chip color used as a solid fill, same shape as `primary-md`.
  accent: "h-9 rounded-xl bg-catalog-badge-cream px-4 text-sm text-foreground-strong shadow-card hover:brightness-95",
};
// "inverse" (a white CTA on a dark surface) isn't a new Button variant: `BannerCta` already
// is exactly that (white pill button for `BannerSurface`), reused by `LoyaltyBanner` below.

/**
 * Shared by `Button` and `ButtonLink` so the two variants (soft header
 * actions, primary CTA) are defined once. `hasTrailingIcon` only affects
 * `soft`: its right padding shrinks from 16 to 14 when an end icon sits
 * inside it (Tailwind's own cascade order for `px-*` vs `pr-*` isn't
 * guaranteed, so the override uses `!` rather than relying on it).
 */
export function buttonVariants(variant: ButtonVariant, hasTrailingIcon: boolean, className = ""): string {
  const paddingFix = variant === "soft" && hasTrailingIcon ? "!pr-3.5" : "";
  return `${BASE} ${VARIANT_CLASSES[variant]} ${paddingFix} ${className}`.trim();
}
