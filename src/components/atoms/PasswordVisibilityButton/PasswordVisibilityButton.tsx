import { Icon } from "@/src/components/atoms/Icon/Icon";

export interface PasswordVisibilityButtonProps {
  visible: boolean;
  onToggle: () => void;
}

/**
 * Purely visual: shows an eye / eye-off glyph for the current `visible`
 * state and reports a click. It never touches the password value or any
 * auth logic — that stays in whoever owns the state (PasswordField).
 */
export function PasswordVisibilityButton({ visible, onToggle }: PasswordVisibilityButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
      aria-pressed={visible}
      className="text-muted-foreground hover:text-foreground"
    >
      <Icon name={visible ? "eye-off" : "eye"} decorative />
    </button>
  );
}
