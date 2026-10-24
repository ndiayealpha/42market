import Link from "next/link";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import { routes } from "@/src/lib/routing/routes";

export interface AddTerroirCardProps {
  suggestionLabel: string;
}

export function AddTerroirCard({ suggestionLabel }: AddTerroirCardProps) {
  return (
    <li>
      <Link
        href={routes.main.epiceries}
        className="flex h-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border p-6 text-center hover:border-foreground/40"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-catalog-chip">
          <Icon name="plus" size={18} decorative />
        </span>
        <span className="text-sm font-bold text-foreground-strong">Ajouter</span>
        <span className="text-xs text-muted-foreground">{suggestionLabel}</span>
      </Link>
    </li>
  );
}
