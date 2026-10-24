import type { ReactNode } from "react";

import { Button } from "@/src/components/atoms/Button/Button";

export interface AsyncSectionProps {
  /** Shaped after `useQuery`'s own flags — no redundant `status` enum re-derived from them. */
  isLoading: boolean;
  isError: boolean;
  isEmpty?: boolean;
  skeleton: ReactNode;
  onRetry?: () => void;
  children: ReactNode;
}

/** Loading → exact-dimension skeleton (no CLS). Error → message + retry. Empty → nothing (the section header still shows, since this wraps only the section's body). Otherwise → the real content. */
export function AsyncSection({ isLoading, isError, isEmpty, skeleton, onRetry, children }: AsyncSectionProps) {
  if (isLoading) return <>{skeleton}</>;

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <p className="text-sm text-ink-muted">Une erreur est survenue.</p>
        {onRetry && (
          <Button variant="soft" onClick={onRetry}>
            Réessayer
          </Button>
        )}
      </div>
    );
  }

  if (isEmpty) return null;

  return <>{children}</>;
}
