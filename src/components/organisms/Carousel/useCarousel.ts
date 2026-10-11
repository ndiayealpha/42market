"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

export interface UseCarouselResult {
  containerRef: RefObject<HTMLDivElement | null>;
  prev: () => void;
  next: () => void;
  canPrev: boolean;
  canNext: boolean;
  page: number;
  pageCount: number;
  goTo: (page: number) => void;
  /** False when every item already fits — arrows/pagination/hint should hide. */
  hasOverflow: boolean;
}

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * All of the carousel's scroll logic, with no opinion on how prev/next/
 * dots are rendered — `PromoSection` places the arrows in its header
 * and the dots in its footer using this same hook's return values,
 * while `containerRef` goes down to the actual scrollable rail.
 */
export function useCarousel(): UseCarouselResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft < maxScroll - 4);
    setPageCount(clientWidth > 0 && maxScroll > 4 ? Math.ceil(scrollWidth / clientWidth) : 1);
    setPage(clientWidth > 0 ? Math.round(scrollLeft / clientWidth) : 0);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      resizeObserver.disconnect();
    };
  }, [measure]);

  const scrollByPage = useCallback((direction: 1 | -1) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, []);

  const goTo = useCallback((targetPage: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ left: targetPage * el.clientWidth, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, []);

  return {
    containerRef,
    prev: () => scrollByPage(-1),
    next: () => scrollByPage(1),
    canPrev,
    canNext,
    page,
    pageCount,
    goTo,
    hasOverflow: canPrev || canNext,
  };
}
