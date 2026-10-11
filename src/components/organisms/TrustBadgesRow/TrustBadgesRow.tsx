import { TrustBadge, type TrustBadgeProps } from "@/src/components/atoms/TrustBadge/TrustBadge";

export interface TrustBadgesRowProps {
  items: TrustBadgeProps[];
  className?: string;
}

/** A centered row of `TrustBadge`s, separated by thin dividers — signup's SSL/RGPD/circular-economy footer. */
export function TrustBadgesRow({ items, className = "" }: TrustBadgesRowProps) {
  return (
    <div className={`flex flex-wrap items-center justify-center divide-x divide-auth-tab-bg ${className}`}>
      {items.map((item) => (
        <div key={item.label} className="px-4 first:pl-0 last:pr-0">
          <TrustBadge {...item} />
        </div>
      ))}
    </div>
  );
}
