import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Divider } from "@/src/components/atoms/Divider/Divider";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import type { Promo } from "@/src/domain/store";

export interface PickupBarProps {
  minutes: number;
  promo?: Promo;
}

/** "Retrait {n} min" + an optional promo chip + a trailing chevron. Hover/chip-background and chevron-shift come from the parent card's `group`. */
export function PickupBar({ minutes, promo }: PickupBarProps) {
  return (
    <div className="flex h-[46px] items-center rounded-xl bg-surface-subtle px-3 transition-colors duration-150 ease-out motion-reduce:transition-none group-hover:bg-catalog-chip">
      <span className="flex shrink-0 items-center gap-1 whitespace-nowrap">
        <Icon name="basket" size={16} className="text-foreground-strong" />
        <span className="text-[13px] leading-[18px] font-bold text-foreground-strong">Retrait {minutes} min</span>
      </span>

      {promo && (
        <span className="flex min-w-0 items-center">
          <Divider orientation="vertical" className="mx-3.5 shrink-0 !bg-catalog-line-strong" />
          <Chip tone={promo.tone} size="sm" icon={promo.icon}>
            {promo.label}
          </Chip>
        </span>
      )}

      <Icon
        name="chevron-right"
        size={16}
        className="ml-auto shrink-0 text-foreground-strong transition-transform duration-150 ease-out motion-reduce:transition-none group-hover:translate-x-0.5"
      />
    </div>
  );
}
