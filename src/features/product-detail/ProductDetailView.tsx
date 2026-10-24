"use client";

import { Button } from "@/src/components/atoms/Button/Button";
import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Container } from "@/src/components/layout/Container/Container";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import { EmptyState } from "@/src/components/molecules/EmptyState/EmptyState";
import { useProductDetail } from "@/src/hooks/useProductDetail";
import { routes } from "@/src/lib/routing/routes";

import { buildProductDetailViewModel } from "./productDetailViewModel";
import { ProductDetailTemplate } from "./ProductDetailTemplate";

export interface ProductDetailViewProps {
  storeSlug: string;
  productSlug: string;
}

function ProductDetailSkeleton() {
  return (
    <Container className="flex flex-col gap-8 py-6">
      <Skeleton height={16} width={280} />
      <div className="grid gap-8 lg:grid-cols-2">
        <Skeleton height={360} radius="2xl" />
        <div className="flex flex-col gap-4">
          <Skeleton height={20} width={160} />
          <Skeleton height={32} width="80%" />
          <Skeleton height={120} radius="2xl" />
          <Skeleton height={56} radius="xl" />
        </div>
      </div>
    </Container>
  );
}

/**
 * `"use client"`: wires `useProductDetail` and hands the mapped view model
 * to the pure `ProductDetailTemplate` (same split as
 * `StoreCatalogView`/`StoreCatalogTemplate`). The route itself already
 * resolved/validated the product server-side and calls `notFound()` when
 * it's missing, so the error/empty state below is a defensive fallback for
 * the client-side re-fetch, not the primary 404 path.
 */
export function ProductDetailView({ storeSlug, productSlug }: ProductDetailViewProps) {
  const { product, isLoading, isError, refetch } = useProductDetail(storeSlug, productSlug);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (isError || !product) {
    return (
      <Container className="py-6">
        <EmptyState
          icon="basket"
          title="Impossible d'afficher ce produit pour le moment."
          description="Réessayez dans un instant, ou retournez à la boutique."
          action={
            isError ? (
              <Button variant="soft" onClick={() => refetch()}>
                Réessayer
              </Button>
            ) : (
              <ButtonLink href={routes.main.epicerieDetail(storeSlug)} variant="soft">
                Retour à la boutique
              </ButtonLink>
            )
          }
        />
      </Container>
    );
  }

  return <ProductDetailTemplate viewModel={buildProductDetailViewModel(product)} />;
}
