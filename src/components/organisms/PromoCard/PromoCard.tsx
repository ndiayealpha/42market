"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";

import type { IconName } from "@/src/components/atoms/Icon/Icon";
import { IconButton } from "@/src/components/atoms/IconButton/IconButton";
import { Pill } from "@/src/components/atoms/Pill/Pill";
import { Price } from "@/src/components/atoms/Price/Price";
import { Sticker, type StickerAnchor } from "@/src/components/atoms/Sticker/Sticker";

import { PROMO_THEMES, type PromoThemeName, type PromoThemeTokens } from "./PromoCard.themes";

export type PromoCardLayout = "media-framed" | "media-bleed" | "text";

export interface PromoCardBadgeConfig {
  label: string;
  secondaryLabel?: string;
  icon?: IconName;
}

export interface PromoCardMediaConfig {
  src: string;
  alt: string;
  /** media-framed only. Defaults to 4/3. */
  ratio?: "4/3" | "1/1";
}

export interface PromoCardStickerConfig {
  shape: "pill" | "circle";
  /** Which global token supplies the fill — see variables.scss. */
  color: "promo-red" | "promo-orange";
  anchor: StickerAnchor;
  rotate?: number;
  price?: { amount: number; oldAmount?: number; prefix?: string };
  value?: string;
  caption?: string;
}

export interface PromoCardPriceConfig {
  amount: number;
  oldAmount?: number;
  prefix?: string;
}

export interface PromoCardProps {
  layout: PromoCardLayout;
  theme: PromoThemeName;
  /** Partial override on top of the theme preset. */
  colors?: Partial<PromoThemeTokens>;
  badge: PromoCardBadgeConfig;
  title: string;
  highlight?: string;
  subtitle?: string;
  description?: string;
  tag?: string;
  href: string;
  ctaLabel: string;
  media?: PromoCardMediaConfig;
  stickers?: PromoCardStickerConfig[];
  price?: PromoCardPriceConfig;
  glow?: boolean;
  width?: number;
  className?: string;
}

const DEFAULT_WIDTH: Record<PromoCardLayout, number> = {
  "media-framed": 620,
  "media-bleed": 760,
  text: 560,
};

/**
 * The one card behind all 6 banners. Every visual difference between
 * them — colors, layout, content, stickers, price — is a prop; see
 * PromoCard.themes.ts for the color presets and PromoSection.data.ts
 * for the 6 real items.
 *
 * Colors are set once as CSS custom properties on the card's own root
 * (the `style` object below) and every child atom (Pill, IconButton,
 * Price) is handed a `var(--promo-*)` reference rather than a raw hex —
 * so overriding a single token (via `colors`) or adding a theme never
 * touches this component.
 */
