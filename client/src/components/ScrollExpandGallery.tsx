import { useRef, useEffect, useState, useCallback, type ReactNode } from 'react';

interface ScrollExpandGalleryProps {
  /** Hero image source (static image mode) */
  image?: string;
  /** Frame sequence for scroll-driven animation (overrides image) */
  frames?: string[];
  /** Background color/gradient shown behind transparent frame sequence */
  frameBg?: string;
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
 * Scroll-driven expand → gallery → gradient-fade section.
 *
 * 1. Image starts small (78 %) with rounded corners.
 * 2. Scrolling expands it to fill the viewport; corners go to 0.
 * 3. Image cross-fades to `bgColor`.
 * 4. Gallery content lives on that background.
 * 5. After gallery, a static gradient smoothly transitions bgColor → transparent,
 *    revealing the page background beneath like a natural color blend.
 *
 * Uses position: sticky + rAF-driven CSS custom properties for smooth
 * 60 fps animation with zero React re-renders.
 */
export function ScrollExpandGallery({
  image,
  frames,
  frameBg = '#1a1a1a',
  quote,
  children,
  gallerySectionId,
  bgColor = 'oklch(0.92 0.028 68)',
  darkGallery = false,
}: ScrollExpandGalleryProps) {
  const expandTrackRef = useRef<HTMLDivElement>(null);
  const expandFrameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const lastExpandP = useRef<number>(-1);
  const framesLoadedRef = useRef<HTMLImageElement[]>([]);
  const [framesReady, setFramesReady] = useState(false);

  // ── Preload frame images ──
  useEffect(() => {
    if (!frames || frames.length === 0) return;
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    frames.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (cancelled) return;
        loaded++;
        if (loaded === frames.length) {
          framesLoadedRef.current = images;
          setFramesReady(true);
        }
      };
      img.onerror = () => {
        if (cancelled) return;
        loaded++;
        if (loaded === frames.length) {
          framesLoadedRef.current = images;
          setFramesReady(true);
        }
      };
      images[i] = img;
    });

    return () => { cancelled = true; };
  }, [frames]);

  // ── Draw specific frame to canvas ──
  const drawFrame = useCallback((p: number) => {
    const canvas = canvasRef.current;
    const imgs = framesLoadedRef.current;
    if (!canvas || imgs.length === 0) return;

    const frameIndex = Math.min(imgs.length - 1, Math.max(0, Math.floor(p * imgs.length)));
    const img = imgs[frameIndex];
    if (!img || !img.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Match canvas to display size (avoid blurriness)
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const cw = Math.round(rect.width * dpr);
    const ch = Math.round(rect.height * dpr);
    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
    }

    ctx.clearRect(0, 0, cw, ch);

    // Draw frame centered, fitting entirely within the canvas (object-fit: contain)
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = cw / ch;
    let drawW: number, drawH: number, dx: number, dy: number;

    if (imgAspect > canvasAspect) {
      // Image wider than canvas — constrain by width
      drawW = cw;
      drawH = cw / imgAspect;
      dx = 0;
      dy = (ch - drawH) / 2;
    } else {
      // Image taller or equal — constrain by height
      drawH = ch;
      drawW = ch * imgAspect;
      dx = (cw - drawW) / 2;
      dy = 0;
    }

    ctx.drawImage(img, dx, dy, drawW, drawH);
  }, []);

  // Draw initial frame once frames are loaded
  useEffect(() => {
    if (framesReady && frames && frames.length > 0) {
      drawFrame(lastExpandP.current >= 0 ? lastExpandP.current : 0);
    }
  }, [framesReady, frames, drawFrame]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      expandFrameRef.current?.style.setProperty('--expand-p', '1');
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
          // Draw frame sequence if available
          if (frames && frames.length > 0) {
            drawFrame(p);
          }
        }
      }

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [frames, drawFrame]);

  const useFrames = frames && frames.length > 0;

  return (
    <div className="scroll-expand-gallery">
      {/* ═══════════ EXPAND TRACK ═══════════
          250vh tall → 150vh effective scroll range.
          The sticky child stays pinned while the image expands. */}
      <div ref={expandTrackRef} className="relative" style={{ height: '250vh' }}>
        <div className="sticky top-0 h-dvh flex items-center justify-center overflow-hidden">
          {/* Blurred backdrop — fills viewport, extends image edge-colors outward (static image mode only) */}
          {!useFrames && image && (
            <img
              src={image}
              alt=""
              className="seg-backdrop absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
          )}

          <div
            ref={expandFrameRef}
            className="seg-expand-frame relative overflow-hidden"
          >
            {/* Static image — only when NOT using frame sequence */}
            {!useFrames && image && (
              <img
                src={image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
            )}

            {/* Frame sequence (canvas-based) — scroll-driven aperture animation */}
            {useFrames && (
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full z-[5]"
                style={{ display: framesReady ? 'block' : 'none' }}
              />
            )}

            {/* Quote overlay — fades out during first 40% of expansion */}
            <div
              className="seg-quote absolute inset-0 z-10 flex items-center justify-center"
            >
              <blockquote className="text-center max-w-[85%]">
                <p
                  className="text-white font-light leading-relaxed whitespace-nowrap"
                  style={{ fontSize: 'clamp(1rem, 3.5vw, 2.5rem)', textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
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
        style={{ backgroundColor: bgColor, marginTop: '-2px', paddingTop: '2px', marginBottom: '-2px', paddingBottom: 'calc(2px + 0px)' }}
      >
        <div className="container max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          {children}
        </div>
      </section>

      {/* ═══════════ GRADIENT FADE-OUT ═══════════
          Eased gradient from bgColor → page background.
          Uses multiple color stops for a smooth, natural transition
          without any hard edge. */}
      <div
        style={{
          height: '70vh',
          background: `linear-gradient(to bottom, ${bgColor} 0%, ${bgColor} 5%, color-mix(in oklch, ${bgColor} 85%, transparent) 20%, color-mix(in oklch, ${bgColor} 60%, transparent) 40%, color-mix(in oklch, ${bgColor} 35%, transparent) 60%, color-mix(in oklch, ${bgColor} 15%, transparent) 80%, transparent 100%)`,
          marginTop: '-2px',
        }}
      />
    </div>
  );
}
