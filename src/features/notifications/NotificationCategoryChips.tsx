import { FilterChip } from "@/src/components/atoms/FilterChip/FilterChip";
import type { NotificationCategory, NotificationCategoryCount } from "@/src/domain/notifications";
import { NOTIFICATION_CATEGORY_CONFIG } from "@/src/domain/notifications";

export interface NotificationCategoryChipsProps {
  active: NotificationCategory | "all";
  totalCount: number;
  byCategory: NotificationCategoryCount[];
  getCategoryHref: (category: NotificationCategory | "all") => string;
}

/** N3 — counts follow the active Toutes/Non lues filter (rule: "ils suivent le filtre"), passed in already computed by the view. */
export function NotificationCategoryChips({ active, totalCount, byCategory, getCategoryHref }: NotificationCategoryChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <FilterChip href={getCategoryHref("all")} label={`Toutes ${totalCount}`} isActive={active === "all"} />
      {byCategory.map(({ category, total }) => (
        <FilterChip
          key={category}
          href={getCategoryHref(category)}
          label={`${NOTIFICATION_CATEGORY_CONFIG[category].label} ${total}`}
          icon={NOTIFICATION_CATEGORY_CONFIG[category].icon}
          isActive={active === category}
        />
      ))}
    </div>
  );
}
