import Link from "next/link";

import { Badge } from "@/src/components/atoms/Badge/Badge";

export interface FooterLink {
  label: string;
  href: string;
  tag?: string;
}

export interface FooterLinkGroupProps {
  title: string;
  links: FooterLink[];
}

/** One footer column: a title and its list of links. Used 3× in FooterMain. */
export function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground">
              {link.label}
              {link.tag && (
                <Badge color="success" className="normal-case">
                  {link.tag}
                </Badge>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
