import Image from "next/image";
import Link from "next/link";

import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";

export interface InfoCardProps {
  title: string;
  description: string;
  href?: string;
  /** Leading visual: a small photo (use this) or an icon — not both. */
  imageSrc?: string;
  icon?: IconName;
  trailingIcon?: IconName;
  tone?: "neutral" | "accent" | "merchant";
}

const TONE_BACKGROUND: Record<NonNullable<InfoCardProps["tone"]>, string> = {
  neutral: "bg-auth-card-tint",
  accent: "bg-auth-card-cream",
  merchant: "bg-auth-card-merchant/30",
};

const TONE_ICON_CIRCLE: Record<NonNullable<InfoCardProps["tone"]>, string> = {
  neutral: "bg-foreground",
  accent: "bg-foreground",
  merchant: "bg-foreground-strong",
};

const TONE_TRAILING_ICON: Record<NonNullable<InfoCardProps["tone"]>, string> = {
  neutral: "text-foreground",
  accent: "text-auth-ink",
  merchant: "text-foreground-strong",
};

/** Small promo/info row: a leading visual, a title + description, an optional trailing icon. */
export function InfoCard({ title, description, href, imageSrc, icon, trailingIcon, tone = "neutral" }: InfoCardProps) {
  const content = (
    <div
      className={`flex items-center gap-3 rounded-[10px] p-4 [@media(max-height:820px)]:p-[10px_14px] ${TONE_BACKGROUND[tone]}`}
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          alt=""
          width={48}
          height={48}
          className="h-12 w-12 shrink-0 rounded-[6px] object-cover [@media(max-height:820px)]:h-10 [@media(max-height:820px)]:w-10"
        />
      )}
      {icon && (
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white ${TONE_ICON_CIRCLE[tone]}`}>
          <Icon name={icon} size={16} decorative />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-auth-ink">{title}</p>
        <p className="truncate text-xs text-auth-ink-muted">{description}</p>
      </div>
      {trailingIcon && <Icon name={trailingIcon} size={20} className={`shrink-0 ${TONE_TRAILING_ICON[tone]}`} decorative />}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
