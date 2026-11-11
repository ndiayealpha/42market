import { getDiscountPercent } from "@/src/domain/preorder";

/** Below this, a campaign counts as "urgent" regardless of its closing date. */
export const URGENT_REMAINING_MAX = 5;
/** Below this many hours to closing, a campaign counts as "urgent" regardless of remaining stock. */
export const URGENT_CLOSING_HOURS = 24;

export interface GroupPreorderCampaign {
  id: string;
  storeSlug: string;
  storeName: string;
  neighborhood: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
  originBadge: string;
  price: number;
  originalPrice: number;
  /** The ribbon's trailing words after a computed "-N% ", e.g. "de remise", "grossiste", "colis". */
  merchandisingSuffix: string;
  /** Bypasses the computed "-N% ..." ribbon entirely for a campaign whose urgency, not its discount, is the headline (e.g. "Urgent : Reste 4", "Plus que 3 cagettes"). */
  ribbonOverride?: string;
  reservedQuantity: number;
  capacityQuantity: number;
  /** The minimum viable order quantity — distinct from `capacityQuantity` (the max number of slots): reaching it guarantees the campaign ships, even below full capacity. */
  minimumThreshold: number;
  unitLabel: string;
  closesAtIso: string;
  arrivalDateIso: string;
  pickupMode: string;
  packagingQuantity: number;
  packagingUnit: "kg" | "L";
  categorySlug: string;
}

export interface GroupPreorderCategory {
  slug: string;
  label: string;
}

export interface GroupPreorderStoreOption {
  slug: string;
  name: string;
  neighborhood: string;
  campaignCount: number;
}

export type GroupPreorderSort = "closing-soon" | "discount" | "fill-rate";

export const GROUP_PREORDER_SORT_OPTIONS: { value: GroupPreorderSort; label: string }[] = [
  { value: "closing-soon", label: "Tri : Clôture imminente" },
  { value: "discount", label: "Tri : Remise la plus forte" },
  { value: "fill-rate", label: "Tri : Remplissage" },
];

/** "84% réservé (42/50)" — rounded, reserved over the full-capacity slot count. */
export function getFillPercent(campaign: GroupPreorderCampaign): number {
  return Math.round((campaign.reservedQuantity / campaign.capacityQuantity) * 100);
}

export function getRemaining(campaign: GroupPreorderCampaign): number {
  return campaign.capacityQuantity - campaign.reservedQuantity;
}

/** The minimum-viable threshold, not full capacity — see the field's own doc comment. */
export function isThresholdReached(campaign: GroupPreorderCampaign): boolean {
  return campaign.reservedQuantity >= campaign.minimumThreshold;
}

export function isCampaignUrgent(campaign: GroupPreorderCampaign, now: Date): boolean {
  if (getRemaining(campaign) <= URGENT_REMAINING_MAX) return true;
  const hoursUntilClose = (new Date(campaign.closesAtIso).getTime() - now.getTime()) / 3_600_000;
  return hoursUntilClose <= URGENT_CLOSING_HOURS;
}

/** Price per kg/L — packaging quantities are already in kg/L, so this is a plain division, not `computeUnitPricePerKg`'s grams conversion. */
export function getCampaignUnitPrice(campaign: GroupPreorderCampaign): number {
  return campaign.price / campaign.packagingQuantity;
}

/** The red ribbon's text — computed discount by default, or the authored urgency override when present (see `ribbonOverride`'s own doc comment). */
export function getRibbonLabel(campaign: GroupPreorderCampaign): string {
  if (campaign.ribbonOverride) return campaign.ribbonOverride;
  const percent = getDiscountPercent(campaign.price, campaign.originalPrice);
  return `-${percent}% ${campaign.merchandisingSuffix}`;
}

export interface GroupPreorderProgressState {
  label: string;
  /** Threshold reached or urgent — the progress bar and both labels switch to the danger tone. */
  isAlert: boolean;
}

/** Threshold text takes precedence over the urgent countdown when both are true (same campaign can be both at once — the ribbon still shows its own, independent urgency text). */
export function getProgressState(campaign: GroupPreorderCampaign, now: Date): GroupPreorderProgressState {
  if (isThresholdReached(campaign)) return { label: "Palier validé !", isAlert: true };
  if (isCampaignUrgent(campaign, now)) return { label: `Reste ${getRemaining(campaign)} !`, isAlert: true };
  return { label: `Reste ${getRemaining(campaign)} ${campaign.unitLabel}`, isAlert: false };
}

