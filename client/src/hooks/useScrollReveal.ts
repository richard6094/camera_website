import { useRef, useEffect, useCallback } from 'react';

export type RevealAnimation =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'fade-in'
  | 'scale-in'
  | 'clip-reveal'       // Image reveal with clip-path
  | 'clip-reveal-left'  // Image reveal from left
  | 'line-grow'         // Divider line grows
  | 'stagger';          // Container that staggers children

interface ScrollRevealOptions {
  /** Animation type */
  animation?: RevealAnimation;
  /** IntersectionObserver threshold (0-1) */
  threshold?: number;
  /** Root margin for early/late triggering */
  rootMargin?: string;
  /** Delay in ms before animation starts */
  delay?: number;
  /** Duration override in ms */
  duration?: number;
  /** Whether to only animate once (default: true) */
  once?: boolean;
  /** Stagger delay between children in ms (for 'stagger' animation) */
  staggerDelay?: number;
}

/**
 * useScrollReveal — Scroll-triggered reveal animations
 * 
 * Uses IntersectionObserver for performant scroll detection.
 * Elements start hidden and animate in when they enter the viewport.
 * 
 * Usage:
 *   const ref = useScrollReveal<HTMLDivElement>({ animation: 'fade-up' });
 *   <div ref={ref}>Content</div>
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const {
    animation = 'fade-up',
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    delay = 0,
    duration,
    once = true,
    staggerDelay = 120,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial hidden state
    el.classList.add('scroll-reveal', `sr-${animation}`);
    el.style.setProperty('--sr-delay', `${delay}ms`);
    if (duration) {
      el.style.setProperty('--sr-duration', `${duration}ms`);
    }
    if (animation === 'stagger') {
      el.style.setProperty('--sr-stagger', `${staggerDelay}ms`);
    }

    const reveal = () => {
      el.classList.add('sr-visible');
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            if (once) {
              observer.unobserve(el);
            }
          } else if (!once) {
            el.classList.remove('sr-visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    // Safety net: if the element is already in the viewport when mounted,
    // the IO callback may not fire in some edge cases (React strict mode,
    // HMR re-renders). Manually check after a frame.
    const rafId = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView && !el.classList.contains('sr-visible')) {
        reveal();
        if (once) observer.unobserve(el);
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      observer.unobserve(el);
    };
  }, [animation, threshold, rootMargin, delay, duration, once, staggerDelay]);

  return ref;
}

/**
 * useScrollRevealCallback — Returns a callback ref for dynamic elements
 * Useful for elements rendered in .map() or conditionally
 */
export function useScrollRevealCallback(
  options: ScrollRevealOptions = {}
) {
  const {
    animation = 'fade-up',
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    delay = 0,
    duration,
    once = true,
    staggerDelay = 120,
  } = options;

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sr-visible');
            if (once) {
              observerRef.current?.unobserve(entry.target);
            }
          } else if (!once) {
            entry.target.classList.remove('sr-visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin, once]);

  const callbackRef = useCallback(
    (el: HTMLElement | null) => {
      if (!el || !observerRef.current) return;
      el.classList.add('scroll-reveal', `sr-${animation}`);
      el.style.setProperty('--sr-delay', `${delay}ms`);
      if (duration) {
        el.style.setProperty('--sr-duration', `${duration}ms`);
      }
      if (animation === 'stagger') {
        el.style.setProperty('--sr-stagger', `${staggerDelay}ms`);
      }
      observerRef.current.observe(el);
    },
    [animation, delay, duration, staggerDelay]
  );

  return callbackRef;
}
