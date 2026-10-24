import type { FlashSale, PromoCategorySectionData, PromoFilterType, PromoProduct, PromoScopeOption, StorePromoSummary } from "@/src/domain/promotions";
import { matchesPromoFilter } from "@/src/domain/promotions";
import {
  CATALOG_REASSURANCE_CARDS,
  FEATURED_PROMO_PRODUCTS,
  FLASH_SALE,
  PROMO_CATEGORY_SECTIONS,
  PROMO_SCOPE_OPTIONS,
  STORE_PROMOS,
  STORES_OPEN_FOR_EXPRESS_PICKUP_COUNT,
} from "@/src/data/promotions.mock";
import type { TrustItemConfig } from "@/src/components/organisms/Footer/Footer.types";

export interface FeaturedPromoSummary {
  products: PromoProduct[];
  totalCount: number;
}

export interface StorePromoListSummary {
  stores: StorePromoSummary[];
  openForExpressPickupCount: number;
}

export interface PromotionsRepository {
  getFlashSale(storeSlug: string): Promise<FlashSale | null>;
  getFeaturedPromoProducts(storeSlug: string, type: PromoFilterType): Promise<FeaturedPromoSummary>;
  /** `storeSlugs` is the selected multi-store scope; `type` is the active promo-type filter chip — both are URL-driven, not client-side filtering (rule 12). */
  getPromoCategorySections(storeSlug: string, storeSlugs: string[], type: PromoFilterType): Promise<PromoCategorySectionData[]>;
  getStorePromos(): Promise<StorePromoListSummary>;
  getScopeOptions(): Promise<PromoScopeOption[]>;
  getReassuranceCards(): Promise<TrustItemConfig[]>;
}

function filterByScopeAndType(products: PromoProduct[], storeSlugs: string[], type: PromoFilterType): PromoProduct[] {
  return products
    .filter((product) => storeSlugs.length === 0 || storeSlugs.includes(product.storeSlug))
    .filter((product) => matchesPromoFilter(product, type));
}

export const mockPromotionsRepository: PromotionsRepository = {
  async getFlashSale(storeSlug) {
    return storeSlug === "loirivoire" ? FLASH_SALE : null;
  },
  async getFeaturedPromoProducts(storeSlug, type) {
    if (storeSlug !== "loirivoire") return { products: [], totalCount: 0 };
    // `[storeSlug]`, not `[]` — an empty scope list means "no filter at all" in `filterByScopeAndType`,
    // which was silently mixing every store's featured products into this one store's own bons-plans page.
    const products = filterByScopeAndType(FEATURED_PROMO_PRODUCTS, [storeSlug], type);
    return { products, totalCount: products.length };
  },
  async getPromoCategorySections(storeSlug, storeSlugs, type) {
    if (storeSlug !== "loirivoire") return [];
    return PROMO_CATEGORY_SECTIONS.map((section) => ({
      ...section,
      products: filterByScopeAndType(section.products, storeSlugs, type),
    })).filter((section) => section.products.length > 0);
  },
  async getStorePromos() {
    return { stores: STORE_PROMOS, openForExpressPickupCount: STORES_OPEN_FOR_EXPRESS_PICKUP_COUNT };
  },
  async getScopeOptions() {
    return PROMO_SCOPE_OPTIONS;
  },
  async getReassuranceCards() {
    return CATALOG_REASSURANCE_CARDS;
  },
};
