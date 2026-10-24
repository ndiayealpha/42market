"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { Icon } from "@/src/components/atoms/Icon/Icon";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Nothing like this existed before (Phase 0 audit) — new primitive.
 * Focus trap + Escape-to-close + backdrop click, built with no new
 * dependency. Used by the delete-account confirmation and the order
 * tracking / QR dialog.
 */
export function Dialog({ open, onClose, title, children, className = "" }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = "dialog-title";

  useEffect(() => {
    if (!open) return;

    const dialogNode = dialogRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusable = dialogNode?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    focusable?.[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div aria-hidden onClick={onClose} className="absolute inset-0 bg-foreground-strong/50" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative w-full max-w-sm rounded-2xl bg-surface p-6 shadow-card ${className}`}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-lg font-bold text-foreground-strong">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="shrink-0 rounded-full p-1 text-muted-foreground hover:bg-catalog-chip hover:text-foreground-strong"
          >
            <Icon name="close" size={18} decorative />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
