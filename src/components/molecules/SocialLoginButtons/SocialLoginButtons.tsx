"use client";

import type { CSSProperties } from "react";

import { SocialButton } from "@/src/components/molecules/SocialButton/SocialButton";

// Real brand colors and a plain white pill — an inline style (not Tailwind
// classes) so it can't lose a specificity race against the shared
// storybook-button.css rules (pill radius, disabled opacity).
const SOCIAL_BUTTON_STYLE: CSSProperties = {
  backgroundColor: "#ffffff",
  color: "var(--auth-ink)",
  border: "1px solid var(--auth-input-border)",
  borderRadius: 10,
  height: "clamp(38px, 4.8vh, 44px)",
  fontSize: 15,
  fontWeight: 500,
  opacity: 1,
  justifyContent: "center",
};

/**
 * Google / Apple sign-in buttons. Disabled on purpose: no OAuth provider
 * is wired up yet, and a working-looking button that silently does
 * nothing would be worse than an honestly disabled one. They still look
 * fully enabled — the "coming soon" info moved to a hover tooltip.
 */
export function SocialLoginButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <SocialButton
        provider="google"
        label="Google"
        disabled
        title="Connexion Google bientôt disponible"
        style={SOCIAL_BUTTON_STYLE}
      />
      <SocialButton
        provider="apple"
        label="Apple"
        disabled
        title="Connexion Apple bientôt disponible"
        style={SOCIAL_BUTTON_STYLE}
      />
    </div>
  );
}
