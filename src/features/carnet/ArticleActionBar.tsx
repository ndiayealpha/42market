"use client";

import { useState } from "react";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import { useToast } from "@/src/providers/toast-provider";

/** No "article" favorite kind exists in `FavoriteKind` — "Sauvegarder" is a lightweight, honest local toggle with toast feedback, not persisted favorites. "Partager" copies the real URL; "Imprimer" calls the real browser print dialog. */
export function ArticleActionBar() {
  const toast = useToast();
  const [isSaved, setSaved] = useState(false);

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.show("Lien de l'article copié.", "success");
    } catch {
      toast.show("Impossible de copier le lien.", "error");
    }
  }

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        aria-pressed={isSaved}
        aria-label={isSaved ? "Retirer des articles sauvegardés" : "Sauvegarder l'article"}
        onClick={() => {
          setSaved((value) => !value);
          toast.show(isSaved ? "Article retiré de vos sauvegardes." : "Article sauvegardé.", "success");
        }}
        className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-catalog-chip"
      >
        <Icon name="archive" size={16} className={isSaved ? "text-foreground-strong" : "text-muted-foreground"} />
      </button>
      <button type="button" aria-label="Partager l'article" onClick={handleShare} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-catalog-chip">
        <Icon name="share" size={16} className="text-muted-foreground" decorative />
      </button>
      <button type="button" aria-label="Imprimer l'article" onClick={() => window.print()} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-catalog-chip">
        <Icon name="printer" size={16} className="text-muted-foreground" decorative />
      </button>
    </div>
  );
}
