"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Avatar } from "@/src/components/atoms/Avatar/Avatar";
import { Divider } from "@/src/components/atoms/Divider/Divider";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { routes } from "@/src/lib/routing/routes";
import { useSession } from "@/src/features/auth";

export interface UserMenuProps {
  name: string;
  tier?: string;
  avatarSrc?: string;
}

/**
 * Signed-in user summary in the header, expanding into the account menu
 * (Profile / Settings / Log out) — the only place those are reachable
 * from since the header replaced the authenticated app's own nav bar.
 */
export function UserMenu({ name, tier, avatarSrc }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const session = useSession();

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

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 text-left"
      >
        <Avatar src={avatarSrc} name={name} size={36} />
        <span className="hidden flex-col leading-tight sm:flex">
          <span className="text-sm font-semibold text-foreground">{name}</span>
          {tier && <span className="text-xs text-success">{tier}</span>}
        </span>
        <Icon name="chevron-down" size={16} className="text-muted-foreground" />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Menu du compte"
          className="absolute right-0 top-full z-20 mt-2 w-48 rounded-xl border border-border bg-surface p-1 shadow-lg"
        >
          <Link
            href={routes.main.profile}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-background"
          >
            Profile
          </Link>
          <Link
            href={routes.main.settings}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-background"
          >
            Settings
          </Link>
          <Divider className="my-1" />
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              session.logout();
            }}
            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-danger hover:bg-background"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
