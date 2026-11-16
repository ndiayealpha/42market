import { useEffect, type RefObject } from "react";

const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Focus trap + Escape-to-close + focus restored to whatever was focused
 * before opening. Extracted out of `Dialog` so `ProductGalleryLightbox`
 * (a differently-styled full-screen overlay, not a `Dialog`) gets the
 * exact same accessibility behavior instead of a second hand-rolled copy.
 */
export function useFocusTrap(open: boolean, onClose: () => void, containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;

    const containerNode = containerRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusable = containerNode?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    focusable?.[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose, containerRef]);
}
