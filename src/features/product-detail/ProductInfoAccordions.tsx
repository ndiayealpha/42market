import type { AllergenInfo } from "@/src/domain/product-detail";

export interface ProductInfoAccordionsProps {
  characteristicRows: { label: string; value: string }[];
  allergens: AllergenInfo;
}

const NO_DATA_MESSAGE = "Informations non communiquées, contactez l'épicerie.";

/** No `Accordion` primitive exists in this repo (checked first) — native `<details>`/`<summary>` is accessible and gets keyboard/toggle behavior for free. */
export function ProductInfoAccordions({ characteristicRows, allergens }: ProductInfoAccordionsProps) {
  const hasAllergenData = Boolean(allergens.allergensText) || Boolean(allergens.nutritionPer100g?.length);

  return (
    <div className="flex flex-col gap-3">
      <details open className="rounded-2xl bg-surface p-5 shadow-card">
        <summary className="cursor-pointer text-sm font-bold text-foreground-strong">Caractéristiques &amp; Origine</summary>
        {characteristicRows.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">{NO_DATA_MESSAGE}</p>
        ) : (
          <dl className="mt-4 flex flex-col gap-2 text-sm">
            {characteristicRows.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-border pb-2 last:border-0 last:pb-0">
                <dt className="text-muted-foreground">{row.label}</dt>
                <dd className="text-right font-medium text-foreground-strong">{row.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </details>

      <details className="rounded-2xl bg-surface p-5 shadow-card">
        <summary className="cursor-pointer text-sm font-bold text-foreground-strong">
          Déclaration allergènes &amp; Valeurs nutritionnelles (INCO)
        </summary>
        <div className="mt-4 flex flex-col gap-3 text-sm">
          {!hasAllergenData && <p className="text-muted-foreground">{NO_DATA_MESSAGE}</p>}
          {allergens.allergensText && <p className="text-muted-foreground">{allergens.allergensText}</p>}
          {allergens.nutritionPer100g && allergens.nutritionPer100g.length > 0 && (
            <table className="w-full text-left">
              <caption className="sr-only">Valeurs nutritionnelles pour 100 g</caption>
              <thead>
                <tr>
                  <th scope="col" className="pb-1 font-semibold text-foreground-strong">
                    Pour 100 g
                  </th>
                  <th scope="col" className="pb-1 text-right font-semibold text-foreground-strong">
                    Valeur
                  </th>
                </tr>
              </thead>
              <tbody>
                {allergens.nutritionPer100g.map((row) => (
                  <tr key={row.label} className="border-t border-border">
                    <td className="py-1.5 text-muted-foreground">{row.label}</td>
                    <td className="py-1.5 text-right font-medium text-foreground-strong">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </details>
    </div>
  );
}
