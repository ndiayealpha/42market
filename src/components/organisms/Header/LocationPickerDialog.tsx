"use client";

import { useState } from "react";

import { Button } from "@/src/components/atoms/Button/Button";
import { SegmentedControl } from "@/src/components/atoms/SegmentedControl/SegmentedControl";
import { Dialog } from "@/src/components/molecules/Dialog/Dialog";
import { FormField } from "@/src/components/molecules/FormField/FormField";
import { RADIUS_OPTIONS_KM, formatRadiusLabel, isValidFrenchPostalCode } from "@/src/domain/user-location";

export interface LocationPickerDialogProps {
  open: boolean;
  onClose: () => void;
  postalCode: string;
  radiusKm: number;
  onApply: (postalCode: string, radiusKm: number) => void;
}

/**
 * The header's "42000, FR · Rayon 3 km" pill used to open nothing —
 * `onLocationClick` was threaded all the way down to `Header` but no page
 * ever supplied a handler. This is that handler's UI: a code postal +
 * radius picker, backed by `useUserLocationState`/`Actions`
 * (`location.store.ts`). No real geocoding exists in this app, so the
 * postal code is a plain validated text field, not an address
 * autocomplete.
 *
 * Caller must remount this on every open (e.g. `key={open}` in
 * `HeaderLive`), not just toggle `open` — `draftPostalCode`/`draftRadiusKm`
 * snapshot `postalCode`/`radiusKm` once via `useState`'s initial value,
 * which would otherwise go stale across the zustand store's async
 * `sessionStorage` rehydration (not guaranteed done by this component's
 * first mount). Resyncing in a `useEffect` instead is exactly the
 * set-state-in-an-effect anti-pattern the project's lint config forbids.
 */
export function LocationPickerDialog({ open, onClose, postalCode, radiusKm, onApply }: LocationPickerDialogProps) {
  const [draftPostalCode, setDraftPostalCode] = useState(postalCode);
  const [draftRadiusKm, setDraftRadiusKm] = useState(radiusKm);
  const [error, setError] = useState<string | undefined>(undefined);

  function handleApply() {
    if (!isValidFrenchPostalCode(draftPostalCode)) {
      setError("Entrez un code postal à 5 chiffres.");
      return;
    }
    onApply(draftPostalCode.trim(), draftRadiusKm);
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} title="Votre position" className="max-w-md">
      <div className="flex flex-col gap-5">
        <FormField
          label="Code postal"
          placeholder="42000"
          inputMode="numeric"
          value={draftPostalCode}
          onChange={(event) => setDraftPostalCode(event.target.value)}
          error={error}
        />

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">Rayon de recherche</span>
          <SegmentedControl
            ariaLabel="Rayon de recherche"
            value={String(draftRadiusKm)}
            onChange={(value) => setDraftRadiusKm(Number(value))}
            options={RADIUS_OPTIONS_KM.map((km) => ({ value: String(km), label: `${km} km` }))}
            className="flex-wrap"
          />
          <p className="text-xs text-muted-foreground">{formatRadiusLabel(draftRadiusKm)} autour de ce code postal.</p>
        </div>

        <Button variant="primary-lg" type="button" onClick={handleApply}>
          Appliquer
        </Button>
      </div>
    </Dialog>
  );
}
