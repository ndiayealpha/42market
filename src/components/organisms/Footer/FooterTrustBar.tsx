import { TrustItem } from "@/src/components/molecules/TrustItem/TrustItem";

import type { TrustItemConfig } from "./Footer.types";

export function FooterTrustBar({ items }: { items: TrustItemConfig[] }) {
  return (
    <div className="border-b border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-4 sm:flex-row sm:items-center sm:gap-0 sm:divide-x sm:divide-border sm:px-6">
        {items.map((item) => (
          <div key={item.title} className="sm:flex-1 sm:px-6 first:sm:pl-0 last:sm:pr-0">
            <TrustItem {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}
