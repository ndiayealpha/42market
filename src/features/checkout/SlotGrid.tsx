import type { PickupSlot } from "@/src/domain/checkout";

import { SlotCard } from "./SlotCard";

export interface SlotGridProps {
  slots: PickupSlot[];
  onSelect: (slotId: string) => void;
}

/** Responsive 3→2→1 column `radiogroup` of `SlotCard`s. */
export function SlotGrid({ slots, onSelect }: SlotGridProps) {
  return (
    <div role="radiogroup" aria-label="Créneaux de retrait" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {slots.map((slot) => (
        <SlotCard key={slot.id} slot={slot} onSelect={onSelect} />
      ))}
    </div>
  );
}
