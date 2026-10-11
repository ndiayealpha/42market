import { TextLink } from "@/src/components/atoms/Link/Link";

export interface RegisterPromptProps {
  href: string;
}

export function RegisterPrompt({ href }: RegisterPromptProps) {
  return (
    <p className="text-center text-sm text-muted-foreground">
      {"Vous n'avez pas encore de compte ? "}
      <TextLink href={href}>Créer un compte</TextLink>
    </p>
  );
}
