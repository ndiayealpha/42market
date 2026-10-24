import { Breadcrumb } from "@/src/components/atoms/Breadcrumb/Breadcrumb";
import { Container } from "@/src/components/layout/Container/Container";
import { ReassuranceBand } from "@/src/components/organisms/ReassuranceBand/ReassuranceBand";
import { TRUST_ITEMS } from "@/src/components/organisms/Footer/Footer.constants";

import type { ProductDetailViewModel } from "./productDetailViewModel";
import { ProductFactsStrip } from "./ProductFactsStrip";
import { ProductGallery } from "./ProductGallery";
import { ProductHeader } from "./ProductHeader";
import { ProductInfoAccordions } from "./ProductInfoAccordions";
import { ProductPurchaseBox } from "./ProductPurchaseBox";
import { PriceCard } from "./PriceCard";
import { SimilarProductsSection } from "./SimilarProductsSection";

export interface ProductDetailTemplateProps {
  viewModel: ProductDetailViewModel;
}

/**
 * Pure — no data fetching of its own (`ProductDetailView` wires the
 * `useProductDetail` hook and resolves the view model, same Template/View
 * split as `StoreCatalogTemplate`/`StoreCatalogView`). P1→P9 order: left
 * column is the gallery + facts strip, right column is header → price →
 * description → purchase box → accordions; similar products run full-width
 * below, and the global `ReassuranceBand` sits just above the Footer the
 * layout already renders.
 */
export function ProductDetailTemplate({ viewModel }: ProductDetailTemplateProps) {
  const { product, facts, characteristicRows, savings, discountPercent, breadcrumbItems } = viewModel;
  const firstPhoto = product.media.find((media) => media.kind === "photo");

  return (
    <Container className="flex flex-col gap-10 py-6">
      <Breadcrumb items={breadcrumbItems} />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <ProductGallery
            productId={product.id}
            productName={product.name}
            media={product.media}
            isBioCertified={product.isBioCertified}
            bioCertificationCode={product.bioCertificationCode}
            discountPercent={discountPercent}
          />
          <ProductFactsStrip facts={facts} />
        </div>

        <div className="flex flex-col gap-6">
          <ProductHeader
            eyebrow={product.aisleLabelLong}
            name={product.name}
            hasFreshnessGuarantee={product.hasFreshnessGuarantee}
            rating={product.rating}
          />

          <PriceCard
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            savings={savings}
            vatRatePercent={product.vatRatePercent}
            unitBasis={product.unitBasis}
            packagingLabel={product.packagingLabel}
          />

          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            {product.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <ProductPurchaseBox
            productId={product.id}
            productName={product.name}
            packagingLabel={product.packagingLabel}
            price={product.price}
            image={firstPhoto?.kind === "photo" ? { src: firstPhoto.src, alt: firstPhoto.alt } : { alt: product.name }}
            stockCount={product.stockCount}
            stockCapPerOrder={product.stockCapPerOrder}
            storeSlug={product.storeSlug}
            storeName={product.storeName}
          />

          <ProductInfoAccordions characteristicRows={characteristicRows} allergens={product.allergens} />
        </div>
      </div>

      <SimilarProductsSection products={product.similar} />

      <ReassuranceBand items={TRUST_ITEMS} variant="inline" />
    </Container>
  );
}
