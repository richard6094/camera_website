import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Initialise Lenis smooth scroll with inertia / damping.
 *
 * Uses duration-based easing (not lerp) for a clean stop without tail jitter.
 * Returns the Lenis instance ref for programmatic scrolling.
 */
export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 0.8,          // Short, snappy glide
      smoothWheel: true,
      touchMultiplier: 1.5,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),  // Cubic ease-out
      autoRaf: true,          // Let Lenis manage its own rAF loop
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
