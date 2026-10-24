import { Button } from "@/src/components/atoms/Button/Button";
import { Icon } from "@/src/components/atoms/Icon/Icon";

export interface ReminderToggleButtonProps {
  enabled: boolean;
  disabled?: boolean;
  onToggle: () => void;
  className?: string;
}

/** S1's "🔔 Rappel activé" / "Activer le rappel" toggle — optimistic mutation lives in the caller's hook, this is purely presentational. Nothing like it existed before (Phase 0 audit). */
export function ReminderToggleButton({ enabled, disabled, onToggle, className = "" }: ReminderToggleButtonProps) {
  return (
    <Button
      variant={enabled ? "primary-md" : "soft"}
      aria-pressed={enabled}
      disabled={disabled}
      onClick={onToggle}
      icon={<Icon name="bell" size={16} decorative />}
      className={className}
    >
      {enabled ? "Rappel activé" : "Activer le rappel"}
    </Button>
  );
}