export function PromoCard({
  layout,
  theme,
  colors,
  badge,
  title,
  highlight,
  subtitle,
  description,
  tag,
  href,
  ctaLabel,
  media,
  stickers,
  price,
  glow,
  width,
  className = "",
}: PromoCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const tokens: PromoThemeTokens = { ...PROMO_THEMES[theme], ...colors };
  const hasMedia = Boolean(media) && !imageFailed;
  const effectiveLayout: PromoCardLayout = hasMedia ? layout : "text";
  const cardWidth = width ?? DEFAULT_WIDTH[layout];

  const cssVars = {
    "--promo-bg-from": tokens.bgFrom,
    "--promo-bg-to": tokens.bgTo,
    "--promo-title": tokens.title,
    "--promo-text": tokens.text,
    "--promo-badge-bg": tokens.badgeBg,
    "--promo-badge-fg": tokens.badgeFg,
    "--promo-badge-icon": tokens.badgeIcon ?? tokens.badgeFg,
    "--promo-cta-bg": tokens.ctaBg,
    "--promo-cta-fg": tokens.ctaFg,
    "--promo-tag-bg": tokens.tagBg,
    "--promo-tag-fg": tokens.tagFg,
    "--promo-accent": tokens.accent,
    "--promo-glow": tokens.glow ?? "transparent",
    "--promo-width": `${cardWidth}px`,
  } as CSSProperties;

  return (
    <Link
      href={href}
      style={cssVars}
      aria-label={[title, highlight].filter(Boolean).join(" ")}
      className={`group relative flex h-full w-[85vw] max-w-[400px] shrink-0 flex-col overflow-hidden rounded-[24px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] outline-none transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-foreground-strong motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:w-full md:min-w-[var(--promo-width)] md:max-w-none ${
        effectiveLayout === "text" ? "md:flex-col" : "md:flex-row"
      } ${className}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{ background: "linear-gradient(135deg, var(--promo-bg-from), var(--promo-bg-to))" }}
      />
      {glow && tokens.glow && effectiveLayout === "text" && (
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -right-16 -z-10 h-[220px] w-[220px] rounded-full"
          style={{ background: "radial-gradient(circle, var(--promo-glow), transparent 70%)" }}
        />
      )}

      <div className={`flex min-w-0 flex-1 flex-col p-6 ${effectiveLayout === "media-bleed" ? "md:!pr-4" : ""}`}>
        <Pill
          variant="badge"
          label={badge.label}
          secondaryLabel={badge.secondaryLabel}
          icon={badge.icon}
          bg="var(--promo-badge-bg)"
          fg="var(--promo-badge-fg)"
          iconColor="var(--promo-badge-icon)"
        />

        <div className="mt-3 min-w-0">
          <h3 className="line-clamp-2 text-[26px] font-bold leading-[1.15] tracking-[-0.01em]" style={{ color: "var(--promo-title)" }}>
            {title}
          </h3>
          {highlight && (
            <p className="text-[36px] font-extrabold leading-[1.05] tracking-[-0.01em]" style={{ color: "var(--promo-title)" }}>
              {highlight}
            </p>
          )}
        </div>

        {subtitle && (
          <p className="mt-2 line-clamp-2 text-[18px] font-medium leading-snug" style={{ color: "var(--promo-text)" }}>
            {subtitle}
          </p>
        )}
        {description && (
          <p className="mt-2 line-clamp-2 text-sm leading-snug" style={{ color: "var(--promo-text)" }}>
            {description}
          </p>
        )}

        <div className="mt-auto flex items-end gap-3 pt-4">
          <IconButton
            icon="arrow-right"
            size="lg"
            bg="var(--promo-cta-bg)"
            fg="var(--promo-cta-fg)"
            ariaLabel={ctaLabel}
            className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          />
          {tag && <Pill variant="tag" label={tag} bg="var(--promo-tag-bg)" fg="var(--promo-tag-fg)" />}
          {effectiveLayout === "text" && price && (
            <Price {...price} layout="stacked" size="lg" color="var(--promo-accent)" oldColor="var(--promo-text)" className="ml-auto" />
          )}
        </div>
      </div>

      {hasMedia && media && effectiveLayout !== "text" && (
        <div
          className={`relative order-first h-[150px] w-full shrink-0 overflow-hidden md:order-none md:h-auto md:w-[40%] ${
            effectiveLayout === "media-framed"
              ? "md:my-6 md:mr-3 md:aspect-[var(--promo-ratio)] md:self-center md:rounded-2xl"
              : "md:self-stretch"
          }`}
          style={
            effectiveLayout === "media-framed"
              ? ({ "--promo-ratio": (media.ratio ?? "4/3").replace("/", " / ") } as CSSProperties)
              : undefined
          }
        >
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes="(min-width: 768px) 250px, 85vw"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
          {stickers?.map((sticker, index) => (
            <Sticker
              key={index}
              shape={sticker.shape}
              anchor={sticker.anchor}
              rotate={sticker.rotate}
              price={sticker.price}
              value={sticker.value}
              caption={sticker.caption}
              bg={sticker.color === "promo-orange" ? "var(--color-promo-orange)" : "var(--color-promo-red)"}
            />
          ))}
        </div>
      )}
    </Link>
  );
}
