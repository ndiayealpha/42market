import type { Category } from "@/src/domain/store-merchandising";
import type { CatalogScope, CatalogSortOption, Product } from "@/src/domain/catalog";
import type { RecipeKit } from "@/src/domain/recipe-kit";
import { CATEGORIES } from "@/src/data/store-detail.mock";
import { PRODUCTS, PRODUCTS_PAGE_SIZE, PRODUCTS_TOTAL_COUNT, RECIPE_KIT } from "@/src/data/catalog.mock";

export interface ProductsPage {
  products: Product[];
  page: number;
  pageSize: number;
  totalCount: number;
}

/**
 * A single store's own aisles/products/recipe-kit — distinct from the
 * pre-existing `catalog.repository.ts` (home-page's store listing +
 * preorders; same word, different concept, kept apart on purpose).
 */
export interface StoreCatalogRepository {
  getAisles(storeSlug: string): Promise<Category[]>;
  getProducts(storeSlug: string, scope: CatalogScope, sort: CatalogSortOption, page: number): Promise<ProductsPage>;
  getRecipeKit(storeSlug: string): Promise<RecipeKit | null>;
}

function scopedProducts(scope: CatalogScope): Product[] {
  return scope.type === "all" ? PRODUCTS : PRODUCTS.filter((product) => product.aisleSlug === scope.slug);
}

/**
 * Only 24 real product fixtures exist — the maquette's 240 "all scope"
 * total is simulated by repeating that same page across up to 10 pages
 * (24 × 10 = 240, matching the reference count exactly), each with a
 * page-suffixed id so list keys stay unique. A filtered rayon's total is
 * just that subset's real length (no repeat needed, nothing to simulate).
 */
export const mockStoreCatalogRepository: StoreCatalogRepository = {
  async getAisles(storeSlug) {
    return storeSlug === "loirivoire" ? CATEGORIES : [];
  },
  async getProducts(storeSlug, scope, _sort, page) {
    if (storeSlug !== "loirivoire") {
      return { products: [], page, pageSize: PRODUCTS_PAGE_SIZE, totalCount: 0 };
    }

    const base = scopedProducts(scope);
    if (scope.type === "rayon") {
      return { products: base, page: 1, pageSize: base.length, totalCount: base.length };
    }

    const products = page === 1 ? base : base.map((product) => ({ ...product, id: `${product.id}-p${page}` }));
    return { products, page, pageSize: PRODUCTS_PAGE_SIZE, totalCount: PRODUCTS_TOTAL_COUNT };
  },
  async getRecipeKit(storeSlug) {
    return storeSlug === "loirivoire" ? RECIPE_KIT : null;
  },
};
