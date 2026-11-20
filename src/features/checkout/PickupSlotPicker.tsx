"use client";

import { useEffect, useMemo, useState } from "react";

import { Section } from "@/src/components/layout/Section/Section";
import { applySlotSelection, type PickupSlot } from "@/src/domain/checkout";
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

/** The next chronologically-available window slot on the same day, at or after `afterStartIso` — express slots aren't ordered against window slots, so they're not a candidate here (M3). */
function findNextAvailableSlotId(daySlots: PickupSlot[], afterStartIso: string | undefined): string | undefined {
  const afterStart = afterStartIso ? new Date(afterStartIso).getTime() : -Infinity;
  const candidates = daySlots
    .filter((slot): slot is Extract<PickupSlot, { kind: "window" }> => slot.kind === "window")
    .filter((slot) => slot.status === "available" && new Date(slot.startIso).getTime() >= afterStart)
    .sort((a, b) => new Date(a.startIso).getTime() - new Date(b.startIso).getTime());
  return candidates[0]?.id;
}

/**
 * K4 (`id="moment-choisi"`) — `DayTabs` + `SlotGrid` composed together.
 * `now` ticks every minute (M3: "recalcul automatique toutes les
 * minutes") so a slot that quietly expires mid-session (its end passes,
 * or there's no longer enough lead time to prepare it) is re-evaluated
 * without the visitor having to reload or interact.
 */
export function PickupSlotPicker({ now, store, selectedSlotId, onSelectSlot, initialDateIso }: PickupSlotPickerProps) {
  const [liveNow, setLiveNow] = useState(now);
  useEffect(() => {
    const id = setInterval(() => setLiveNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const days = useMemo(() => buildPickupDays(liveNow, store.openingHours), [liveNow, store.openingHours]);
  const [selectedDateIso, setSelectedDateIso] = useState(() => initialDateIso ?? days[0]?.dateIso ?? "");

  const slotsByDay = useMemo(() => buildSlotsByDay(store, liveNow), [store, liveNow]);
  const allSlots = useMemo(() => Array.from(slotsByDay.values()).flat(), [slotsByDay]);
  const selectedSlot = selectedSlotId ? allSlots.find((slot) => slot.id === selectedSlotId) : undefined;
  const isSelectionInvalid = selectedSlotId !== undefined && selectedSlot?.status !== "available";
  const daySlotsOfSelection = selectedSlotId
    ? (Array.from(slotsByDay.values()).find((daySlots) => daySlots.some((slot) => slot.id === selectedSlotId)) ?? [])
    : [];
  const nextAvailableSlotId = isSelectionInvalid
    ? findNextAvailableSlotId(daySlotsOfSelection, selectedSlot?.kind === "window" ? selectedSlot.startIso : undefined)
    : undefined;

  // Render-time state adjustment on the false→true transition (React's
  // documented pattern — see "You Might Not Need an Effect" — rather than a
  // `useEffect` + `setState`, which the project's lint rules flag as a
  // cascading-render risk). The message is set once when the selection
  // becomes invalid and is otherwise only cleared by the user picking a new
  // slot (`onSelect` below) — it must NOT reset just because the effect
  // below changes `selectedSlotId`, which would also flip
  // `isSelectionInvalid` back to `false` and erase the message before
  // anyone could read it.
  const [wasSelectionInvalid, setWasSelectionInvalid] = useState(false);
  const [invalidationMessage, setInvalidationMessage] = useState<string>();
  if (isSelectionInvalid !== wasSelectionInvalid) {
    setWasSelectionInvalid(isSelectionInvalid);
    if (isSelectionInvalid) {
      setInvalidationMessage(
        nextAvailableSlotId
          ? "Votre créneau n'est plus disponible : nous avons sélectionné le suivant pour vous."
          : "Votre créneau n'est plus disponible, merci d'en choisir un autre."
      );
    }
  }

  // M3: deselect the expired/too-soon slot AND select the next available
  // one on the same day, rather than leaving the visitor with nothing
  // picked.
  useEffect(() => {
    if (isSelectionInvalid) {
      onSelectSlot(nextAvailableSlotId);
    }
  }, [isSelectionInvalid, nextAvailableSlotId, onSelectSlot]);

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
