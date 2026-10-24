import Link from "next/link";

import { AddToCartButton } from "@/src/components/atoms/AddToCartButton/AddToCartButton";
import { Checkbox } from "@/src/components/atoms/Checkbox/Checkbox";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { DealLabel } from "@/src/components/atoms/DealLabel/DealLabel";
import { FavoriteButton } from "@/src/components/atoms/FavoriteButton/FavoriteButton";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import { RatingChip } from "@/src/components/atoms/RatingChip/RatingChip";
import { StoreTag } from "@/src/components/atoms/StoreTag/StoreTag";
import { computeDiscountPercent, formatEditorialTag, type Product } from "@/src/domain/catalog";
import { formatFavoriteUnitPrice, getStockStatusConfig, type FavoriteProduct } from "@/src/domain/favorites";
import { formatPromoBadge, type PromoProduct } from "@/src/domain/promotions";
import {
  formatProductCardBadge,
  type PriceAnnotation,
  type ProductCardBadge,
  type RelatedProduct,
  type SearchResultProduct,
} from "@/src/domain/product-cards";
import type { DealProduct } from "@/src/domain/store-deals";
import { useAddProductToCart, type CartProductInput } from "@/src/hooks/useAddProductToCart";
import { useFavorites } from "@/src/hooks/useFavorites";
import { formatPrice } from "@/src/lib/format";
import { routes } from "@/src/lib/routing/routes";

export type ProductCardProps =
  | { variant: "catalog"; product: Product }
  | {
      variant: "promo";
      product: PromoProduct;
      /** False when every card in view is already scoped to one store — the maquette's own "boutique" segment is redundant then (rule 9: "UneSeuleBoutique"). Defaults to true. */
      showStoreName?: boolean;
    }
  | { variant: "deal"; product: DealProduct }
  | {
      variant: "favorite";
      product: FavoriteProduct;
      /** "Gérer la sélection" mode (F4) — shows a checkbox and hides the "+" while active. Defaults to false. */
      selectable?: boolean;
      isSelected?: boolean;
      onToggleSelect?: (productId: string) => void;
    }
  | { variant: "related"; product: RelatedProduct }
  | { variant: "search"; product: SearchResultProduct };

/** Every product shape here (`Product`, `PromoProduct`, `DealProduct`, `FavoriteProduct`, `RelatedProduct`, `SearchResultProduct`) shares these exact fields — one builder instead of repeating the same object literal at every "+" button. */
function toCartItem(product: {
  id: string;
  name: string;
  packagingLabel: string;
  price: number;
  image: { src?: string; alt: string };
  storeSlug: string;
  storeName: string;
}): CartProductInput {
  return {
    id: product.id,
    name: product.name,
    packagingLabel: product.packagingLabel,
    price: product.price,
    image: product.image,
    storeSlug: product.storeSlug,
    storeName: product.storeName,
  };
}

/** Catalog variant: no compare-at price exists on `Product`, so the footer only ever shows the current price. */
function CatalogFooter({ product }: { product: Product }) {
  const { addToCart, dialog } = useAddProductToCart();
  return (
    <div className="mt-2 flex items-center justify-between gap-2">
      <span className="text-base font-bold text-foreground-strong">{formatPrice(product.price)}</span>
      <AddToCartButton
        productName={product.name}
        onAdd={() => addToCart(toCartItem(product))}
        unavailable={product.isOutOfStock}
        size="md"
        bg="var(--color-foreground-strong)"
        fg="#FFFFFF"
        className="relative z-10"
      />
      {dialog}
    </div>
  );
}

function PromoPriceRow({ product }: { product: PromoProduct }) {
  return (
    <p className="mt-2 flex items-baseline gap-1.5">
      <span className="text-base font-bold text-foreground-strong">{formatPrice(product.price)}</span>
      {product.compareAtPrice != null && (
        <del className="text-xs text-catalog-faint">
          <span className="sr-only">Prix initial </span>
          {formatPrice(product.compareAtPrice)}
        </del>
      )}
    </p>
  );
}

function ProductCardAddToCart({ product }: { product: Product }) {
  const { addToCart, dialog } = useAddProductToCart();
  return (
    <>
      <AddToCartButton
        productName={product.name}
        onAdd={() => addToCart(toCartItem(product))}
        unavailable={product.isOutOfStock}
        size="md"
        bg="var(--color-foreground-strong)"
        fg="#FFFFFF"
        className="relative z-10"
      />
      {dialog}
    </>
  );
}

