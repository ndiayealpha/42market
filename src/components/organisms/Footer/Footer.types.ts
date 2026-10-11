import type { IconName } from "@/src/components/atoms/Icon/Icon";
import type { FooterLink } from "@/src/components/molecules/FooterLinkGroup/FooterLinkGroup";

export interface TrustItemConfig {
  icon: IconName;
  title: string;
  description: string;
}

export interface FooterBrandConfig {
  description: string;
  address: string;
}

export interface FooterLinkGroupConfig {
  title: string;
  links: FooterLink[];
}

export interface LegalLink {
  label: string;
  href: string;
}
