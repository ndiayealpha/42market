import { Breadcrumb } from "@/src/components/atoms/Breadcrumb/Breadcrumb";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { routes } from "@/src/lib/routing/routes";

export interface CheckoutHeaderProps {
  /** Omitted when literally no slot (window or express) is available today — see `hasExpressPromiseToday` in `CheckoutView` for the heuristic. */
  hasExpressPromise: boolean;
}

/** K1 — breadcrumb, H1, and the "under 2h" pastille. New composition, built from existing `Breadcrumb`/`Chip` atoms. */
export function CheckoutHeader({ hasExpressPromise }: CheckoutHeaderProps) {
  return (
    <header className="flex flex-col gap-3">
      <Breadcrumb items={[{ label: "Panier", href: routes.main.cart }, { label: "Finalisation Click & Collect" }]} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-[26px] leading-[35px] font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px]">
          Retrait Express en Épicerie
        </h1>
        {hasExpressPromise && (
          <Chip tone="success" size="sm" shape="pill" icon={<span aria-hidden>●</span>}>
            Créneau disponible sous 2h garanti
          </Chip>
        )}
      </div>
    </header>
  );
}
