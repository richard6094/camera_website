import { useRef, useEffect, useCallback, useState } from 'react';

/**
 * useScrollProgress — Continuous, bidirectional scroll-linked animations
 *
 * Unlike useScrollReveal (one-shot trigger), this hook continuously maps
 * an element's viewport position to a 0→1 progress value, updated every
 * animation frame. Scroll up reverses the animation (mandler.shop style).
 *
 * Progress semantics:
 *   0   = element is fully below viewport (or at the start threshold)
 *   0.5 = element center is at viewport center
 *   1   = element is fully in the "sweet spot" or above
 *
 * The hook sets CSS custom properties on the element so pure-CSS
 * animations can consume them without React re-renders:
 *   --sp        (0→1 clamped progress)
 *   --sp-raw    (unclamped, can go beyond 0-1)
 *
 * Usage:
 *   const ref = useScrollProgress<HTMLDivElement>();
 *   <div ref={ref} className="sp-fade-up">...</div>
 *
 * Or with options:
 *   const ref = useScrollProgress<HTMLDivElement>({ start: 0.9, end: 0.3 });
 *
 * For React-driven animations (where you need the number):
 *   const { ref, progress } = useScrollProgressValue<HTMLDivElement>();
 */

interface ScrollProgressOptions {
  /**
   * Viewport fraction where animation STARTS (element bottom edge).
   * 1.0 = element just enters viewport bottom, 0.5 = viewport center.
   * Default: 0.95 (starts right as element enters)
   */
  start?: number;
  /**
   * Viewport fraction where animation is COMPLETE.
   * 0.55 = element reaches 55% from top (just before center) → fully visible.
   * Default: 0.55
   */
  end?: number;
  /** Disable the hook (for reduced-motion, etc.) */
  disabled?: boolean;
}

/**
 * Core function: compute progress from element rect & viewport metrics.
 * Returns clamped 0→1.
 */
function computeProgress(
  el: HTMLElement,
  start: number,
  end: number
): { progress: number; raw: number } {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;

  // Where is the element's center relative to the viewport?
  const elementCenter = rect.top + rect.height / 2;
  // Map from "start" zone to "end" zone
  const startY = vh * start;   // e.g. 0.95 * vh — near bottom
  const endY = vh * end;       // e.g. 0.35 * vh — upper third

  // raw progress: 0 when elementCenter is at startY, 1 when at endY
  const raw = (startY - elementCenter) / (startY - endY);
  const progress = Math.min(1, Math.max(0, raw));

  return { progress, raw };
}

/**
 * useScrollProgress — Sets CSS custom properties for pure-CSS consumption.
 * Most performant: no React state updates, only DOM writes via rAF.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>(
  options: ScrollProgressOptions = {}
) {
  const { start = 0.95, end = 0.55, disabled = false } = options;
  const ref = useRef<T>(null);
  const rafRef = useRef<number>(0);
  const lastProgressRef = useRef<number>(-1);

  useEffect(() => {
    if (disabled) return;

    const el = ref.current;
    if (!el) return;

    // Check reduced motion preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      el.style.setProperty('--sp', '1');
      el.style.setProperty('--sp-raw', '1');
      return;
    }

    const update = () => {
      const { progress, raw } = computeProgress(el, start, end);

      // Only write if changed (avoid layout thrashing)
      if (Math.abs(progress - lastProgressRef.current) > 0.001) {
        lastProgressRef.current = progress;
        el.style.setProperty('--sp', progress.toFixed(4));
        el.style.setProperty('--sp-raw', raw.toFixed(4));
      }

      rafRef.current = requestAnimationFrame(update);
    };

    // Start the rAF loop
    rafRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [start, end, disabled]);

  return ref;
}

/**
 * useScrollProgressValue — Returns a React state value for JS-driven animations.
 * Use sparingly (causes re-renders). Prefer CSS-driven approach above.
 */
export function useScrollProgressValue<T extends HTMLElement = HTMLDivElement>(
  options: ScrollProgressOptions = {}
) {
  const { start = 0.95, end = 0.55, disabled = false } = options;
  const ref = useRef<T>(null);
  const rafRef = useRef<number>(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (disabled) return;

    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setProgress(1);
      return;
    }

    let lastVal = -1;

    const update = () => {
      const { progress: p } = computeProgress(el, start, end);
      // Throttle state updates: only when change > 1%
      if (Math.abs(p - lastVal) > 0.01) {
        lastVal = p;
        setProgress(p);
      }
      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [start, end, disabled]);

  return { ref, progress };
}

/**
 * useMultiScrollProgress — Attach scroll-progress to multiple elements
 * via a callback ref. Ideal for .map() lists.
 */
export function useMultiScrollProgress(
  options: ScrollProgressOptions = {}
) {
  const { start = 0.95, end = 0.55, disabled = false } = options;
  const elementsRef = useRef<Set<HTMLElement>>(new Set());
  const rafRef = useRef<number>(0);
  const progressMapRef = useRef<Map<HTMLElement, number>>(new Map());

  useEffect(() => {
    if (disabled) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      elementsRef.current.forEach((el) => {
        if (mq.matches) {
          el.style.setProperty('--sp', '1');
          el.style.setProperty('--sp-raw', '1');
          return;
        }

        const { progress, raw } = computeProgress(el, start, end);
        const last = progressMapRef.current.get(el) ?? -1;

        if (Math.abs(progress - last) > 0.001) {
          progressMapRef.current.set(el, progress);
          el.style.setProperty('--sp', progress.toFixed(4));
          el.style.setProperty('--sp-raw', raw.toFixed(4));
        }
      });

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [start, end, disabled]);

  const callbackRef = useCallback(
    (el: HTMLElement | null) => {
      if (el) {
        elementsRef.current.add(el);
      }
    },
    []
  );

  return callbackRef;
}
