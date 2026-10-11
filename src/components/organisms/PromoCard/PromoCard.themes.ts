/**
 * One entry per theme, nothing else. Adding a theme is a new entry here
 * — no component change needed, since `PromoCard` only ever reads these
 * values through CSS custom properties set on its own root (see
 * PromoCard.tsx's inline `style`).
 */
export interface PromoThemeTokens {
  bgFrom: string;
  bgTo: string;
  title: string;
  text: string;
  badgeBg: string;
  badgeFg: string;
  /** Defaults to badgeFg. */
  badgeIcon?: string;
  ctaBg: string;
  ctaFg: string;
  tagBg: string;
  tagFg: string;
  /** Price / highlight accent. */
  accent: string;
  /** Radial glow behind "text" layout cards, bottom-right. */
  glow?: string;
}

export type PromoThemeName = "ciel" | "rose" | "pistache" | "creme" | "bordeaux" | "pierre";

export const PROMO_THEMES: Record<PromoThemeName, PromoThemeTokens> = {
  ciel: {
    bgFrom: "#A5D7EF",
    bgTo: "#77BFE7",
    title: "#0A2540",
    text: "rgba(10,37,64,.8)",
    badgeBg: "#7924B8",
    badgeFg: "#FFFFFF",
    ctaBg: "#0A2540",
    ctaFg: "#FFFFFF",
    tagBg: "#DFF0FA",
    tagFg: "#1F3953",
    accent: "#0A2540",
  },
  rose: {
    bgFrom: "#F9CFDF",
    bgTo: "#F59EC0",
    title: "#420A27",
    text: "#210D0B",
    badgeBg: "#FFFFFF",
    badgeFg: "#420A27",
    ctaBg: "#420A27",
    ctaFg: "#FFFFFF",
    tagBg: "#FDEBF2",
    tagFg: "#420A27",
    accent: "#420A27",
  },
  pistache: {
    bgFrom: "#C4E89A",
    bgTo: "#AFDE80",
    title: "#0D3813",
    text: "#1B4D22",
    badgeBg: "#185324",
    badgeFg: "#FFFFFF",
    ctaBg: "#0D3813",
    ctaFg: "#FFFFFF",
    tagBg: "#F1F9E8",
    tagFg: "#0D3813",
    accent: "#0D3813",
  },
  creme: {
    bgFrom: "#FFEEC7",
    bgTo: "#FEE3AA",
    title: "#0066CC",
    text: "#004B99",
    // AA contrast check (WCAG, relative-luminance formula): white on this
    // badge red measures ~3.9:1 at the badge's 11px bold size, below the
    // 4.5:1 (or 3:1 large-text) AA minimum. Left as specified, not
    // changed unilaterally — a token that would pass AA comfortably
    // (~5.5:1) is a darker red such as #C23B40.
    badgeBg: "#E5484D",
    badgeFg: "#FFFFFF",
    ctaBg: "#0066CC",
    ctaFg: "#FFFFFF",
    tagBg: "#FFFAF1",
    tagFg: "#004B99",
    accent: "#0066CC",
  },
  bordeaux: {
    bgFrom: "#6A1736",
    bgTo: "#520F27",
    title: "#FFFFFF",
    text: "rgba(255,255,255,.7)",
    badgeBg: "rgba(255,255,255,.2)",
    badgeFg: "#FFFFFF",
    badgeIcon: "#FCD34D",
    ctaBg: "#FFFFFF",
    ctaFg: "#5B122D",
    tagBg: "rgba(255,255,255,.2)",
    tagFg: "#FFFFFF",
    accent: "#FCD34D",
    glow: "rgba(255,255,255,.08)",
  },
  pierre: {
    bgFrom: "#EEEAE4",
    bgTo: "#E2DBD0",
    title: "#210D0B",
    text: "#6B5E5D",
    badgeBg: "#9E2A2B",
    badgeFg: "#FFFFFF",
    ctaBg: "#210D0B",
    ctaFg: "#FFFFFF",
    tagBg: "#FAF9F7",
    tagFg: "#9E2A2B",
    accent: "#9E2A2B",
  },
};
