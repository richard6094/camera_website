import { useEffect, useState } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';

interface ParallaxQuoteProps {
  image: string;
  quote: string;
  author?: string;
  topBg?: string;
  bottomBg?: string;
}

export function ParallaxQuote({ image, quote, author, topBg, bottomBg }: ParallaxQuoteProps) {
  const spRef = useScrollProgress<HTMLElement>({ start: 1.4 });
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const section = document.querySelector(`section img[src="${image}"]`)?.closest('section');
    
    const handleScroll = () => {
      if (section) {
        const rect = section.getBoundingClientRect();
        const scrollProgress = -rect.top;
        setOffsetY(scrollProgress);
      }
    };

    handleScroll(); // Initial calculation
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [image]);

  return (
    <section
      ref={spRef}
      className="py-4 sm:py-6 md:py-8 mx-auto w-full" style={{ maxWidth: 'min(68rem, calc(100% - 2rem))' }}
      style={{
        maxWidth: 'min(68rem, calc(100% - 2rem))',
        ...(topBg || bottomBg ? {
          background: `linear-gradient(to bottom, ${topBg || 'transparent'} 50%, ${bottomBg || 'transparent'} 50%)`
        } : { backgroundColor: 'transparent' })
      }}
    >
      <div className="sp-scale-subtle relative h-[40vh] sm:h-[45vh] md:h-[55vh] lg:h-[60vh] overflow-hidden rounded-2xl">
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          transform: `translateY(${offsetY * 0.08}px)`,
          willChange: 'transform',
          height: '130%',
          top: '-15%'
        }}
      >
        <img 
          src={image}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Dark Overlay removed per user request */}

      {/* Quote Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16">
        <blockquote className="max-w-4xl text-center">
          <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light leading-relaxed mb-3 sm:mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.7), 0 0 60px rgba(0,0,0,0.4)' }}>
            "{quote}"
          </p>
          {author && (
            <footer className="text-white/70 text-base sm:text-lg md:text-xl font-light" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.7), 0 0 60px rgba(0,0,0,0.4)' }}>
              — {author}
            </footer>
          )}
        </blockquote>
      </div>
      </div>
    </section>
  );
}
