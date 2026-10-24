import { PRODUCTS } from "@/src/data/catalog.mock";
import { FAVORITE_PRODUCTS } from "@/src/data/favorites.mock";
import { PRODUCT_DETAIL_FIXTURES } from "@/src/data/product-detail.mock";
import { FEATURED_PROMO_PRODUCTS, PROMO_CATEGORY_SECTIONS } from "@/src/data/promotions.mock";
import { STORE_DEALS } from "@/src/data/store-deals.mock";
import type { FavoriteProduct } from "@/src/domain/favorites";
import { fromBaseProduct, type ProductDetail } from "@/src/domain/product-detail";

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

/**
 * Resolution order (see Page P compte-rendu):
 *  (a) a rich reference fixture keyed by `${storeSlug}/${productSlug}`
 *      (`PRODUCT_DETAIL_FIXTURES`);
 *  (b) a minimal-but-real `ProductDetail` synthesized via `fromBaseProduct`
 *      from any pre-existing catalog/promo/deal/favorite fixture that
 *      matches the same pair — so every `ProductCard` link built for the
 *      other pages (Page A, Page B, Favoris, Bons plans) resolves to a
 *      real page instead of a 404;
 *  (c) `null`, which the route handler turns into `notFound()`.
 */
export const mockProductDetailRepository: ProductDetailRepository = {
  async getProduct(storeSlug, productSlug) {
    const fixture = PRODUCT_DETAIL_FIXTURES[`${storeSlug}/${productSlug}`];
    if (fixture) return fixture;

    const catalogMatch = PRODUCTS.find((product) => product.storeSlug === storeSlug && product.slug === productSlug);
    if (catalogMatch) return fromBaseProduct(catalogMatch);

    const promoProducts = [...FEATURED_PROMO_PRODUCTS, ...PROMO_CATEGORY_SECTIONS.flatMap((section) => section.products)];
    const promoMatch = promoProducts.find((product) => product.storeSlug === storeSlug && product.slug === productSlug);
    if (promoMatch) return fromBaseProduct(promoMatch);

    const dealMatch = STORE_DEALS.flatMap((store) => store.products).find(
      (product) => product.storeSlug === storeSlug && product.slug === productSlug
    );
    if (dealMatch) return fromBaseProduct(dealMatch);

    const favoriteMatch = FAVORITE_PRODUCTS.find((product) => product.storeSlug === storeSlug && product.slug === productSlug);
    if (favoriteMatch) return fromBaseProduct(favoriteToBaseProduct(favoriteMatch));

    return null;
  },
};
