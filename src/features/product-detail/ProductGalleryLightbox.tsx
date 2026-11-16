"use client";

import {
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import { IconButton } from "@/src/components/atoms/IconButton/IconButton";
import { useFocusTrap } from "@/src/components/molecules/Dialog/useFocusTrap";

export interface ProductGalleryLightboxSlide {
  kind: "photo" | "video";
  src: string;
  alt: string;
  poster?: string;
}

export interface ProductGalleryLightboxProps {
  open: boolean;
  onClose: () => void;
  slides: ProductGalleryLightboxSlide[];
  activeIndex: number;
  onNavigate: (index: number) => void;
  productName: string;
}

const ZOOM_SCALE = 2.2;
const SWIPE_CLOSE_THRESHOLD_PX = 90;
const SWIPE_NAVIGATE_THRESHOLD_PX = 50;

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function touchDistance(touches: React.TouchList): number {
  const [a, b] = [touches[0], touches[1]];
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

/**
 * Full-screen viewer — a differently-styled overlay from `Dialog` (dark
 * backdrop, centered media, no title bar), so it doesn't reuse `Dialog`
 * itself, only its focus-trap/Escape/focus-restore behavior via
 * `useFocusTrap`. Click-to-zoom + drag-to-pan + pinch (touch) on photos;
 * swipe left/right to navigate when not zoomed, swipe down to close.
 */
export function ProductGalleryLightbox({ open, onClose, slides, activeIndex, onNavigate, productName }: ProductGalleryLightboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const pan = useRef({ x: 0, y: 0, dragging: false, startX: 0, startY: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const pinch = useRef<{ startDistance: number; startScale: number } | null>(null);
  const swipe = useRef<{ startX: number; startY: number } | null>(null);

  useFocusTrap(open, onClose, containerRef);

  if (!open) return null;

  const slide = slides[activeIndex];
  const hasMultiple = slides.length > 1;

  function resetZoom() {
    setScale(1);
    setPanOffset({ x: 0, y: 0 });
    pan.current = { x: 0, y: 0, dragging: false, startX: 0, startY: 0 };
  }

  function goTo(index: number) {
    resetZoom();
    onNavigate((index + slides.length) % slides.length);
  }

  function handleImageClick(event: ReactMouseEvent<HTMLImageElement>) {
    if (pan.current.dragging) return;
    if (scale > 1) {
      resetZoom();
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    setOrigin({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 });
    setScale(ZOOM_SCALE);
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (scale <= 1) return;
    pan.current.dragging = true;
    pan.current.startX = event.clientX - panOffset.x;
    pan.current.startY = event.clientY - panOffset.y;
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!pan.current.dragging) return;
    setPanOffset({ x: event.clientX - pan.current.startX, y: event.clientY - pan.current.startY });
  }

  function handlePointerUp() {
    pan.current.dragging = false;
  }

  function handleTouchStart(event: ReactTouchEvent<HTMLDivElement>) {
    if (event.touches.length === 2) {
      pinch.current = { startDistance: touchDistance(event.touches), startScale: scale };
      return;
    }
    swipe.current = { startX: event.touches[0].clientX, startY: event.touches[0].clientY };
  }

  function handleTouchMove(event: ReactTouchEvent<HTMLDivElement>) {
    if (event.touches.length === 2 && pinch.current) {
      const ratio = touchDistance(event.touches) / pinch.current.startDistance;
      setScale(Math.min(Math.max(pinch.current.startScale * ratio, 1), 3));
    }
  }

  function handleTouchEnd(event: ReactTouchEvent<HTMLDivElement>) {
    pinch.current = null;
    const start = swipe.current;
    swipe.current = null;
    if (!start || scale > 1) return;
    const end = event.changedTouches[0];
    const deltaX = end.clientX - start.startX;
    const deltaY = end.clientY - start.startY;

    if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > SWIPE_CLOSE_THRESHOLD_PX) {
      onClose();
      return;
    }
    if (Math.abs(deltaX) > SWIPE_NAVIGATE_THRESHOLD_PX && hasMultiple) {
      goTo(activeIndex + (deltaX < 0 ? 1 : -1));
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (!hasMultiple) return;
    if (event.key === "ArrowRight") goTo(activeIndex + 1);
    else if (event.key === "ArrowLeft") goTo(activeIndex - 1);
  }

  const transitionClass = prefersReducedMotion() ? "" : "transition-transform duration-200";

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Galerie photo : ${productName}`}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground-strong/90"
    >
      <div aria-hidden onClick={onClose} className="absolute inset-0" />

      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        <Icon name="close" size={22} decorative />
      </button>

      {hasMultiple && (
        <div aria-live="polite" className="sr-only">
          {`Image ${activeIndex + 1} sur ${slides.length}`}
        </div>
      )}

      {hasMultiple && (
        <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2">
          <IconButton icon="chevron-left" size="lg" bg="rgba(255,255,255,0.15)" fg="#FFFFFF" ariaLabel="Image précédente" onClick={() => goTo(activeIndex - 1)} />
        </div>
      )}
      {hasMultiple && (
        <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
          <IconButton icon="chevron-right" size="lg" bg="rgba(255,255,255,0.15)" fg="#FFFFFF" ariaLabel="Image suivante" onClick={() => goTo(activeIndex + 1)} />
        </div>
      )}

      <div
        className="relative z-[5] flex h-full w-full items-center justify-center overflow-hidden p-6"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slide?.kind === "video" ? (
          <video src={slide.src} poster={slide.poster} controls autoPlay className="max-h-full max-w-full" />
        ) : (
          slide && (
            // eslint-disable-next-line @next/next/no-img-element -- lightbox needs free-form CSS transform zoom/pan; next/image's fill+object-fit doesn't compose with a dynamic transform-origin the same way
            <img
              src={slide.src}
              alt={slide.alt}
              onClick={handleImageClick}
              className={`max-h-full max-w-full cursor-zoom-in select-none object-contain ${transitionClass} ${scale > 1 ? "cursor-grab" : ""}`}
              style={{ transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${scale})`, transformOrigin: `${origin.x}% ${origin.y}%` }}
              draggable={false}
            />
          )
        )}
      </div>
    </div>
  );
}
