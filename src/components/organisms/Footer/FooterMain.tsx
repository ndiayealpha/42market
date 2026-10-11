import { FooterLinkGroup } from "@/src/components/molecules/FooterLinkGroup/FooterLinkGroup";

import { FooterBrand } from "./FooterBrand";
import type { FooterBrandConfig, FooterLinkGroupConfig } from "./Footer.types";

export interface FooterMainProps {
  brand: FooterBrandConfig;
  linkGroups: FooterLinkGroupConfig[];
}

export function FooterMain({ brand, linkGroups }: FooterMainProps) {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
      <FooterBrand {...brand} />
      {linkGroups.map((group) => (
        <FooterLinkGroup key={group.title} {...group} />
      ))}
    </div>
  );
}
