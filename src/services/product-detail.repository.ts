import { PRODUCTS } from "@/src/data/catalog.mock";
import { FAVORITE_PRODUCTS } from "@/src/data/favorites.mock";
import { NEW_ARRIVAL_SECTIONS } from "@/src/data/new-arrivals.mock";
import { PRODUCT_DETAIL_FIXTURES } from "@/src/data/product-detail.mock";
import { FEATURED_PROMO_PRODUCTS, PROMO_CATEGORY_SECTIONS } from "@/src/data/promotions.mock";
import { BEST_SELLERS, LIMITED_STOCK_ITEMS, STORE_DETAIL } from "@/src/data/store-detail.mock";
import { STORE_DEALS } from "@/src/data/store-deals.mock";
import type { Product } from "@/src/domain/catalog";
import type { FavoriteProduct } from "@/src/domain/favorites";
import type { NewArrivalProduct } from "@/src/domain/new-arrival";
import type { ProductCardBadge, RelatedProduct } from "@/src/domain/product-cards";
import { fromBaseProduct, type ProductDetail } from "@/src/domain/product-detail";
import type { PromoBadge } from "@/src/domain/promotions";
import type { BestSeller, LimitedStockItem } from "@/src/domain/store-merchandising";

/**
 * Every real fixture that actually carries an `aisleSlug` (catalog +
 * promo + deal products all do, via `Product`'s own field — favorites and
 * new-arrivals don't, since their adapters below have no aisle of their
 * own to borrow). H3's "même catégorie" pool, computed once. Typed loosely
 * enough to also read the real (but not every `Product`'s) `badge` that
 * promo/deal instances carry, without widening `Product` itself.
 */
const AISLE_TAGGED_PRODUCTS: (Product & { badge?: PromoBadge })[] = [
  ...PRODUCTS,
  ...FEATURED_PROMO_PRODUCTS,
  ...PROMO_CATEGORY_SECTIONS.flatMap((section) => section.products),
  ...STORE_DEALS.flatMap((store) => store.products),
];

/** Only `PromoBadge` kinds with a real `ProductCardBadge` equivalent convert — the others (multibuy/bogo/pack/lot) have no matching card-badge kind, so they're dropped rather than misrepresented. */
function toProductCardBadge(badge: PromoBadge): ProductCardBadge | undefined {
  if (badge.kind === "percent") return { kind: "discount", percent: badge.percent };
  if (badge.kind === "label") return { kind: "label", text: badge.text };
  return undefined;
}

/** H3 — same aisle, never the current product, same store ranked first ("idéalement même épicerie en priorité"); `[]` (never fabricated) when nothing real matches. */
function findSimilarProducts(current: { id: string; aisleSlug?: string; storeSlug: string }, limit = 4): RelatedProduct[] {
  if (!current.aisleSlug) return [];
  const candidates = AISLE_TAGGED_PRODUCTS.filter((product) => product.id !== current.id && product.aisleSlug === current.aisleSlug);
  const sameStoreFirst = [...candidates].sort((a, b) => Number(a.storeSlug !== current.storeSlug) - Number(b.storeSlug !== current.storeSlug));
  return sameStoreFirst.slice(0, limit).map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    packagingLabel: product.packagingLabel,
    price: product.price,
    image: product.image,
    storeSlug: product.storeSlug,
    storeName: product.storeName,
    isOutOfStock: product.isOutOfStock,
    // Real data the source product already carries — never fabricated (2026-11-19 UAT: "prix promotionnel" / "badge éventuel" in Produits similaires).
    annotation: product.compareAtPrice != null ? ({ kind: "compareAt", amount: product.compareAtPrice } as const) : undefined,
    badge: product.badge ? toProductCardBadge(product.badge) : undefined,
  }));
}

export interface ProductDetailRepository {
  getProduct(storeSlug: string, productSlug: string): Promise<ProductDetail | null>;
}

/** `FavoriteProduct` has no `aisleSlug`/`isOutOfStock`/`compareAtPrice` of its own — adapted from `stockStatus` instead of widening `fromBaseProduct`'s contract for one caller. */
function favoriteToBaseProduct(favorite: FavoriteProduct) {
  return {
    id: favorite.id,
    slug: favorite.slug,
    name: favorite.name,
    packagingLabel: favorite.packagingLabel,
    price: favorite.price,
    image: favorite.image,
    storeSlug: favorite.storeSlug,
    storeName: favorite.storeName,
    isOutOfStock: favorite.stockStatus === "out-of-stock",
  };
}

