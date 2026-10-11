import Image from "next/image";
import type { ReactNode } from "react";

import { FloatingBadge } from "@/src/components/molecules/FloatingBadge/FloatingBadge";
import { ImageMosaic } from "@/src/components/organisms/ImageMosaic/ImageMosaic";
import { Testimonial } from "@/src/components/molecules/Testimonial/Testimonial";

export interface AuthHeroPanelProps {
  title: ReactNode;
  tagline: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
  /** "signup" adds a left-aligned header + optional testimonial, matching that mockup's structure. */
  variant?: "login" | "signup";
  testimonial?: { quote: string; author: string };
}

/**
 * The auth screens' left panel. Both variants share the same dark
 * rounded shell and the same `ImageMosaic`/`Testimonial` building
 * blocks; what differs (centered vs. top-aligned, radius, whether a
 * testimonial exists) is exactly what a real second mockup of "the same
 * panel" turned out to specify — see the token file's note on
 * measurement drift between the two Figma frames.
 */
export function AuthHeroPanel({
  title,
  tagline,
  imageSrc,
  imageAlt,
  className = "",
  variant = "login",
  testimonial,
}: AuthHeroPanelProps) {
  if (variant === "signup") {
    return (
      <div className={`flex min-h-0 flex-col overflow-hidden rounded-[54px] bg-foreground text-white ${className}`}>
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-16 py-12">
          <h2 className="text-[36px] font-bold leading-tight tracking-[-0.02em]">{title}</h2>
          <p className="max-w-[338px] text-base leading-6 text-auth-hero-text">{tagline}</p>

          <ImageMosaic
            src={imageSrc}
            alt={imageAlt}
            width={338}
            height={431}
            priority
            className="mt-2 w-[338px] max-w-full rounded-2xl"
          />

          {testimonial && (
            <>
              <span aria-hidden className="h-px w-[338px] max-w-full bg-white/10" />
              <Testimonial {...testimonial} className="w-[338px] max-w-full" />
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative flex min-h-0 flex-col overflow-hidden rounded-[48px] bg-foreground p-6 text-white ${className}`}
    >
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-[clamp(16px,3vh,28px)]">
        <ImageMosaic
          src={imageSrc}
          alt={imageAlt}
          width={306}
          height={390}
          priority
          className="mx-auto min-h-0 w-full max-w-xs shrink rounded-2xl sm:max-w-sm lg:aspect-[306/390] lg:h-[clamp(220px,42vh,390px)] lg:w-auto lg:max-w-none lg:rounded-[32px] lg:[@media(max-height:720px)]:h-[clamp(180px,34vh,260px)]"
        >
          <FloatingBadge position="top-right" size={40}>
            <Image src="/login-badge.svg" alt="" width={40} height={40} />
          </FloatingBadge>
        </ImageMosaic>

        <div className="flex shrink-0 flex-col gap-2 text-center">
          <h2 className="text-xl font-bold leading-tight tracking-[-0.02em] sm:text-2xl lg:text-[clamp(24px,3.4vh,30px)]">
            {title}
          </h2>
          <p className="mx-auto line-clamp-3 max-w-[290px] text-sm leading-7 text-white/90 sm:text-base lg:leading-[clamp(22px,3vh,28px)] [@media(max-height:620px)]:hidden">
            {tagline}
          </p>
        </div>
      </div>
    </div>
  );
}
