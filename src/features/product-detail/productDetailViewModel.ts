import type { BreadcrumbItem } from "@/src/components/atoms/Breadcrumb/Breadcrumb";
import { computeDiscountPercent } from "@/src/domain/catalog";
import {
  buildCharacteristicRows,
  computeSavings,
  getStockFact,
  type ProductDetail,
  type ProductFact,
} from "@/src/domain/product-detail";
import { routes } from "@/src/lib/routing/routes";

/**
 * Pure mapper from the domain `ProductDetail` to the props
 * `ProductDetailTemplate` needs — kept out of `src/domain/product-detail.ts`
 * (frozen for this page, see AGENTS instructions) but following the exact
 * same "table/pure function" style as that file. `ProductDetailView` is the
 * only caller; the Template never imports the domain module's data-shaping
 * helpers directly, only this one view model.
 */
export interface ProductDetailViewModel {
  product: ProductDetail;
  facts: ProductFact[];
  characteristicRows: { label: string; value: string }[];
  savings: number | undefined;
  discountPercent: number | undefined;
  breadcrumbItems: BreadcrumbItem[];
}

/**
 * Up to 3 facts, stock first (rule: "le fait stock ouvre toujours la
 * liste") — bio/fraîcheur/retrait are appended only when the product
 * actually has that data, and the list is capped at 3 so a product with
 * every flag set doesn't overflow the 3-tile strip (P3).
 */
export function buildProductFacts(product: ProductDetail): ProductFact[] {
  const facts: ProductFact[] = [];

  const stockFact = getStockFact(product.stockCount);
  if (stockFact) facts.push(stockFact);

  if (product.isBioCertified) {
    facts.push({
      icon: "leaf",
      title: "Agriculture Biologique",
      subtitle: product.bioCertificationCode ?? "Certifié bio",
      tone: "success",
    });
  }

  if (product.hasFreshnessGuarantee) {
    facts.push({ icon: "shield", title: "Fraîcheur garantie", subtitle: "Satisfait ou remboursé", tone: "success" });
  }

  facts.push({ icon: "store", title: "Retrait en boutique", subtitle: product.pickupEtaLabel });

  return facts.slice(0, 3);
}

/** Accueil / Boutique / Rayon (short label) / Produit — the current page never carries an `href` (rule: handled by `Breadcrumb`'s own `aria-current`). */
export function buildProductBreadcrumb(product: ProductDetail): BreadcrumbItem[] {
  return [
    { label: "Accueil", href: routes.main.home },
    { label: product.storeName, href: routes.main.epicerieDetail(product.storeSlug) },
    { label: product.aisleLabelShort, href: routes.main.epicerieRayon(product.storeSlug, product.aisleSlug) },
    { label: product.name },
  ];
}

export function buildProductDetailViewModel(product: ProductDetail): ProductDetailViewModel {
  return {
    product,
    facts: buildProductFacts(product),
    characteristicRows: buildCharacteristicRows(product.characteristics),
    savings: computeSavings(product.price, product.compareAtPrice),
    discountPercent:
      product.compareAtPrice != null ? computeDiscountPercent(product.price, product.compareAtPrice) || undefined : undefined,
    breadcrumbItems: buildProductBreadcrumb(product),
  };
}
