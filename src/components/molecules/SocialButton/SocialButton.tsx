import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";
import { Button, type ButtonProps } from "@/src/stories/Button";

export type SocialProvider = "google" | "apple";

export interface SocialButtonProps extends Omit<ButtonProps, "icon" | "iconPosition"> {
  provider: SocialProvider;
}

const PROVIDER_ICON: Record<SocialProvider, IconName> = { google: "google", apple: "apple" };

/**
 * One social sign-in button (icon + label), built on the shared `Button`
 * atom. Extracted so login ("Google") and signup ("Continuer avec
 * Google") can each render their own label/style around the same
 * provider glyph instead of two separately hand-rolled buttons.
 */
export function SocialButton({ provider, ...props }: SocialButtonProps) {
  return <Button icon={<Icon name={PROVIDER_ICON[provider]} decorative />} {...props} />;
}
