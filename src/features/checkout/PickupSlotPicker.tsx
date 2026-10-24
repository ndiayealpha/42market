"use client";

import { useEffect, useMemo, useState } from "react";

import { Section } from "@/src/components/layout/Section/Section";
import { applySlotSelection } from "@/src/domain/checkout";
import type { StoreDetail } from "@/src/domain/store-detail";

import { ConsigneNotice } from "./ConsigneNotice";
import { DayTabs } from "./DayTabs";
import { buildPickupDays } from "./pickup-schedule";
import { SlotGrid } from "./SlotGrid";
import { buildSlotsByDay } from "./slot-params";

export interface PickupSlotPickerProps {
  now: Date;
  store: StoreDetail;
  selectedSlotId: string | undefined;
  /** `undefined` both clears the selection and covers the "selection just got invalidated" case — see `isSelectionInvalid` below. */
  onSelectSlot: (slotId: string | undefined) => void;
  /** Storybook-only override (e.g. to land on a future day where express is never available) — real usage always starts on today. */
  initialDateIso?: string;
}

/**
 * K4 (`id="moment-choisi"`) — `DayTabs` + `SlotGrid` composed together.
 * Re-validates the current selection on every render that could change it
 * (mount, `now`, or the selection itself) rather than running a polling
 * timer: per the brief, "recomputing on mount/interaction is enough" for a
 * demo — a slot that quietly expires mid-session without any interaction
 * won't self-correct until the next one, a deliberate, documented trim.
 */
export function PickupSlotPicker({ now, store, selectedSlotId, onSelectSlot, initialDateIso }: PickupSlotPickerProps) {
  const days = useMemo(() => buildPickupDays(now, store.openingHours), [now, store.openingHours]);
  const [selectedDateIso, setSelectedDateIso] = useState(() => initialDateIso ?? days[0]?.dateIso ?? "");

  const slotsByDay = useMemo(() => buildSlotsByDay(store, now), [store, now]);
  const allSlots = useMemo(() => Array.from(slotsByDay.values()).flat(), [slotsByDay]);
  const selectedSlot = selectedSlotId ? allSlots.find((slot) => slot.id === selectedSlotId) : undefined;
  // `now` never ticks in this app (no polling timer, per the brief's own
  // trim), so in practice a slot can't spontaneously expire mid-session —
  // this only guards the case where `selectedSlotId` itself changes to
  // something that's no longer bookable (e.g. a future enhancement that
  // does refresh `now`), kept for correctness rather than to cover a path
  // that's reachable today.
  const isSelectionInvalid = selectedSlotId !== undefined && selectedSlot?.status !== "available";

  // Render-time state adjustment on the false→true transition (React's
  // documented pattern — see "You Might Not Need an Effect" — rather than a
  // `useEffect` + `setState`, which the project's lint rules flag as a
  // cascading-render risk). The message is set once when the selection
  // becomes invalid and is otherwise only cleared by the user picking a new
  // slot (`onSelect` below) — it must NOT reset just because the effect
  // below clears `selectedSlotId` back to `undefined`, which would also
  // flip `isSelectionInvalid` back to `false` and erase the message before
  // anyone could read it.
  const [wasSelectionInvalid, setWasSelectionInvalid] = useState(false);
  const [invalidationMessage, setInvalidationMessage] = useState<string>();
  if (isSelectionInvalid !== wasSelectionInvalid) {
    setWasSelectionInvalid(isSelectionInvalid);
    if (isSelectionInvalid) {
      setInvalidationMessage("Votre créneau n'est plus disponible, merci d'en choisir un autre.");
    }
  }

  useEffect(() => {
    if (isSelectionInvalid) {
      onSelectSlot(undefined);
    }
  }, [isSelectionInvalid, onSelectSlot]);

  const activeSlots = applySlotSelection(slotsByDay.get(selectedDateIso) ?? [], selectedSlotId);

  return (
    <Section id="moment-choisi" headingTabIndex={-1} title="Choisissez votre créneau de retrait">
      <div className="flex flex-col gap-4">
        <DayTabs days={days} selectedDateIso={selectedDateIso} onChange={setSelectedDateIso} />

        {invalidationMessage && (
          <p role="alert" aria-live="polite" className="text-sm font-semibold text-danger">
            {invalidationMessage}
          </p>
        )}

        <div role="tabpanel" id={`day-panel-${selectedDateIso}`} aria-labelledby={`day-tab-${selectedDateIso}`}>
          {activeSlots.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucun créneau disponible pour ce jour.</p>
          ) : (
            <SlotGrid
              slots={activeSlots}
              onSelect={(slotId) => {
                onSelectSlot(slotId);
                setInvalidationMessage(undefined);
              }}
            />
          )}
        </div>

        <ConsigneNotice storeName={store.name} />
      </div>
    </Section>
  );
}
