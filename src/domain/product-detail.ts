import type { IconName } from "@/src/components/atoms/Icon/Icon";
import type { Media } from "@/src/domain/store-merchandising";
import { getStockStatusConfig, type StockStatus } from "@/src/domain/favorites";
import type { RelatedProduct } from "@/src/domain/product-cards";
import { formatPrice } from "@/src/lib/format";

export type ProductMedia =
  | { kind: "photo"; src: string; alt: string }
  | { kind: "document"; label: string; href: string }
  | { kind: "guide"; label: string; href: string };

export interface ProductCharacteristics {
  variety?: string;
  netWeight?: string;
  certification?: string;
  packagedAt?: string;
}

const CHARACTERISTIC_LABELS: Record<keyof ProductCharacteristics, string> = {
  variety: "Variété",
  netWeight: "Poids net",
  certification: "Certification",
  packagedAt: "Conditionné à",
};

/** One row per present field, in the fixed order above — a field with no data is omitted, never a blank row (rule 10). */
export function buildCharacteristicRows(characteristics: ProductCharacteristics): { label: string; value: string }[] {
  return (Object.keys(CHARACTERISTIC_LABELS) as (keyof ProductCharacteristics)[])
    .filter((key) => characteristics[key])
    .map((key) => ({ label: CHARACTERISTIC_LABELS[key], value: characteristics[key] as string }));
}

export interface NutritionFact {
  label: string;
  value: string;
}

export interface AllergenInfo {
  allergensText?: string;
  nutritionPer100g?: NutritionFact[];
}

export interface ProductFact {
  icon: IconName;
  title: string;
  subtitle: string;
  tone?: "success" | "warning" | "danger";
}

export interface ProductDetail {
  id: string;
  slug: string;
  name: string;
  storeSlug: string;
  storeName: string;
  aisleSlug: string;
  aisleLabelShort: string;
  aisleLabelLong: string;
  price: number;
  compareAtPrice?: number;
  vatRatePercent: number;
  packagingLabel: string;
  unitBasis?: { quantity: number; unit: "g" | "ml" };
  stockCount: number;
  stockCapPerOrder: number;
  isBioCertified: boolean;
  bioCertificationCode?: string;
  hasFreshnessGuarantee: boolean;
  rating?: { average: number; reviewCount: number };
  media: ProductMedia[];
  description: string[];
  characteristics: ProductCharacteristics;
  allergens: AllergenInfo;
  storeDeliversToHome: boolean;
  deliveryStartLabel?: string;
  pickupEtaLabel: string;
  similar: RelatedProduct[];
}

/** `undefined` when there's nothing to save (no reference price, or it's not actually higher) — never a negative/zero economy (rule 10). */
export function computeSavings(price: number, compareAtPrice: number | undefined): number | undefined {
  if (compareAtPrice == null || compareAtPrice <= price) return undefined;
  return Math.round((compareAtPrice - price) * 100) / 100;
}

/** 1 ≤ quantity ≤ min(stock, plafond par commande) — never silently 0 or negative. */
export function clampQuantity(value: number, stockCount: number, capPerOrder: number): number {
  const max = Math.max(1, Math.min(stockCount, capPerOrder));
  return Math.min(Math.max(1, Math.round(value)), max);
}

export function getStockFact(stockCount: number): ProductFact | null {
  if (stockCount <= 0) return { icon: "close", title: "Rupture de stock", subtitle: "Indisponible pour le moment", tone: "danger" };
  if (stockCount <= 3) return { icon: "store", title: "Stock bas", subtitle: `${stockCount} unités dispo`, tone: "warning" };
  return { icon: "store", title: "En stock local", subtitle: `${stockCount} unités dispo`, tone: "success" };
}

/** Reuses `favorites.ts`'s stock status config — the one shared "in-stock/low-stock/out-of-stock" vocabulary in the app, not a second table. */
export function stockCountToStatus(stockCount: number): StockStatus {
  if (stockCount <= 0) return "out-of-stock";
  if (stockCount <= 3) return "low-stock";
  return "in-stock";
}

export { getStockStatusConfig };

export interface ProductJsonLdInput {
  product: ProductDetail;
  canonicalUrl: string;
}

/** Product + BreadcrumbList JSON-LD, escaped against `</script>` injection (rule: "JSON échappé"). Rating included only when present. */
export function buildProductJsonLd({ product, canonicalUrl }: ProductJsonLdInput): string {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.media.filter((media): media is Extract<ProductMedia, { kind: "photo" }> => media.kind === "photo").map((media) => media.src),
    sku: product.id,
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "EUR",
      availability: product.stockCount > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: canonicalUrl,
    },
    ...(product.rating
      ? { aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating.average, reviewCount: product.rating.reviewCount } }
      : {}),
  };
  return JSON.stringify(jsonLd).replace(/</g, "\\u003c");
}

interface BaseCatalogLikeProduct {
  id: string;
  slug: string;
  name: string;
  packagingLabel: string;
  price: number;
  compareAtPrice?: number;
  image: Media;
  storeSlug: string;
  storeName: string;
  aisleSlug?: string;
  isOutOfStock: boolean;
}

/**
 * Synthesizes a minimal-but-real `ProductDetail` from any existing
 * catalog/promo/deal/favorite fixture that has no dedicated rich fixture of
 * its own — so every pre-existing `ProductCard` stretched link across the
 * app (Page A, Page B, Favoris, Bons plans) resolves to a real page instead
 * of a 404, per rule 7 ("tous les liens étirés pointent vers P"). Sections
 * with no underlying data (rating, media variety, characteristics,
 * allergens, similar) are simply absent — never fabricated.
 */
export function fromBaseProduct(base: BaseCatalogLikeProduct): ProductDetail {
  return {
    id: base.id,
    slug: base.slug,
    name: base.name,
    storeSlug: base.storeSlug,
    storeName: base.storeName,
    aisleSlug: base.aisleSlug ?? "epicerie-fine",
    aisleLabelShort: "Épicerie",
    aisleLabelLong: "Épicerie fine",
    price: base.price,
    compareAtPrice: base.compareAtPrice,
    vatRatePercent: 5.5,
    packagingLabel: base.packagingLabel,
    stockCount: base.isOutOfStock ? 0 : 12,
    stockCapPerOrder: 10,
    isBioCertified: false,
    hasFreshnessGuarantee: false,
    media: base.image.src ? [{ kind: "photo", src: base.image.src, alt: base.image.alt }] : [],
    description: [`${base.name}, sélectionné par ${base.storeName} pour ses clients de quartier.`],
    characteristics: {},
    allergens: {},
    storeDeliversToHome: false,
    pickupEtaLabel: `Prêt en 2h chez ${base.storeName}`,
    similar: [],
  };
}

export function formatCompareAtPrice(amount: number): string {
  return formatPrice(amount);
}