/** `NewArrivalProduct` has no `storeName`/`packagingLabel`/`isOutOfStock` of its own — adapted from its section's `stores` list and its `unit` string, same spirit as `favoriteToBaseProduct`. */
function newArrivalToBaseProduct(product: NewArrivalProduct, storeName: string) {
  return {
    id: product.id,
    slug: product.productSlug,
    name: product.name,
    packagingLabel: product.unit.replace(/^\/\s*/, ""),
    price: product.price,
    image: product.image,
    storeSlug: product.storeSlug,
    storeName,
    isOutOfStock: false,
  };
}

/** `LimitedStockItem` has no `packagingLabel`/`storeName` of its own — `subtitle` doubles as the packaging label, `STORE_DETAIL` as the store (the only one these items ever render for, see `store-detail.repository.ts`'s `getLimitedStock`). */
function limitedStockToBaseProduct(item: LimitedStockItem) {
  return {
    id: item.id,
    slug: item.id,
    name: item.name,
    packagingLabel: item.subtitle,
    price: item.price,
    image: item.image,
    storeSlug: STORE_DETAIL.id,
    storeName: STORE_DETAIL.name,
    isOutOfStock: item.status === "out-of-stock",
  };
}

/** Same reasoning as `limitedStockToBaseProduct` — `unitLabel` doubles as the packaging label. */
function bestSellerToBaseProduct(bestSeller: BestSeller) {
  return {
    id: bestSeller.id,
    slug: bestSeller.id,
    name: bestSeller.name,
    packagingLabel: bestSeller.unitLabel,
    price: bestSeller.price,
    image: bestSeller.image,
    storeSlug: STORE_DETAIL.id,
    storeName: STORE_DETAIL.name,
    isOutOfStock: false,
  };
}

/**
 * Resolution order (see Page P compte-rendu):
 *  (a) a rich reference fixture keyed by `${storeSlug}/${productSlug}`
 *      (`PRODUCT_DETAIL_FIXTURES`);
 *  (b) a minimal-but-real `ProductDetail` synthesized via `fromBaseProduct`
 *      from any pre-existing catalog/promo/deal/favorite/new-arrival
 *      fixture that matches the same pair — so every `ProductCard` link
 *      built for the other pages (Page A, Page B, Favoris, Bons plans,
 *      Nouveaux arrivages) resolves to a real page instead of a 404;
 *  (c) `null`, which the route handler turns into `notFound()`.
 */
export const mockProductDetailRepository: ProductDetailRepository = {
  async getProduct(storeSlug, productSlug) {
    const fixture = PRODUCT_DETAIL_FIXTURES[`${storeSlug}/${productSlug}`];
    if (fixture) return fixture;

    const catalogMatch = PRODUCTS.find((product) => product.storeSlug === storeSlug && product.slug === productSlug);
    if (catalogMatch) return { ...fromBaseProduct(catalogMatch), similar: findSimilarProducts(catalogMatch) };

    const promoProducts = [...FEATURED_PROMO_PRODUCTS, ...PROMO_CATEGORY_SECTIONS.flatMap((section) => section.products)];
    const promoMatch = promoProducts.find((product) => product.storeSlug === storeSlug && product.slug === productSlug);
    if (promoMatch) return { ...fromBaseProduct(promoMatch), similar: findSimilarProducts(promoMatch) };

    const dealMatch = STORE_DEALS.flatMap((store) => store.products).find(
      (product) => product.storeSlug === storeSlug && product.slug === productSlug
    );
    if (dealMatch) return { ...fromBaseProduct(dealMatch), similar: findSimilarProducts(dealMatch) };

    const favoriteMatch = FAVORITE_PRODUCTS.find((product) => product.storeSlug === storeSlug && product.slug === productSlug);
    if (favoriteMatch) return fromBaseProduct(favoriteToBaseProduct(favoriteMatch));

    for (const section of NEW_ARRIVAL_SECTIONS) {
      const newArrivalMatch = section.products.find((product) => product.storeSlug === storeSlug && product.productSlug === productSlug);
      if (newArrivalMatch) {
        const storeName = section.stores.find((store) => store.slug === storeSlug)?.name ?? newArrivalMatch.storeSlug;
        return fromBaseProduct(newArrivalToBaseProduct(newArrivalMatch, storeName));
      }
    }

    if (storeSlug === STORE_DETAIL.id) {
      const limitedStockMatch = LIMITED_STOCK_ITEMS.find((item) => item.id === productSlug);
      if (limitedStockMatch) return fromBaseProduct(limitedStockToBaseProduct(limitedStockMatch));

      const bestSellerMatch = BEST_SELLERS.find((item) => item.id === productSlug);
      if (bestSellerMatch) return fromBaseProduct(bestSellerToBaseProduct(bestSellerMatch));
    }

    return null;
  },
};
