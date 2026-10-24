import { BannerCta } from "@/src/components/layout/BannerCta/BannerCta";
import { BannerSurface } from "@/src/components/layout/BannerSurface/BannerSurface";
import { HighlightedText } from "@/src/components/atoms/HighlightedText/HighlightedText";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import type { PromoBannerContent } from "@/src/domain/store-merchandising";

export interface PromoBannerProps {
  banner: PromoBannerContent;
}

export function PromoBanner({ banner }: PromoBannerProps) {
  return (
    <BannerSurface tone="forest" className="flex flex-col md:flex-row">
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-4 p-6 md:p-10">
        <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
          {banner.badge}
        </span>
        <h2 className="text-2xl font-extrabold text-white md:text-3xl">
          <HighlightedText segments={banner.title} />
        </h2>
        <p className="text-sm text-white/80">{banner.body}</p>
        <BannerCta href={banner.ctaHref} icon={<Icon name="arrow-right" size={16} />} className="w-fit">
          {banner.ctaLabel}
        </BannerCta>
      </div>
      <ProductImage src={banner.image.src} alt={banner.image.alt} aspectRatio="4/3" sizes="(min-width: 768px) 45vw, 100vw" className="md:w-[45%]" />
    </BannerSurface>
  );
}
