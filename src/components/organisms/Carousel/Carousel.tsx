"use client";

import {
  useRef,
  type CSSProperties,
  type ForwardedRef,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { forwardRef } from "react";

export interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  getKey: (item: T, index: number) => string;
  /** 1 or 2 stacked rows scrolling together. Auto-placement: item 1 → top row, 2 → bottom, 3 → top, ... */
  rows?: 1 | 2;
  rowHeights?: [number, number];
}

function CarouselInner<T>(
  { items, renderItem, getKey, rows = 2, rowHeights = [230, 220] }: CarouselProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef<{ startX: number; startScroll: number; active: boolean }>({
    startX: 0,
    startScroll: 0,
    active: false,
  });

  function setRefs(node: HTMLDivElement | null) {
    innerRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  }

  function scrollByPage(direction: 1 | -1) {
    const el = innerRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: reduceMotion ? "auto" : "smooth" });
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByPage(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByPage(-1);
    }
  }

  // Mouse drag-to-scroll (bonus, desktop only — touch already scrolls natively).
  function handleMouseDown(event: MouseEvent) {
    const el = innerRef.current;
    if (!el) return;
    drag.current = { startX: event.clientX, startScroll: el.scrollLeft, active: true };
  }
  function handleMouseMove(event: MouseEvent) {
    if (!drag.current.active) return;
    const el = innerRef.current;
    if (!el) return;
    el.scrollLeft = drag.current.startScroll - (event.clientX - drag.current.startX);
  }
  function endDrag() {
    drag.current.active = false;
  }

  return (
    <div
      ref={setRefs}
      role="list"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      className="grid grid-flow-col grid-rows-1 cursor-grab snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] motion-reduce:scroll-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground-strong active:cursor-grabbing [&::-webkit-scrollbar]:hidden md:gap-x-2 md:gap-y-3 md:[grid-template-rows:var(--carousel-rows)]"
      style={{ "--carousel-rows": rows === 2 ? `${rowHeights[0]}px ${rowHeights[1]}px` : `${rowHeights[0]}px` } as CSSProperties}
    >
      {items.map((item, index) => (
        <div key={getKey(item, index)} role="listitem" className="snap-start">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

/**
 * Generic rail: 1 or 2 rows scrolling together in one container, items
 * auto-placed via CSS grid's column-flow (no manual row bucketing
 * needed — `grid-auto-flow: column` with 2 explicit rows does exactly
 * "1 → top, 2 → bottom, 3 → top, ..." on its own). The scroll/paging
 * *logic* lives in `useCarousel`, used by whoever renders the arrows
 * and dots (see PromoSection) — this component only owns the ref and
 * the actual scrollable markup.
 */
export const Carousel = forwardRef(CarouselInner) as <T>(
  props: CarouselProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReactElement;
