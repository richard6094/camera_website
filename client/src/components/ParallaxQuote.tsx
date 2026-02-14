import { useEffect, useState } from 'react';

interface ParallaxQuoteProps {
  image: string;
  quote: string;
  author?: string;
}

export function ParallaxQuote({ image, quote, author }: ParallaxQuoteProps) {
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
    <section className="relative h-[40vh] sm:h-[45vh] md:h-[55vh] lg:h-[60vh] overflow-hidden">
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          transform: `translateY(${offsetY * 0.1}px)`,
          willChange: 'transform',
          height: '115%',
          top: '-7.5%'
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
          <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light leading-relaxed mb-3 sm:mb-4" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>
            "{quote}"
          </p>
          {author && (
            <footer className="text-white/70 text-base sm:text-lg md:text-xl font-light" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
              — {author}
            </footer>
          )}
        </blockquote>
      </div>
    </section>
  );
}
