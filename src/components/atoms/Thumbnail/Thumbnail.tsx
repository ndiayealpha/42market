"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

export type ThumbnailSize = 64 | 80;
export type ThumbnailRadius = "sm" | "md";

const DEFAULT_RADIUS: Record<ThumbnailSize, ThumbnailRadius> = { 64: "sm", 80: "md" };
const RADIUS_CLASSES: Record<ThumbnailRadius, string> = {
  sm: "rounded-md", // radius-sm (6px) — 64px product thumbnail
  md: "rounded-lg", // radius-md (8px) — 80px store thumbnail
};
// Tailwind size classes rather than inline `style` width/height, so a
// consumer can shrink it responsively (StoreCard: 80px → 64px under
// 640px) via `!h-* !w-*` — an inline style can never be beaten by a
// class, important or not.
const SIZE_CLASSES: Record<ThumbnailSize, string> = {
  64: "h-16 w-16",
  80: "h-20 w-20",
};

function getInitials(label: string): string {
  return label
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export interface ThumbnailProps {
  src?: string;
  alt: string;
  size: ThumbnailSize;
  radius?: ThumbnailRadius;
  /** "contain": white background, bordered, padded — logo-type images. */
  fit?: "cover" | "contain";
  /** Positioned `absolute top-1 left-1`. */
  overlay?: ReactNode;
  className?: string;
}

/** Image with an initials fallback when `src` is missing or fails to load — never a broken image. */
export function Thumbnail({ src, alt, size, radius, fit = "cover", overlay, className = "" }: ThumbnailProps) {
  const [failed, setFailed] = useState(false);
  const showFallback = !src || failed;
  const radiusClass = RADIUS_CLASSES[radius ?? DEFAULT_RADIUS[size]];

  return (
    <div
      className={`relative shrink-0 overflow-hidden ${SIZE_CLASSES[size]} ${radiusClass} ${
        fit === "contain" ? "border border-catalog-thumb-border bg-surface p-3" : ""
      } ${className}`}
    >
      {showFallback ? (
        <span className="flex h-full w-full items-center justify-center bg-catalog-chip text-sm font-semibold text-foreground-strong">
          {getInitials(alt)}
        </span>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          className={fit === "contain" ? "object-contain" : "object-cover"}
          onError={() => setFailed(true)}
        />
      )}
      {overlay && <div className="absolute top-1 left-1">{overlay}</div>}
    </div>
  );
}
