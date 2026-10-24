import { Button } from "@/src/components/atoms/Button/Button";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { formatNumber } from "@/src/lib/format";

export interface LoadMoreProps {
  displayedCount: number;
  totalCount: number;
  cityName?: string;
  hasMore: boolean;
  isLoading: boolean;
  isError: boolean;
  onLoadMore: () => void;
  /** Overrides the "Affichage de X sur Y références à {cityName}" sentence — e.g. Notifications' "Affichage de X sur Y notifications." `cityName` is unused when this is set. */
  summaryLabel?: string;
  /** Overrides the "Découvrir plus de pépites" button label — e.g. Notifications' "Voir les notifications plus anciennes". */
  loadMoreLabel?: string;
}

/** Disappears entirely once everything is loaded (`hasMore === false`) — no disabled ghost button left behind. */
export function LoadMore({ displayedCount, totalCount, cityName, hasMore, isLoading, isError, onLoadMore, summaryLabel, loadMoreLabel }: LoadMoreProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      {hasMore && (
        <Button variant="soft" className="rounded-full" aria-busy={isLoading} onClick={onLoadMore} disabled={isLoading}>
          {isLoading ? "Chargement…" : (loadMoreLabel ?? "Découvrir plus de pépites")}
          {!isLoading && <Icon name="chevron-down" size={16} className="ml-1" decorative />}
        </Button>
      )}

      {isError && (
        <Button variant="soft" onClick={onLoadMore}>
          Réessayer
        </Button>
      )}

      <p aria-live="polite" className="text-xs text-muted-foreground">
        {summaryLabel ?? `Affichage de ${formatNumber(displayedCount)} sur ${formatNumber(totalCount)} références à ${cityName}.`}
      </p>
    </div>
  );
}
