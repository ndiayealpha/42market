import { Badge } from "@/src/components/atoms/Badge/Badge";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { RatingChip } from "@/src/components/atoms/RatingChip/RatingChip";
import { Eyebrow } from "@/src/components/layout/Eyebrow/Eyebrow";

export interface ProductHeaderProps {
  /** `aisleLabelLong` — the small-caps eyebrow, e.g. "CÉRÉALES & RIZ D'ÉPICERIE FINE". */
  eyebrow: string;
  name: string;
  hasFreshnessGuarantee: boolean;
  rating?: { average: number; reviewCount: number };
}

/** P4 — eyebrow, optional freshness badge, H1, rating line. "avis" has no plural form in French, so the review count never needs its own pluralization helper (unlike `formatFavoriteUnitPrice`'s euro/kg case). */
export function ProductHeader({ eyebrow, name, hasFreshnessGuarantee, rating }: ProductHeaderProps) {
  return (
    <div>
      {/* Small caps are a CSS `uppercase` class on `Eyebrow`, not a JS `.toUpperCase()` on the string — the fixture's own casing never matters. */}
      <Eyebrow>{eyebrow}</Eyebrow>

      {hasFreshnessGuarantee && (
        <Badge color="success" uppercase={false} className="mt-2 gap-1">
          <Icon name="check-circle" size={12} decorative />
          Contrôle fraîcheur garanti
        </Badge>
      )}

      <h1 className="mt-2 text-2xl font-extrabold text-foreground-strong sm:text-3xl">{name}</h1>

      {rating && (
        <p className="mt-2 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <RatingChip average={rating.average} />
          <span>• {rating.reviewCount} avis vérifiés de clients de quartier</span>
        </p>
      )}
    </div>
  );
}
