import type { NewsletterFormProps } from "@/src/components/molecules/NewsletterForm/NewsletterForm";

import { DISCOVER_LINKS, FOOTER_BRAND, LEGAL_LINKS, MERCHANT_LINKS, SUPPORT_LINKS, TRUST_ITEMS } from "./Footer.constants";
import { FooterBottom } from "./FooterBottom";
import { FooterCommunity } from "./FooterCommunity";
import { FooterMain } from "./FooterMain";
import { FooterMobile } from "./FooterMobile";
import { FooterTrustBar } from "./FooterTrustBar";

export interface FooterProps {
  onSubscribe?: NewsletterFormProps["onSubscribe"];
  year?: number;
}

/**
 * Site-wide footer. Desktop's existing regions (trust bar, columns,
 * community, bottom bar) render unchanged above `md`; `FooterMobile`
 * takes over below it, built from the exact same constants so nothing
 * is duplicated — only how it's laid out differs.
 */
export function Footer({ onSubscribe, year = new Date().getFullYear() }: FooterProps) {
  return (
    <footer className="bg-surface">
      <div className="hidden md:block">
        <FooterTrustBar items={TRUST_ITEMS} />
        <FooterMain brand={FOOTER_BRAND} linkGroups={[DISCOVER_LINKS, SUPPORT_LINKS, MERCHANT_LINKS]} />
        <FooterCommunity onSubscribe={onSubscribe} />
        <FooterBottom year={year} legalLinks={LEGAL_LINKS} />
      </div>
      <div className="md:hidden">
        <FooterMobile onSubscribe={onSubscribe} year={year} />
      </div>
    </footer>
  );
}