export function filterCampaigns(campaigns: GroupPreorderCampaign[], categorySlug: string, storeSlugs: string[]): GroupPreorderCampaign[] {
  return campaigns
    .filter((campaign) => categorySlug === "all" || campaign.categorySlug === categorySlug)
    .filter((campaign) => storeSlugs.length === 0 || storeSlugs.includes(campaign.storeSlug));
}

export function sortCampaigns(campaigns: GroupPreorderCampaign[], sort: GroupPreorderSort): GroupPreorderCampaign[] {
  const sorted = [...campaigns];
  switch (sort) {
    case "closing-soon":
      return sorted.sort((a, b) => new Date(a.closesAtIso).getTime() - new Date(b.closesAtIso).getTime());
    case "discount":
      return sorted.sort((a, b) => getDiscountPercent(b.price, b.originalPrice) - getDiscountPercent(a.price, a.originalPrice));
    case "fill-rate":
      return sorted.sort((a, b) => getFillPercent(b) - getFillPercent(a));
    default: {
      const exhaustive: never = sort;
      throw new Error(`Unhandled group preorder sort: ${JSON.stringify(exhaustive)}`);
    }
  }
}

export function getStoreOptions(campaigns: GroupPreorderCampaign[]): GroupPreorderStoreOption[] {
  const bySlug = new Map<string, GroupPreorderStoreOption>();
  for (const campaign of campaigns) {
    const existing = bySlug.get(campaign.storeSlug);
    if (existing) {
      existing.campaignCount += 1;
    } else {
      bySlug.set(campaign.storeSlug, { slug: campaign.storeSlug, name: campaign.storeName, neighborhood: campaign.neighborhood, campaignCount: 1 });
    }
  }
  return Array.from(bySlug.values());
}

/** Mean discount across every open campaign — the home page for the "-32%" style stat, computed from real data rather than hardcoded. */
export function getAverageDiscountPercent(campaigns: GroupPreorderCampaign[]): number {
  if (campaigns.length === 0) return 0;
  const total = campaigns.reduce((sum, campaign) => sum + getDiscountPercent(campaign.price, campaign.originalPrice), 0);
  return Math.round(total / campaigns.length);
}

export function parseGroupPreorderSort(value: string | string[] | undefined): GroupPreorderSort {
  const candidates: GroupPreorderSort[] = ["closing-soon", "discount", "fill-rate"];
  return candidates.includes(value as GroupPreorderSort) ? (value as GroupPreorderSort) : "closing-soon";
}

export function parseGroupPreorderCategory(value: string | string[] | undefined, categories: GroupPreorderCategory[]): string {
  return typeof value === "string" && categories.some((category) => category.slug === value) ? value : "all";
}

/** "8 campagnes" / "1 campagne" — fr-FR treats 0 as plural, same convention as `formatPromoCountLabel`. */
export function formatCampaignCountLabel(count: number): string {
  return count === 1 ? "1 campagne" : `${count} campagnes`;
}

const closingTimeFormatter = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" });
const closingWeekdayFormatter = new Intl.DateTimeFormat("fr-FR", { weekday: "long", timeZone: "UTC" });

function utcMidnight(date: Date): number {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

/** "Ce soir 20h" / "Demain 18h" / "Mercredi 23h59" — `now` injected, never read internally (same rule as `lib/format.ts`'s date helpers). */
export function formatClosingLabel(campaign: GroupPreorderCampaign, now: Date): string {
  const closesAt = new Date(campaign.closesAtIso);
  const time = closingTimeFormatter.format(closesAt).replace(":", "h").replace(/h00$/, "h");
  const diffDays = Math.round((utcMidnight(closesAt) - utcMidnight(now)) / 86_400_000);
  if (diffDays <= 0) return `Ce soir ${time}`;
  if (diffDays === 1) return `Demain ${time}`;
  const weekday = closingWeekdayFormatter.format(closesAt);
  return `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)} ${time}`;
}
