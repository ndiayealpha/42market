import { Icon } from "@/src/components/atoms/Icon/Icon";
import { Logo } from "@/src/components/atoms/Logo/Logo";

import type { FooterBrandConfig } from "./Footer.types";

export function FooterBrand({ description, address }: FooterBrandConfig) {
  return (
    <div className="flex max-w-xs flex-col gap-4">
      <Logo />
      <p className="text-sm text-muted-foreground">{description}</p>
      <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Icon name="location" size={16} className="shrink-0 text-muted-foreground" />
        {address}
      </p>
    </div>
  );
}
