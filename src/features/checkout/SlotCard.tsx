import { Icon } from "@/src/components/atoms/Icon/Icon";
import { formatPickupSlotLabel, type PickupSlot } from "@/src/domain/checkout";

export interface SlotCardProps {
  slot: PickupSlot;
  onSelect: (slotId: string) => void;
}

function getSlotCopy(slot: PickupSlot): { title: string; subtitle?: string } {
  switch (slot.kind) {
    case "window":
      return { title: formatPickupSlotLabel(slot) };
    case "express":
      return { title: "Prêt express", subtitle: `Commande bloquée ${slot.lockedAfterMinutes} min après l'heure` };
    default: {
      const exhaustive: never = slot;
      throw new Error(`Unhandled pickup slot: ${JSON.stringify(exhaustive)}`);
    }
  }
}

/** One radio-like tile inside `SlotGrid`'s `radiogroup` — availability is never color-only: the status line is always real text ("● Disponible" / "◔ Sélectionné" / the domain's own `unavailableReason`). */
export function SlotCard({ slot, onSelect }: SlotCardProps) {
  const isUnavailable = slot.status === "unavailable";
  const isSelected = slot.status === "selected";
  const { title, subtitle } = getSlotCopy(slot);
  const isLastSlot = slot.kind === "window" && slot.isLastSlot && !isUnavailable;
  const isRecommended = slot.kind === "window" && slot.isRecommended;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      aria-disabled={isUnavailable || undefined}
      disabled={isUnavailable}
      onClick={() => !isUnavailable && onSelect(slot.id)}
      className={`flex flex-col items-start gap-1 rounded-xl p-3 text-left transition-colors ${
        isUnavailable
          ? "cursor-not-allowed bg-catalog-chip/60 text-muted-foreground"
          : isSelected
            ? "bg-foreground-strong text-white"
            : "bg-catalog-chip text-foreground-strong hover:brightness-95"
      }`}
    >
      {isRecommended && (
        <span className="rounded bg-catalog-badge-cream px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-foreground-strong">
          Conseillé
        </span>
      )}
      <span className="flex items-center gap-1.5 text-sm font-bold">
        {isUnavailable && <Icon name="lock" size={14} decorative />}
        {title}
      </span>
      {subtitle && <span className="text-xs opacity-80">{subtitle}</span>}
      {isLastSlot && <span className="text-xs font-semibold">● Dernier créneau</span>}
      <span className="flex items-center gap-1 text-xs font-semibold">
        {isSelected && <Icon name="check-circle" size={12} decorative />}
        {isUnavailable ? slot.unavailableReason : isSelected ? "◔ Sélectionné" : "● Disponible"}
      </span>
    </button>
  );
}
