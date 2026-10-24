import { Icon } from "@/src/components/atoms/Icon/Icon";

/** S6's closing reassurance panel — no props, the copy is fixed app-wide guarantee language. */
export function GuaranteeNotice() {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-catalog-chip p-3">
      <Icon name="shield" size={20} className="mt-0.5 shrink-0 text-foreground-strong" decorative />
      <p className="text-xs text-muted-foreground">
        <strong className="text-foreground-strong">Garantie Fraîcheur 42 Markets : </strong>
        si un article ne correspond pas à nos standards de fraîcheur à la remise de votre commande, il vous est
        remboursé ou remplacé sans frais, sur simple signalement en magasin.
      </p>
    </div>
  );
}
