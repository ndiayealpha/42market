"use client";

import { useEffect, useRef } from "react";

import { Button } from "@/src/components/atoms/Button/Button";
import { formatPlaceOrderError, type PlaceOrderError } from "@/src/domain/checkout";
import { formatPrice } from "@/src/lib/format";

export interface ConfirmOrderButtonProps {
  totalAmount: number;
  /** True when store/slot/payment aren't all resolved — in practice this mostly gates on "a slot is selected" (store always resolves once the cart has one, payment always has a default). */
  disabled: boolean;
  isPending: boolean;
  error?: PlaceOrderError;
  onConfirm: () => void;
}

const HELP_TEXT_ID = "confirm-order-help";

/** K8 — the mutation itself (`usePlaceOrder`) is wired in `CheckoutView`, not here; this is a controlled leaf so its disabled/pending/error states are directly testable in Storybook without mocking a network call. */
export function ConfirmOrderButton({ totalAmount, disabled, isPending, error, onConfirm }: ConfirmOrderButtonProps) {
  const alertRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (error) alertRef.current?.focus();
  }, [error]);

  const isDisabled = disabled || isPending;

  return (
    <div>
      {error && (
        <p
          ref={alertRef}
          role="alert"
          tabIndex={-1}
          className="mb-3 rounded-xl bg-danger/10 p-3 text-sm font-semibold text-danger focus:outline-none"
        >
          {formatPlaceOrderError(error)}
        </p>
      )}
      <Button
        type="button"
        variant="primary-lg"
        disabled={isDisabled}
        aria-describedby={disabled && !isPending ? HELP_TEXT_ID : undefined}
        onClick={onConfirm}
      >
        {isPending ? "Confirmation en cours…" : `Confirmer la commande ${formatPrice(totalAmount)} →`}
      </Button>
      {disabled && (
        <p id={HELP_TEXT_ID} className="sr-only">
          Choisissez un créneau de retrait pour confirmer votre commande.
        </p>
      )}
      <p className="mt-2 text-center text-xs text-muted-foreground">🔒 Protocole SSL 256 bits • Engagement circuit-court Loire 42</p>
    </div>
  );
}
