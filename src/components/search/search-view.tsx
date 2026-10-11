import { Icon } from "@/src/components/atoms/Icon/Icon";

/**
 * Placeholder: this route exists so the mobile bottom nav's "Recherche"
 * tab has somewhere real to go. The actual search experience isn't
 * built yet — see Header.constants.ts's own note on the same pattern.
 */
export function SearchView() {
  return (
    <section className="flex flex-col items-center gap-3 p-10 text-center">
      <Icon name="search" size={32} className="text-muted-foreground" decorative />
      <h1 className="text-xl font-semibold text-foreground-strong">Recherche</h1>
      <p className="max-w-sm text-sm text-muted-foreground">Bientôt disponible : trouvez un produit ou un commerçant près de chez vous.</p>
    </section>
  );
}
