import { BannerSurface } from "@/src/components/layout/BannerSurface/BannerSurface";

/** No stock photo of a real épicier/shopper exchange exists for this mock app — the quote stands on its own rather than next to a fabricated photo, same discipline as `ManifestoSection`'s initials-only avatar. */
export function MerchantTestimonialBanner() {
  return (
    <BannerSurface tone="brown" className="px-6 py-10 text-center sm:px-12">
      <blockquote className="mx-auto max-w-2xl text-lg font-semibold italic text-white sm:text-xl">
        « Nous sommes le lien vivant entre le pays et la table de nos familles. »
      </blockquote>
    </BannerSurface>
  );
}
