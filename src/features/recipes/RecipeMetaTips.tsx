import { Icon } from "@/src/components/atoms/Icon/Icon";
import type { Recipe } from "@/src/domain/recipe";

export interface RecipeMetaTipsProps {
  recipe: Recipe;
}

export function RecipeMetaTips({ recipe }: RecipeMetaTipsProps) {
  if (!recipe.detail.pairingTip && !recipe.detail.equipmentTip) return null;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {recipe.detail.pairingTip && (
        <div className="flex items-center gap-3 rounded-xl bg-surface-subtle p-3">
          <Icon name="glass" size={20} className="shrink-0 text-foreground-strong" />
          <div>
            <p className="text-[11px] font-bold uppercase text-muted-foreground">Accord idéal</p>
            <p className="text-sm font-semibold text-foreground-strong">{recipe.detail.pairingTip}</p>
          </div>
        </div>
      )}
      {recipe.detail.equipmentTip && (
        <div className="flex items-center gap-3 rounded-xl bg-surface-subtle p-3">
          <Icon name="cooking" size={20} className="shrink-0 text-foreground-strong" />
          <div>
            <p className="text-[11px] font-bold uppercase text-muted-foreground">Matériel requis</p>
            <p className="text-sm font-semibold text-foreground-strong">{recipe.detail.equipmentTip}</p>
          </div>
        </div>
      )}
    </div>
  );
}
