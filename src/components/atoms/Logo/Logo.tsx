import Image from "next/image";
import Link from "next/link";

import { routes } from "@/src/lib/routing/routes";

interface LogoProps {
  href?: string;
  className?: string;
  /** "horizontal" (default): full wordmark. "compact": stacked icon + small label, for the mobile header. */
  variant?: "horizontal" | "compact";
}

/** Brand wordmark. Wraps the provided SVG asset; always links home. */
export function Logo({ href = routes.main.home, className = "", variant = "horizontal" }: LogoProps) {
  if (variant === "compact") {
    return (
      <Link
        href={href}
        aria-label="42 Markets, retour à l'accueil"
        className={`inline-flex flex-col items-center gap-0.5 text-foreground-strong ${className}`}
      >
        <Image src="/logo-mark.svg" alt="" width={36} height={33} priority className="h-7 w-auto" />
        <span className="text-[10px] font-semibold leading-none tracking-wide">42markets</span>
      </Link>
    );
  }

  return (
    <Link href={href} aria-label="42 Markets, retour à l'accueil" className={`inline-flex text-foreground-strong ${className}`}>
      <Image src="/logo.svg" alt="" width={170} height={33} priority className="h-auto w-[130px] sm:w-[150px]" />
    </Link>
  );
}
