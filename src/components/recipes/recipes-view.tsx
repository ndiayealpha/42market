import { Icon } from "@/src/components/atoms/Icon/Icon";

/** Placeholder — same pattern as the former search placeholder (now replaced by the real Page R), for the "Recettes" tab. */
export function RecipesView() {
  return (
    <section className="flex flex-col items-center gap-3 p-10 text-center">
      <Icon name="cooking" size={32} className="text-muted-foreground" decorative />
      <h1 className="text-xl font-semibold text-foreground-strong">Recettes</h1>
      <p className="max-w-sm text-sm text-muted-foreground">Bientôt disponible : des idées de recettes avec les produits de vos commerçants.</p>
    </section>
  );
}