/** Falls back to a computed discount percent when the fixture gives no badge at all (incohérence #3: "sans badge fourni, retombe sur le % calculé"). */
function DealBadge({ product }: { product: DealProduct }) {
  if (product.badge) {
    return (
      <Chip tone="danger" size="sm" className="font-bold">
        {formatPromoBadge(product.badge)}
      </Chip>
    );
  }
  if (product.compareAtPrice == null) return null;
  const percent = computeDiscountPercent(product.price, product.compareAtPrice);
  if (percent <= 0) return null;
  return (
    <Chip tone="danger" size="sm" className="font-bold">
      -{percent}%
    </Chip>
  );
}

function DealFooter({ product }: { product: DealProduct }) {
  const { addToCart, dialog } = useAddProductToCart();
  return (
    <div className="mt-2 flex items-center justify-between gap-2">
      {product.dealLabel ? <DealLabel text={product.dealLabel.text} tone={product.dealLabel.tone} /> : <span />}
      <AddToCartButton
        productName={product.name}
        onAdd={() => addToCart(toCartItem(product))}
        unavailable={product.isOutOfStock}
        size="md"
        bg="var(--color-foreground-strong)"
        fg="#FFFFFF"
        className="relative z-10 shrink-0"
      />
      {dialog}
    </div>
  );
}

