import { Icon } from "@/src/components/atoms/Icon/Icon";

export interface RecipeSubstitutionTipProps {
  tip: string;
}

export function RecipeSubstitutionTip({ tip }: RecipeSubstitutionTipProps) {
  return (
    <div className="flex gap-3 rounded-xl border border-catalog-line bg-surface p-4">
      <Icon name="leaf" size={20} className="shrink-0 text-success" />
      <div>
        <p className="text-sm font-bold text-foreground-strong">Astuce de Cuistot &amp; Substitutions Disponibles</p>
        <p className="mt-1 text-sm text-ink-muted">{tip}</p>
      </div>
    </div>
  );
}
