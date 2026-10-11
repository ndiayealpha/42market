"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/src/stories/Button";
import { useSession } from "@/src/features/auth";
import { routes } from "@/src/lib/routing/routes";

const NAV_LINKS = [
  { href: routes.main.home, label: "Dashboard" },
  { href: routes.main.profile, label: "Profile" },
  { href: routes.main.settings, label: "Settings" },
];

export function MainNav() {
  const pathname = usePathname();
  const session = useSession();

  return (
    <nav aria-label="Main navigation" className="flex items-center justify-between border-b p-4">
      <ul className="flex gap-4">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="font-medium data-[current]:underline"
              data-current={pathname === link.href ? "" : undefined}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        {session.user && <span>{session.user.name}</span>}
        <Button
          size="small"
          label={session.isLoading ? "Logging out…" : "Log out"}
          onClick={() => session.logout()}
        />
      </div>
    </nav>
  );
}
