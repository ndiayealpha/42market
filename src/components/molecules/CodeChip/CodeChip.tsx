"use client";

import { useState } from "react";

import { useToast } from "@/src/providers/toast-provider";

export interface CodeChipProps {
  code: string;
  className?: string;
}

/** A promo code chip that copies itself to the clipboard on click, announced by a toast (rule: "copie du code annoncée"). Nothing like it existed before (Phase 0 audit). */
export function CodeChip({ code, className = "" }: CodeChipProps) {
  const { show } = useToast();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Clipboard API unavailable (unsupported browser, no permission) — the toast still confirms the code to copy manually.
    }
    setCopied(true);
    show(`Code ${code} copié`, "success");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center rounded-md bg-catalog-badge-cream px-2 py-0.5 font-mono text-sm font-bold text-foreground-strong ${className}`}
    >
      <code>{code}</code>
      <span className="sr-only">{copied ? " (copié)" : " — copier le code"}</span>
    </button>
  );
}
