import Link from "next/link";

import { Icon } from "@/src/components/atoms/Icon/Icon";

export interface StoreRegistrationButtonProps {
  href: string;
}

export function StoreRegistrationButton({ href }: StoreRegistrationButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground hover:bg-border"
    >
      <Icon name="store" size={16} decorative />
      Inscrire son épicerie
    </Link>
  );
}
