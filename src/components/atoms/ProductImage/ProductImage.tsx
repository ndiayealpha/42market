"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

import { Icon } from "@/src/components/atoms/Icon/Icon";

export interface ProductImageProps {
  src?: string;
  alt: string;
  /** e.g. "4/3", "1/1" — a CSS `aspect-ratio` value. Inline style, not a Tailwind class: it varies per consumer and isn't on a static scale, and a template-built `aspect-[...]` class wouldn't survive Tailwind's static scanner. */
  aspectRatio: string;
  /** Above-the-fold images only (the store header photo). Everything else lazy-loads by Next's own default. */
  priority?: boolean;
  sizes?: string;
  /** "contain" (deal cards on the "Bons plans par épiceries" page): the photo sits padded on a beige tile instead of filling/cropping it. Defaults to "cover" — every existing usage is unaffected. */
  fit?: "cover" | "contain";
  topLeft?: ReactNode;
  topRight?: ReactNode;
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
  className?: string;
}

/** `next/image` + a neutral fallback (missing or broken `src`) + 4 overlay slots — the one image primitive for every product/store photo on this page. */
export function ProductImage({
  src,
  alt,
  aspectRatio,
  priority,
  sizes = "100vw",
  fit = "cover",
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  className = "",
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const showFallback = !src || failed;

  return (
    <div className={`relative overflow-hidden ${fit === "contain" ? "bg-catalog-chip" : ""} ${className}`} style={{ aspectRatio }}>
      {showFallback ? (
        <div className="flex h-full w-full items-center justify-center bg-catalog-chip">
          <Icon name="store" size={28} className="text-catalog-faint" />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={fit === "contain" ? "object-contain p-3" : "object-cover"}
          onError={() => setFailed(true)}
        />
      )}
      {topLeft && <div className="absolute top-2 left-2">{topLeft}</div>}
      {topRight && <div className="absolute top-2 right-2">{topRight}</div>}
      {bottomLeft && <div className="absolute bottom-2 left-2">{bottomLeft}</div>}
      {bottomRight && <div className="absolute right-2 bottom-2">{bottomRight}</div>}
    </div>
  );
}
