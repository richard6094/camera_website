import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Unified Horizontal Showcase Component
 * Design Philosophy: Leica-Inspired Horizontal Scrolling Gallery with Parallax
 * 
 * Features:
 * - Hero video card + Product cards in one horizontal scroll
 * - Horizontal parallax scrolling effect on all cards
 * - Bottom thumbnail navigation bar
 * - Smooth scroll snapping
 * - Active card indicator
 */

interface ShowcaseItem {
  id: string | number;
  type: 'hero' | 'product';
  name: string;
  // Hero-specific fields
  title?: string;
  subtitle?: string;
  description?: string;
  videoSrc?: string;
  // Product-specific fields
  tagline?: string;
  image?: string;
  productDescription?: string;
}

interface HorizontalProductShowcaseProps {
  items: ShowcaseItem[];
  onItemClick?: (itemId: string | number) => void;
  videoLoaded?: boolean;
  videoProgress?: number;
  onVideoLoadProgress?: (progress: number) => void;
}

export default function HorizontalProductShowcase({
  items,
  onItemClick,
  videoLoaded = false,
  videoProgress = 0,
  onVideoLoadProgress,
}: HorizontalProductShowcaseProps) {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dragStartX = useRef(0);
  const dragStartRelX = useRef(0);
  const hasDragged = useRef(false);

  // Compute parallax offsets based on activeIndex
  const cWidth = containerRef.current?.offsetWidth || (typeof window !== 'undefined' ? window.innerWidth : 0);
  const parallaxOffsets = items.map((_, idx) => {
    return (activeIndex - idx) * cWidth * 0.3;
  });

  // Video loading progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        if (duration > 0) {
          const progress = (bufferedEnd / duration) * 100;
          onVideoLoadProgress?.(progress);
        }
      }
    };

    video.addEventListener('progress', handleProgress);
    video.addEventListener('canplaythrough', () => onVideoLoadProgress?.(100));

    return () => {
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('canplaythrough', () => onVideoLoadProgress?.(100));
    };
  }, [onVideoLoadProgress]);

  // Next slide callback
  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  // Auto-scroll
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [autoPlay, nextSlide]);

  // Handle manual navigation
  const handleManualNavigation = (index: number) => {
    setActiveIndex(index);
  };

  // Drag handlers (position-based switching)
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setAutoPlay(false);
    dragStartX.current = clientX;
    hasDragged.current = false;
    const rect = containerRef.current?.getBoundingClientRect();
    dragStartRelX.current = rect ? (clientX - rect.left) / rect.width : 0.5;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const offset = clientX - dragStartX.current;
    if (Math.abs(offset) > 5) hasDragged.current = true;
    setDragOffset(offset);
  };

  const handleDragEnd = (clientX: number) => {
    if (!isDragging) return;
    setIsDragging(false);

    if (hasDragged.current) {
      const rect = containerRef.current?.getBoundingClientRect();
      const endRelX = rect ? (clientX - rect.left) / rect.width : 0.5;
      if (dragStartRelX.current > 0.5 && endRelX < 0.5) {
        setActiveIndex((prev) => (prev + 1) % items.length);
      } else if (dragStartRelX.current < 0.5 && endRelX > 0.5) {
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
      }
    }

    setDragOffset(0);
    setAutoPlay(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };
  const handleMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const handleMouseUp = (e: React.MouseEvent) => handleDragEnd(e.clientX);
  const handleTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => handleDragEnd(e.changedTouches[0].clientX);

  return (
    <section className="relative w-full" style={{ height: '100vh', minHeight: '700px', maxHeight: '1080px' }}>
      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="relative h-full overflow-hidden select-none"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => {
          if (isDragging) {
            setIsDragging(false);
            setDragOffset(0);
          }
          setAutoPlay(true);
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full"
          style={{
            transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`,
            transition: isDragging ? 'none' : 'transform 500ms ease-in-out',
          }}
        >
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-full h-full relative overflow-hidden"
          >
            {item.type === 'hero' ? (
              // Hero Image/Video Card
              <>
                {/* Background with Horizontal Parallax */}
                <div className="absolute inset-0 overflow-hidden">
                  {item.image ? (
                    // Image background
                    <>
                      {/* Blurred background layer */}
                      <div 
                        className="absolute inset-0"
                        style={{
                          transform: `translateX(${parallaxOffsets[idx]}px) scale(1.2)`,
                          willChange: 'transform',
                          transition: 'transform 0.1s ease-out',
                        }}
                      >
                        <img
                          src={item.image}
                          alt="Hero Background"
                          className="w-full h-full object-cover"
                          style={{
                            filter: 'brightness(0.4) blur(40px)',
                            opacity: 0.8,
                          }}
                        />
                      </div>

                      {/* Main image layer */}
                      <div 
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          transform: `translateX(${parallaxOffsets[idx]}px)`,
                          willChange: 'transform',
                          transition: 'transform 0.1s ease-out',
                        }}
                      >
                        <div 
                          className="relative w-full h-full max-w-[177.78vh]"
                          style={{
                            maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                          }}
                        >
                          <img
                            src={item.image}
                            alt="Hero"
                            className="w-full h-full object-cover"
                            style={{
                              filter: 'brightness(0.6)',
                            }}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    // Video background (fallback)
                    <>
                      {/* Blurred background layer for ultra-wide screens */}
                      <div 
                        className="absolute inset-0"
                        style={{
                          transform: `translateX(${parallaxOffsets[idx]}px) scale(1.2)`,
                          willChange: 'transform',
                          transition: 'transform 0.1s ease-out',
                        }}
                      >
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                          style={{
                            filter: 'brightness(0.4) blur(40px)',
                            opacity: videoLoaded ? 0.8 : 0.4,
                            transition: 'opacity 0.6s ease-out',
                          }}
                        >
                          <source src={item.videoSrc} type="video/mp4" />
                        </video>
                      </div>

                      {/* Main video layer - constrained to 16:9 aspect ratio */}
                      <div 
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          transform: `translateX(${parallaxOffsets[idx]}px)`,
                          willChange: 'transform',
                          transition: 'transform 0.1s ease-out',
                        }}
                      >
                        <div 
                          className="relative w-full h-full max-w-[177.78vh]"
                          style={{
                            maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                          }}
                        >
                          <video
                            ref={videoRef}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                            style={{
                              filter: 'brightness(0.6)',
                              opacity: videoLoaded ? 1 : 0.5,
                              transition: 'opacity 0.6s ease-out',
                            }}
                          >
                            <source src={item.videoSrc} type="video/mp4" />
                          </video>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
                </div>

                {/* Hero Content */}
                <div className="absolute inset-0 flex flex-col items-start z-10" style={{ paddingTop: '20vh' }}>
                  <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 w-full">
                    <div className="max-w-3xl">
                      <img 
                        src="/images/mandler-logo-hero.png" 
                        alt="Mandler" 
                        className="w-auto mb-3 sm:mb-4"
                        style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', height: '80px', marginLeft: '-15px' }}
                      />
                      <style>{`
                        @media (min-width: 640px) {
                          .absolute.inset-0.flex.flex-col {
                            padding-top: 23vh !important;
                          }
                          .max-w-3xl img[alt="Mandler"] {
                            height: 90px !important;
                            margin-left: -18px !important;
                          }
                        }
                        @media (min-width: 768px) {
                          .absolute.inset-0.flex.flex-col {
                            padding-top: 28vh !important;
                          }
                          .max-w-3xl img[alt="Mandler"] {
                            height: 120px !important;
                            margin-left: -25px !important;
                          }
                        }
                        @media (min-width: 1024px) {
                          .absolute.inset-0.flex.flex-col {
                            padding-top: 30vh !important;
                          }
                          .max-w-3xl img[alt="Mandler"] {
                            height: 140px !important;
                            margin-left: -30px !important;
                          }
                        }
                      `}</style>
                      <div className="w-16 sm:w-20 md:w-24 h-px bg-white/40 mb-6 sm:mb-7 md:mb-8" style={{ height: '0.5px' }} />
                      <p className="text-white/90 text-base sm:text-lg md:text-xl mb-4 sm:mb-5 md:mb-6 leading-relaxed font-light tracking-wide">
                        {item.subtitle}
                      </p>
                      <p className="text-white/70 text-xs sm:text-sm md:text-base mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-2xl">
                        {item.description}
                      </p>
                      <button
                        onClick={() => onItemClick?.(item.id)}
                        className="px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 border border-white text-white hover:bg-white/10 damped-transition text-xs sm:text-sm tracking-widest mb-20 sm:mb-24 md:mb-28"
                        style={{ borderWidth: '0.5px' }}
                      >
                        {t('hero.cta')}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Video Loading Progress */}
                {!videoLoaded && videoProgress < 100 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
                    <div
                      className="h-full bg-white damped-transition"
                      style={{ width: `${videoProgress}%` }}
                    />
                  </div>
                )}

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                  <ChevronDown className="w-8 h-8 text-white/60" />
                </div>
              </>
            ) : (
              // Product Card
              <>
                {/* Product Image Background with Horizontal Parallax and Blurred Edges */}
                <div className="absolute inset-0 overflow-hidden">
                  {/* Blurred background layer for ultra-wide screens */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      transform: `translateX(${parallaxOffsets[idx]}px) scale(1.2)`,
                      willChange: 'transform',
                      transition: 'transform 0.1s ease-out',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={`${item.name} background`}
                      className="w-full h-full object-cover"
                      style={{
                        filter: 'brightness(0.3) blur(40px)',
                        opacity: 0.8,
                      }}
                    />
                  </div>

                  {/* Main image layer - constrained to prevent excessive vertical cropping */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transform: `translateX(${parallaxOffsets[idx]}px)`,
                      willChange: 'transform',
                      transition: 'transform 0.1s ease-out',
                    }}
                  >
                    <div 
                      className="relative w-full h-full max-w-[177.78vh]"
                      style={{
                        maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                </div>

                {/* Product Content */}
                <div className="absolute bottom-32 sm:bottom-28 md:bottom-32 left-0 right-0 z-10">
                  <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
                    <div className="max-w-2xl">
                      <p className="text-white/60 text-xs sm:text-sm md:text-base tracking-widest mb-3 sm:mb-4 uppercase">
                        {item.tagline}
                      </p>
                      <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 tracking-tight leading-none">
                        {item.name}
                      </h2>
                      <div className="w-12 sm:w-14 md:w-16 h-px bg-white/40 mb-4 sm:mb-5 md:mb-6" style={{ height: '0.5px' }} />
                      <p className="text-white/80 text-sm sm:text-base md:text-lg mb-6 sm:mb-7 md:mb-8 leading-relaxed max-w-xl">
                        {item.productDescription}
                      </p>
                      <button
                        onClick={() => onItemClick?.(item.id)}
                        className="px-5 sm:px-6 py-2.5 sm:py-3 border border-white text-white hover:bg-white/10 damped-transition text-xs sm:text-sm tracking-widest inline-flex items-center gap-2"
                        style={{ borderWidth: '0.5px' }}
                      >
                        {t('product.discover')} <ChevronRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
        </div>
      </div>

      {/* Dot Scroll Indicators */}
      <div className="absolute bottom-[72px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleManualNavigation(idx)}
            className="group p-1"
            aria-label={`Slide ${idx + 1}`}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? 'w-6 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-white/40 group-hover:bg-white/70'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Bottom Thumbnail Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-background/95 backdrop-blur-sm border-t border-foreground/10" style={{ borderTopWidth: '0.5px' }}>
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 py-4">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide">
            {items.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleManualNavigation(idx)}
                className={`flex-shrink-0 text-sm tracking-wider damped-transition pb-2 border-b-2 ${
                  activeIndex === idx
                    ? 'text-foreground border-foreground'
                    : 'text-foreground/50 border-transparent hover:text-foreground/80'
                }`}
                style={{ borderBottomWidth: activeIndex === idx ? '2px' : '0px' }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
