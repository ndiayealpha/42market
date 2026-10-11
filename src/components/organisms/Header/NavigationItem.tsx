"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/src/components/atoms/Badge/Badge";
import { Icon } from "@/src/components/atoms/Icon/Icon";

import type { NavigationItemConfig } from "./Header.types";

export function NavigationItem({ item }: { item: NavigationItemConfig }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-medium transition-colors ${
        isActive ? "text-foreground underline underline-offset-4" : "text-foreground/80 hover:text-foreground"
      }`}
    >
      {item.label}
      {item.suffix === "fire" && <span aria-hidden>🔥</span>}
      {item.suffix === "new" && <Badge color="info">New</Badge>}
      {item.suffix === "chevron" && <Icon name="chevron-down" size={14} decorative />}
    </Link>
  );
}
