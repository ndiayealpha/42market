import Link from "next/link";

import { Icon } from "@/src/components/atoms/Icon/Icon";

import type { LegalLink } from "./Footer.types";

export interface FooterBottomProps {
  year: number;
  legalLinks: LegalLink[];
}

export function FooterBottom({ year, legalLinks }: FooterBottomProps) {
  return (
    <div className="bg-footer text-footer-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2">
          <Icon name="store" size={14} decorative />
          42 Markets © {year}. Tous droits réservés — Le réseau des épiceries exotiques indépendantes
        </p>
        <ul className="flex flex-wrap items-center gap-4">
          {legalLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
