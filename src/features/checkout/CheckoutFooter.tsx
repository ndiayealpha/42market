import { FooterBottom } from "@/src/components/organisms/Footer/FooterBottom";
import { LEGAL_LINKS } from "@/src/components/organisms/Footer/Footer.constants";

export interface CheckoutFooterProps {
  year: number;
}

/**
 * K10 — a lighter footer for Page K. Reuses the exact same legal link list
 * the global `Footer` uses (`Footer.constants`'s `LEGAL_LINKS`, which
 * already includes "CGV & Rétractation" and "Politique de
 * Confidentialité") and its `FooterBottom` region as-is, so the two
 * footers can never disagree on a legal URL — no need to extend `Footer`
 * itself for this.
 */
export function CheckoutFooter({ year }: CheckoutFooterProps) {
  return (
    <footer className="mt-4">
      <FooterBottom year={year} legalLinks={LEGAL_LINKS} />
    </footer>
  );
}
