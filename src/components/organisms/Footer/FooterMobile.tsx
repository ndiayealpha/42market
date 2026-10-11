import Link from "next/link";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import { Logo } from "@/src/components/atoms/Logo/Logo";
import { FooterAccordion } from "@/src/components/molecules/FooterAccordion/FooterAccordion";
import { LegalCard } from "@/src/components/molecules/LegalCard/LegalCard";
import { NewsletterForm, type NewsletterFormProps } from "@/src/components/molecules/NewsletterForm/NewsletterForm";
import { SocialLinks } from "@/src/components/molecules/SocialLinks/SocialLinks";
import type { FooterLink } from "@/src/components/molecules/FooterLinkGroup/FooterLinkGroup";

import { DISCOVER_LINKS, FOOTER_BRAND, LEGAL_LINKS, MERCHANT_LINKS, SUPPORT_LINKS } from "./Footer.constants";

export interface FooterMobileProps {
  onSubscribe?: NewsletterFormProps["onSubscribe"];
  year?: number;
}

/** Plain link list for inside a FooterAccordion — the title is already the accordion's own trigger. */
function LinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="text-sm text-foreground/80">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Mobile footer: stacked brand block, link accordions (reusing the
 * exact same DISCOVER/SUPPORT/MERCHANT_LINKS data as the desktop
 * footer's columns — only the presentation differs), newsletter/social
 * cards, the minors-protection notice, and the legal bar. Rendered by
 * `Footer` below `md`; see Footer.tsx.
 */
export function FooterMobile({ onSubscribe, year = new Date().getFullYear() }: FooterMobileProps) {
  return (
    <div className="flex flex-col gap-6 bg-background px-4 py-8">
      <div className="flex flex-col gap-3">
        <Logo />
        <p className="text-sm text-muted-foreground">{FOOTER_BRAND.description}</p>
        <p className="flex items-center gap-2 text-sm font-semibold text-foreground-strong">
          <Icon name="location" size={16} className="shrink-0 text-muted-foreground" decorative />
          {FOOTER_BRAND.address}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <FooterAccordion title={DISCOVER_LINKS.title}>
          <LinkList links={DISCOVER_LINKS.links} />
        </FooterAccordion>
        <FooterAccordion title={SUPPORT_LINKS.title}>
          <LinkList links={SUPPORT_LINKS.links} />
        </FooterAccordion>
        <FooterAccordion title={MERCHANT_LINKS.title}>
          <LinkList links={MERCHANT_LINKS.links} />
        </FooterAccordion>
      </div>

      <div className="rounded-2xl bg-surface p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-foreground-strong">Restez informé des nouveautés</h3>
        <div className="mt-3">
          <NewsletterForm
            onSubscribe={onSubscribe}
            inputWrapperClassName="min-w-0 flex-1 rounded-xl bg-surface-subtle px-4 py-2"
            buttonStyle={{ backgroundColor: "var(--color-foreground-strong)", borderRadius: 10, fontWeight: 700 }}
          />
        </div>
      </div>

      <div className="rounded-2xl bg-surface p-4 shadow-sm">
        <h3 className="text-center text-sm font-semibold text-foreground-strong">Rejoignez la communauté 42 Markets</h3>
        <div className="mt-4">
          <SocialLinks variant="filled" />
        </div>
      </div>

      <LegalCard />

      <div className="flex flex-col items-center gap-2 pb-2 text-center text-xs text-muted-foreground">
        <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          {LEGAL_LINKS.map((link, index) => (
            <li key={link.href} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden>•</span>}
              <Link href={link.href} className="hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p>© 42 Markets {year}. Tous droits réservés — Le réseau des épiceries exotiques indépendantes de Saint-Étienne.</p>
      </div>
    </div>
  );
}