function FavoriteStockStatus({ product }: { product: FavoriteProduct }) {
  const config = getStockStatusConfig(product.stockStatus);
  if (!config) return null;
  const DOT_CLASSES: Record<typeof config.tone, string> = {
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
  };
  const TEXT_CLASSES: Record<typeof config.tone, string> = {
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
  };
  return (
    <p className={`flex items-center gap-1.5 text-xs font-semibold ${TEXT_CLASSES[config.tone]}`}>
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${DOT_CLASSES[config.tone]}`} />
      {config.label}
    </p>
  );
}

function FavoriteFooter({ product }: { product: FavoriteProduct }) {
  const { addToCart, dialog } = useAddProductToCart();
  const isOutOfStock = product.stockStatus === "out-of-stock";
  return (
    <div className="mt-2 flex items-end justify-between gap-2">
      <div>
        <p className="text-base font-bold text-foreground-strong">{formatPrice(product.price)}</p>
        <p className="text-[11px] text-muted-foreground">{formatFavoriteUnitPrice(product.price, product.unitBasis)}</p>
      </div>
      <AddToCartButton
        productName={product.name}
        onAdd={() => addToCart(toCartItem(product))}
        unavailable={isOutOfStock}
        size="md"
        bg="var(--color-foreground-strong)"
        fg="#FFFFFF"
        className="relative z-10 shrink-0"
      />
      {dialog}
    </div>
  );
}

const PRODUCT_CARD_BADGE_TONE: Record<ProductCardBadge["kind"], "danger" | "success" | "cream"> = {
  discount: "danger",
  bio: "success",
  label: "cream",
};

/** Shared by the "related" (P9) and "search" (R4) presets — one badge chip instead of two near-identical ones. */
function ProductCardBadgeChip({ badge }: { badge: ProductCardBadge }) {
  return (
    <Chip tone={PRODUCT_CARD_BADGE_TONE[badge.kind]} size="sm" className="font-bold">
      {formatProductCardBadge(badge)}
    </Chip>
  );
}

/** Renders whichever one of the 3 annotation kinds is present — never more than one at a time (rule O). */
function PriceAnnotationText({ annotation }: { annotation: PriceAnnotation | undefined }) {
  if (!annotation) return null;
  switch (annotation.kind) {
    case "compareAt":
      return (
        <del className="text-xs text-catalog-faint">
          <span className="sr-only">Prix initial </span>
          {formatPrice(annotation.amount)}
        </del>
      );
    case "inStock":
      return <span className="text-xs font-semibold text-success">En stock</span>;
    case "unitPrice":
      return <span className="text-[11px] text-muted-foreground">{annotation.label}</span>;
    default: {
      const exhaustive: never = annotation;
      throw new Error(`Unhandled price annotation: ${JSON.stringify(exhaustive)}`);
    }
  }
}

function RelatedFooter({ product }: { product: RelatedProduct }) {
  const { addToCart, dialog } = useAddProductToCart();
  return (
    <>
      <AddToCartButton
        productName={product.name}
        onAdd={() => addToCart(toCartItem(product))}
        unavailable={product.isOutOfStock}
        size="md"
        bg="var(--color-foreground-strong)"
        fg="#FFFFFF"
        className="relative z-10 shrink-0"
      />
      {dialog}
    </>
  );
}

function SearchFooter({ product }: { product: SearchResultProduct }) {
  const { addToCart, dialog } = useAddProductToCart();
  return (
    <>
      <AddToCartButton productName={product.name} onAdd={() => addToCart(toCartItem(product))} unavailable={product.isOutOfStock} variant="block" />
      {dialog}
    </>
  );
}

/**
 * One brick, two variants (rule: "UNE brique, 2 variantes") — built on the
 * same atoms as `OfferCard` (`ProductImage`, `AddToCartButton`), extended
 * with the new `FavoriteButton`. The name's link is stretched over the
 * WHOLE card (`relative` on the root, the link's `after:absolute
 * after:inset-0`), so the heart/"+" need their own `relative z-10` to stay
 * above that invisible overlay and remain independently clickable — never
 * an interactive control nested inside the link itself.
 */
export function ProductCard(props: ProductCardProps) {
  const { favoriteIds } = useFavorites();
  const isFavorite = props.variant === "favorite" ? true : favoriteIds.has(props.product.id);
  const favoriteLabel = isFavorite ? `Retirer ${props.product.name} des favoris` : `Ajouter ${props.product.name} aux favoris`;
  const showStoreName = props.variant === "promo" && (props.showStoreName ?? true);

  if (props.variant === "favorite") {
    const isOutOfStock = props.product.stockStatus === "out-of-stock";
    return (
      <div className={`relative flex h-full flex-col overflow-hidden rounded-xl bg-surface ${isOutOfStock ? "opacity-60" : ""}`}>
        <ProductImage
          src={props.product.image.src}
          alt={props.product.image.alt}
          aspectRatio="226/262"
          sizes="(min-width: 1280px) 20vw, (min-width: 640px) 33vw, 50vw"
          topLeft={
            props.selectable ? (
              <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-surface/90 shadow-[0_1px_4px_rgba(0,0,0,0.15)]">
                <Checkbox
                  checked={props.isSelected ?? false}
                  disabled={isOutOfStock}
                  onChange={() => props.onToggleSelect?.(props.product.id)}
                  aria-label={`${props.isSelected ? "Désélectionner" : "Sélectionner"} ${props.product.name}`}
                />
              </span>
            ) : undefined
          }
          topRight={<FavoriteButton itemId={props.product.id} isFavorite={isFavorite} label={favoriteLabel} kind="product" className="relative z-10" />}
          bottomLeft={<StoreTag name={props.product.storeName} />}
        />
        <div className="flex flex-1 flex-col p-3">
          <FavoriteStockStatus product={props.product} />
          <p className="mt-1 line-clamp-2 text-base font-bold text-foreground-strong">
            <Link href={routes.main.epicerieProduit(props.product.storeSlug, props.product.slug)} className="after:absolute after:inset-0">
              {props.product.name}
            </Link>
          </p>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{props.product.packagingLabel}</p>
          <div className="mt-auto">
            <FavoriteFooter product={props.product} />
          </div>
        </div>
      </div>
    );
  }

  if (props.variant === "deal") {
    return (
      <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-surface">
        <ProductImage
          src={props.product.image.src}
          alt={props.product.image.alt}
          aspectRatio="1/1"
          fit="contain"
          sizes="(min-width: 1280px) 16vw, (min-width: 640px) 33vw, 50vw"
          topLeft={<DealBadge product={props.product} />}
          topRight={<FavoriteButton itemId={props.product.id} isFavorite={isFavorite} label={favoriteLabel} className="relative z-10" />}
        />
        <div className="flex flex-1 flex-col p-3">
          <p className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-foreground-strong">{formatPrice(props.product.price)}</span>
            {props.product.compareAtPrice != null && (
              <del className="text-xs text-catalog-faint">
                <span className="sr-only">Prix initial </span>
                {formatPrice(props.product.compareAtPrice)}
              </del>
            )}
          </p>
          <p className="mt-1 line-clamp-2 text-sm font-medium text-foreground-strong">
            <Link href={routes.main.epicerieProduit(props.product.storeSlug, props.product.slug)} className="after:absolute after:inset-0">
              {props.product.name}
            </Link>
          </p>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
            {props.product.packagingLabel} • {props.product.storeName}
          </p>
          <div className="mt-auto">
            <DealFooter product={props.product} />
          </div>
        </div>
      </div>
    );
  }

  if (props.variant === "related") {
    return (
      <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-surface">
        <ProductImage
          src={props.product.image.src}
          alt={props.product.image.alt}
          aspectRatio="1/1"
          sizes="(min-width: 1280px) 16vw, (min-width: 640px) 33vw, 50vw"
          topLeft={props.product.badge ? <ProductCardBadgeChip badge={props.product.badge} /> : undefined}
          topRight={<FavoriteButton itemId={props.product.id} isFavorite={isFavorite} label={favoriteLabel} className="relative z-10" />}
        />
        <div className="flex flex-1 flex-col p-3">
          <p className="line-clamp-2 text-sm font-medium text-foreground-strong">
            <Link href={routes.main.epicerieProduit(props.product.storeSlug, props.product.slug)} className="after:absolute after:inset-0">
              {props.product.name}
            </Link>
          </p>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
            {props.product.packagingLabel}
            {props.product.rating && (
              <>
                {" "}
                • <RatingChip average={props.product.rating.average} className="inline-flex" />
              </>
            )}
          </p>
          <div className="mt-auto flex items-center justify-between gap-2 pt-2">
            <div>
              <p className="text-base font-bold text-foreground-strong">{formatPrice(props.product.price)}</p>
              <PriceAnnotationText annotation={props.product.annotation} />
            </div>
            <RelatedFooter product={props.product} />
          </div>
        </div>
      </div>
    );
  }

  if (props.variant === "search") {
    return (
      <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-surface">
        <ProductImage
          src={props.product.image.src}
          alt={props.product.image.alt}
          aspectRatio="1/1"
          sizes="(min-width: 1280px) 16vw, (min-width: 640px) 33vw, 50vw"
          topLeft={props.product.badge ? <ProductCardBadgeChip badge={props.product.badge} /> : undefined}
          bottomLeft={props.product.editorialTag ? (
            <Chip tone="cream" size="sm">
              {props.product.editorialTag}
            </Chip>
          ) : undefined}
        />
        <div className="flex flex-1 flex-col p-3">
          <p className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-foreground-strong">{formatPrice(props.product.price)}</span>
            <PriceAnnotationText annotation={props.product.annotation} />
          </p>
          <p className="mt-1 line-clamp-2 text-sm font-medium text-foreground-strong">
            <Link href={routes.main.epicerieProduit(props.product.storeSlug, props.product.slug)} className="after:absolute after:inset-0">
              {props.product.name}
            </Link>
          </p>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{props.product.packagingLabel}</p>
          <div className="relative z-10 mt-auto pt-2">
            <SearchFooter product={props.product} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-surface">
      <ProductImage
        src={props.product.image.src}
        alt={props.product.image.alt}
        aspectRatio="1/1"
        sizes="(min-width: 1280px) 16vw, (min-width: 640px) 33vw, 50vw"
        topLeft={
          props.variant === "promo" ? (
            <Chip tone="danger" size="sm" className="font-bold">
              {formatPromoBadge(props.product.badge)}
            </Chip>
          ) : undefined
        }
        bottomLeft={
          props.variant === "catalog" && props.product.tag ? (
            <Chip tone="cream" size="sm">
              {formatEditorialTag(props.product.tag)}
            </Chip>
          ) : undefined
        }
        topRight={<FavoriteButton itemId={props.product.id} isFavorite={isFavorite} label={favoriteLabel} className="relative z-10" />}
        bottomRight={props.variant === "promo" ? <ProductCardAddToCart product={props.product} /> : undefined}
      />

      <div className="flex flex-1 flex-col p-3">
        {props.variant === "promo" && <PromoPriceRow product={props.product} />}

        <p className="mt-1 line-clamp-2 text-sm font-medium text-foreground-strong">
          <Link href={routes.main.epicerieProduit(props.product.storeSlug, props.product.slug)} className="after:absolute after:inset-0">
            {props.product.name}
          </Link>
        </p>
        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
          {showStoreName ? `${props.product.packagingLabel} • ${props.product.storeName}` : props.product.packagingLabel}
        </p>

        {props.variant === "catalog" && (
          <div className="mt-auto">
            <CatalogFooter product={props.product} />
          </div>
        )}
      </div>
    </div>
  );
}
