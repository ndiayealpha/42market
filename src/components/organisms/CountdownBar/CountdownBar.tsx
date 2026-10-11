"use client";

import { useState } from "react";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import { IconButton } from "@/src/components/atoms/IconButton/IconButton";
import { Button } from "@/src/stories/Button";

import { useCountdown } from "./useCountdown";

/** Placeholder duration (6h40m32s, matching the design) used when no `targetDate` is given. */
const DEFAULT_DURATION_MS = (6 * 3600 + 40 * 60 + 32) * 1000;

export interface CountdownBarProps {
  /** Moment the countdown reaches zero. Defaults to "now + 6h40m32s" until a real campaign end-date is wired in. */
  targetDate?: Date;
  label?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  onClose?: () => void;
  className?: string;
}

function two(value: number): string {
  return value.toString().padStart(2, "0");
}

function TimeBlock({ value, unitLabel }: { value: number; unitLabel: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] font-semibold text-white/70">{unitLabel}</span>
      <span className="flex h-8 w-9 items-center justify-center rounded-lg bg-white/15 text-base font-bold tabular-nums text-white">
        {two(value)}
      </span>
    </div>
  );
}

/**
 * The "Temps restant" flash-sale bar: timer + 3 ticking digit blocks +
 * CTA, dismissible via its own close button. `useCountdown` owns the
 * ticking (separate from this file, like Carousel/useCarousel) so this
 * component only renders.
 */
export function CountdownBar({
  targetDate,
  label = "Temps restant",
  ctaLabel = "profiter maintenant",
  onCtaClick,
  onClose,
  className = "",
}: CountdownBarProps) {
  const [visible, setVisible] = useState(true);
  // Lazy initializer: computed once at mount, not on every render — the
  // sanctioned way to call an impure (time-based) default in React.
  const [defaultTarget] = useState(() => new Date(Date.now() + DEFAULT_DURATION_MS));
  const { hours, minutes, seconds } = useCountdown(targetDate ?? defaultTarget);

  if (!visible) return null;

  function handleClose() {
    setVisible(false);
    onClose?.();
  }

  return (
    <div
      role="group"
      aria-label={`${label} : offre à durée limitée`}
      className={`flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl bg-footer px-4 py-3 ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15">
          <Icon name="timer" size={16} className="text-white" />
        </span>
        <span className="text-sm font-semibold whitespace-nowrap text-white">{label}</span>
      </div>

      <div className="flex items-center gap-1.5">
        <TimeBlock value={hours} unitLabel="Heure" />
        <span className="pb-4 text-sm font-bold text-white/70">:</span>
        <TimeBlock value={minutes} unitLabel="Minutes" />
        <span className="pb-4 text-sm font-bold text-white/70">:</span>
        <TimeBlock value={seconds} unitLabel="Secondes" />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button
          size="small"
          label={ctaLabel}
          icon={<Icon name="basket" size={16} />}
          iconPosition="left"
          onClick={onCtaClick}
          style={{ backgroundColor: "var(--color-surface-subtle)", color: "var(--color-foreground-strong)" }}
        />
        <IconButton icon="close" size="md" bg="#FFFFFF" fg="var(--color-foreground-strong)" ariaLabel="Fermer" onClick={handleClose} />
      </div>
    </div>
  );
}
