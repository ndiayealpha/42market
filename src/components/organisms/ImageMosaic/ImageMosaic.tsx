import Image from "next/image";
import type { ReactNode } from "react";

export interface ImageMosaicProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** Overlay content positioned relative to the image, e.g. a `FloatingBadge`. */
  children?: ReactNode;
  priority?: boolean;
}

/**
 * A single framed, shadowed photo — the hero panel's visual centerpiece
 * on both login and signup. No default radius: login (24px→32px
 * responsive) and signup (16px, fixed) round it differently, so the
 * caller's `className` always supplies it — baking one in here would
 * fight whichever variant needs the other value.
 */
export function ImageMosaic({ src, alt, width, height, className = "", children, priority }: ImageMosaicProps) {
  return (
    <div className={`relative overflow-hidden shadow-md ${className}`}>
      <Image src={src} alt={alt} width={width} height={height} priority={priority} className="h-full w-full object-cover" />
      {children}
    </div>
  );
}
