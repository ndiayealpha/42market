import type { ReactNode } from "react";

export interface LoginHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
}

/** Small eyebrow label + heading + subtitle above the login form. */
export function LoginHeader({ eyebrow, title, subtitle }: LoginHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      {eyebrow && (
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-auth-ink-muted [@media(max-height:720px)]:hidden">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-foreground" />
          {eyebrow}
        </p>
      )}
      <h1 className="text-[clamp(24px,3.4vh,30px)] font-bold leading-tight tracking-[-0.02em] text-auth-ink">{title}</h1>
      {subtitle && (
        <p className="line-clamp-2 max-w-[490px] text-base leading-6 text-auth-ink-muted [@media(max-height:820px)]:text-sm">
          {subtitle}
        </p>
      )}
    </div>
  );
}
