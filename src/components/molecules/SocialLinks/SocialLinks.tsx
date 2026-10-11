import Link from "next/link";

import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

const DEFAULT_LINKS: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "TikTok", href: "https://tiktok.com", icon: "tiktok" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
];

export interface SocialLinksProps {
  links?: SocialLink[];
  /** "outline" (default): desktop's bordered ring. "filled": mobile's pale-pink filled circle. */
  variant?: "outline" | "filled";
}

const VARIANT_CLASSES: Record<NonNullable<SocialLinksProps["variant"]>, string> = {
  outline: "h-9 w-9 border border-foreground text-foreground hover:bg-foreground hover:text-surface",
  filled: "h-12 w-12 bg-surface-subtle text-foreground-strong hover:opacity-80",
};

/** Row of circular social network links. Each is a real, labelled link. */
export function SocialLinks({ links = DEFAULT_LINKS, variant = "outline" }: SocialLinksProps) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            aria-label={link.label}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center rounded-full transition-colors ${VARIANT_CLASSES[variant]}`}
          >
            <Icon name={link.icon} size={variant === "filled" ? 20 : 18} decorative />
          </Link>
        </li>
      ))}
    </ul>
  );
}
