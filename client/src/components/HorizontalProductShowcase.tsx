import { useState, useRef, useEffect } from 'react';
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
  const [parallaxOffsets, setParallaxOffsets] = useState<number[]>(items.map(() => 0));
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const AUTO_SCROLL_INTERVAL = 5000; // 5 seconds

  // Handle horizontal scroll to update active index and parallax
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(newIndex);

      // Calculate parallax offsets for each card based on horizontal scroll
      const newOffsets = items.map((_, idx) => {
        const cardScrollPosition = scrollLeft - idx * cardWidth;
        // Parallax effect: background moves slower (0.3x speed) relative to scroll
        return cardScrollPosition * 0.3;
      });
      setParallaxOffsets(newOffsets);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    return () => container.removeEventListener('scroll', handleScroll);
  }, [items]);

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

  // Auto-scroll functionality
  useEffect(() => {
    const startAutoScroll = () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
      
      autoScrollTimerRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % items.length;
          scrollToItem(nextIndex);
          return nextIndex;
        });
      }, AUTO_SCROLL_INTERVAL);
    };

    startAutoScroll();

    // Pause auto-scroll when user interacts
    const container = scrollContainerRef.current;
    if (container) {
      const pauseAutoScroll = () => {
        if (autoScrollTimerRef.current) {
          clearInterval(autoScrollTimerRef.current);
          autoScrollTimerRef.current = null;
        }
        // Restart after 10 seconds of inactivity
        setTimeout(startAutoScroll, 10000);
      };

      container.addEventListener('touchstart', pauseAutoScroll);
      container.addEventListener('mousedown', pauseAutoScroll);

      return () => {
        if (autoScrollTimerRef.current) {
          clearInterval(autoScrollTimerRef.current);
        }
        container.removeEventListener('touchstart', pauseAutoScroll);
        container.removeEventListener('mousedown', pauseAutoScroll);
      };
    }

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [items.length, AUTO_SCROLL_INTERVAL]);

  // Scroll to specific item
  const scrollToItem = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.offsetWidth;
    container.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth',
    });
  };

  // Handle manual navigation with auto-scroll pause
  const handleManualNavigation = (index: number) => {
    // Clear existing auto-scroll timer
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }

    // Scroll to selected item
    scrollToItem(index);
    setActiveIndex(index);

    // Restart auto-scroll after 10 seconds
    setTimeout(() => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
      
      autoScrollTimerRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % items.length;
          scrollToItem(nextIndex);
          return nextIndex;
        });
      }, AUTO_SCROLL_INTERVAL);
    }, 10000);
  };

  return (
    <section className="relative w-full" style={{ height: '100vh', minHeight: '700px', maxHeight: '1080px' }}>
      {/* Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory h-full scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-full h-full snap-start relative overflow-hidden"
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
                <div className="absolute bottom-20 sm:bottom-24 md:bottom-32 left-0 right-0 z-10">
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

      {/* Hide scrollbar globally for this component */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
