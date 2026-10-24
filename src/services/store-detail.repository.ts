import { buildStaticStoreDetail, type StoreDetail } from "@/src/domain/store-detail";
import type { BestSeller, Category, LimitedStockItem, Offer, PromoBannerContent, SponsoredParcel } from "@/src/domain/store-merchandising";
import {
  BEST_SELLERS,
  CATEGORIES,
  LIMITED_STOCK_ITEMS,
  OFFERS,
  OFFERS_STOCKED_STORE_COUNT,
  OFFERS_TOTAL_COUNT,
  OFFERS_UPDATED_AT_ISO,
  PROMO_BANNER,
  SPONSORED_PARCEL,
  STORE_DETAIL,
} from "@/src/data/store-detail.mock";
import { CITY_STORES, NEARBY_STORES } from "@/src/data/stores.mock";

export interface OffersSummary {
  offers: Offer[];
  totalCount: number;
  updatedAtIso: string;
  stockedStoreCount: number;
}

/** One method per resource — swapping the mock for a real API later only touches this file. */
export interface StoreDetailRepository {
  getStore(slug: string): Promise<StoreDetail | null>;
  getCategories(slug: string): Promise<Category[]>;
  getOffers(slug: string): Promise<OffersSummary>;
  getLimitedStock(slug: string): Promise<LimitedStockItem[]>;
  getBestSellers(slug: string): Promise<BestSeller[]>;
  getSponsoredParcel(slug: string): Promise<SponsoredParcel | null>;
  getPromoBanner(slug: string): Promise<PromoBannerContent | null>;
}

/** Every store shown anywhere on the home page's "Épiceries" grids — the directory `getStore` falls back to for a slug with no real merchandising fixture. */
const OTHER_KNOWN_STORES = [...NEARBY_STORES, ...CITY_STORES].filter((store) => store.id !== STORE_DETAIL.id);

/**
 * Only "loirivoire" has real merchandising content (categories, offers,
 * best-sellers, ...) — a product decision not to fabricate that for the
 * other catalog stores. `getStore` itself, though, resolves ANY store
 * that appears on the home page's grids via `buildStaticStoreDetail`, so
 * every store card's link to the fiche boutique works; `StorePageView`'s
 * other sections render their own empty states for these stores rather
 * than showing fake content. A slug that isn't a real store at all still
 * returns `null` → the page's `notFound()`.
 */
export const mockStoreDetailRepository: StoreDetailRepository = {
  async getStore(slug) {
    if (slug === STORE_DETAIL.id) return STORE_DETAIL;
    const fallback = OTHER_KNOWN_STORES.find((store) => store.id === slug);
    return fallback ? buildStaticStoreDetail(fallback) : null;
  },
  async getCategories(slug) {
    return slug === STORE_DETAIL.id ? CATEGORIES : [];
  },
  async getOffers(slug) {
    if (slug !== STORE_DETAIL.id) {
      return { offers: [], totalCount: 0, updatedAtIso: OFFERS_UPDATED_AT_ISO, stockedStoreCount: 0 };
    }
    return {
      offers: OFFERS,
      totalCount: OFFERS_TOTAL_COUNT,
      updatedAtIso: OFFERS_UPDATED_AT_ISO,
      stockedStoreCount: OFFERS_STOCKED_STORE_COUNT,
    };
  },
  async getLimitedStock(slug) {
    return slug === STORE_DETAIL.id ? LIMITED_STOCK_ITEMS : [];
  },
  async getBestSellers(slug) {
    return slug === STORE_DETAIL.id ? BEST_SELLERS : [];
  },
  async getSponsoredParcel(slug) {
    return slug === STORE_DETAIL.id ? SPONSORED_PARCEL : null;
  },
  async getPromoBanner(slug) {
    return slug === STORE_DETAIL.id ? PROMO_BANNER : null;
  },
};
