"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Badge } from "@/src/components/atoms/Badge/Badge";
import { Icon } from "@/src/components/atoms/Icon/Icon";

import type { NavigationItemConfig } from "./Header.types";

export function NavigationItem({ item }: { item: NavigationItemConfig }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const [open, setOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ left: number; top: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasDropdown = item.suffix === "chevron" && item.dropdownItems && item.dropdownItems.length > 0;

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // The nav row scrolls horizontally (`overflow-x-auto` in `HeaderNavigation`),
  // which forces its vertical overflow to clip too — any `absolute` panel
  // nested inside it gets cut off at the row's bottom edge. Portaling to
  // `document.body` with a `fixed` position computed from the trigger's own
  // rect escapes that clip; it's tracked on scroll/resize while open so it
  // stays anchored under the trigger.
  useEffect(() => {
    if (!open) return;

    function updatePosition() {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) setMenuPosition({ left: rect.left, top: rect.bottom + 8 });
    }

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  const labelClasses = `inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-medium transition-colors ${
    isActive ? "text-foreground underline underline-offset-4" : "text-foreground/80 hover:text-foreground"
  }`;

  if (!hasDropdown) {
    return (
      <Link href={item.href} aria-current={isActive ? "page" : undefined} className={labelClasses}>
        {item.label}
        {item.suffix === "fire" && <span aria-hidden>🔥</span>}
        {item.suffix === "new" && <Badge color="info">New</Badge>}
        {item.suffix === "chevron" && <Icon name="chevron-down" size={14} decorative />}
      </Link>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button type="button" onClick={() => setOpen((value) => !value)} aria-haspopup="menu" aria-expanded={open} className={labelClasses}>
        {item.label}
        <Icon name="chevron-down" size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} decorative />
      </button>

      {open &&
        menuPosition &&
        createPortal(
          <div
            role="menu"
            aria-label={item.label}
            style={{ left: menuPosition.left, top: menuPosition.top }}
            className="fixed z-40 w-48 rounded-xl border border-border bg-surface p-1 shadow-lg"
          >
            {item.dropdownItems?.map((dropdownItem) => (
              <Link
                key={dropdownItem.href}
                href={dropdownItem.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-background"
              >
                {dropdownItem.label}
              </Link>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}
