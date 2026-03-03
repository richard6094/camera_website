import { useRef, useEffect, type ReactNode } from 'react';

interface ScrollExpandGalleryProps {
  /** Hero image source */
  image: string;
  /** Quote text shown over the image (fades during expansion) */
  quote: string;
  /** Gallery content rendered on the warm background */
  children: ReactNode;
  /** Optional id for the gallery section (anchor links) */
  gallerySectionId?: string;
  /** Background color that the image transitions into.
   *  Default matches the silk-bg base color. */
  bgColor?: string;
  /** Whether the gallery uses light text on a dark background */
  darkGallery?: boolean;
}

/**
 * Scroll-driven expand → gallery → shrink section.
 *
 * 1. Image starts small (65 %) with rounded corners.
 * 2. Scrolling expands it to fill the viewport; corners go to 0.
 * 3. Image cross-fades to `bgColor`.
 * 4. Gallery content lives on that background.
 * 5. After gallery, background shrinks back with rounded corners and fades out.
 *
 * Uses position: sticky + rAF-driven CSS custom properties for smooth
 * 60 fps animation with zero React re-renders.
 */
export function ScrollExpandGallery({
  image,
  quote,
  children,
  gallerySectionId,
  bgColor = 'oklch(0.92 0.035 75)',
  darkGallery = false,
}: ScrollExpandGalleryProps) {
  const expandTrackRef = useRef<HTMLDivElement>(null);
  const shrinkTrackRef = useRef<HTMLDivElement>(null);
  const expandFrameRef = useRef<HTMLDivElement>(null);
  const shrinkFrameRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastExpandP = useRef<number>(-1);
  const lastShrinkP = useRef<number>(-1);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      expandFrameRef.current?.style.setProperty('--expand-p', '1');
      shrinkFrameRef.current?.style.setProperty('--shrink-p', '1');
      return;
    }

    const update = () => {
      const vh = window.innerHeight;

      // ── Expand phase ──
      if (expandTrackRef.current && expandFrameRef.current) {
        const rect = expandTrackRef.current.getBoundingClientRect();
        const stickyRange = rect.height - vh;
        const scrolled = -rect.top;
        const p = Math.min(1, Math.max(0, scrolled / stickyRange));

        if (Math.abs(p - lastExpandP.current) > 0.0005) {
          lastExpandP.current = p;
          expandFrameRef.current.style.setProperty('--expand-p', p.toFixed(4));
        }
      }

      // ── Shrink phase ──
      if (shrinkTrackRef.current && shrinkFrameRef.current) {
        const rect = shrinkTrackRef.current.getBoundingClientRect();
        const stickyRange = rect.height - vh;
        const scrolled = -rect.top;
        const p = Math.min(1, Math.max(0, scrolled / stickyRange));

        if (Math.abs(p - lastShrinkP.current) > 0.0005) {
          lastShrinkP.current = p;
          shrinkFrameRef.current.style.setProperty('--shrink-p', p.toFixed(4));
        }
      }

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="scroll-expand-gallery">
      {/* ═══════════ EXPAND TRACK ═══════════
          250vh tall → 150vh effective scroll range.
          The sticky child stays pinned while the image expands. */}
      <div ref={expandTrackRef} className="relative" style={{ height: '250vh' }}>
        <div className="sticky top-0 h-dvh flex items-center justify-center overflow-hidden">
          <div
            ref={expandFrameRef}
            className="seg-expand-frame relative overflow-hidden"
          >
            {/* Background image */}
            <img
              src={image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />

            {/* Quote overlay — fades out during first 40% of expansion */}
            <div
              className="seg-quote absolute inset-0 z-10 flex items-center justify-center px-6 sm:px-10 md:px-16"
            >
              <blockquote className="max-w-4xl text-center">
                <p
                  className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light leading-relaxed"
                  style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
                >
                  &ldquo;{quote}&rdquo;
                </p>
              </blockquote>
            </div>

            {/* BG-color overlay — cross-fades in during last 30% of expansion */}
            <div
              className="seg-color-overlay absolute inset-0 z-20"
              style={{ backgroundColor: bgColor }}
            />
          </div>
        </div>
      </div>

      {/* ═══════════ GALLERY SECTION ═══════════
          Normal document flow. Background matches the expand end-state
          so the transition is visually seamless. */}
      <section
        id={gallerySectionId}
        className={`relative z-10 py-16 sm:py-20 md:py-24 lg:py-32${darkGallery ? ' text-white' : ''}`}
        style={{ backgroundColor: bgColor }}
      >
        <div className="container max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          {children}
        </div>
      </section>

      {/* ═══════════ FADE-OUT TRACK ═══════════
          150vh tall → 50vh effective scroll range.
          Full-width bg color fades out smoothly, no visible edges. */}
      <div ref={shrinkTrackRef} className="relative" style={{ height: '150vh' }}>
        <div className="sticky top-0 h-dvh overflow-hidden">
          <div
            ref={shrinkFrameRef}
            className="seg-fade-out absolute inset-0"
            style={{ backgroundColor: bgColor }}
          />
        </div>
      </div>
    </div>
  );
}
