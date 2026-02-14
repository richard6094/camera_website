import { useEffect, useRef, useState } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  backgroundImage?: string;
  speed?: number;
  className?: string;
  videoBackground?: boolean;
}

/**
 * ParallexSection Component - Enhanced with Video Parallax
 * Design Philosophy: Leica Industrial Aesthetics × Contemporary UI
 * 
 * Creates smooth parallax scrolling where background moves slower than foreground.
 * Supports both image and video backgrounds with subtle, restrained effects.
 * Effect enhances spatial depth without distraction.
 */
export default function ParallaxSection({
  children,
  backgroundImage,
  speed = 0.6,
  className = '',
  videoBackground = false,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight + 200 && rect.bottom > -200;

      if (isVisible) {
        const scrolled = window.scrollY;
        const elementTop = sectionRef.current.offsetTop;
        const elementCenter = elementTop + sectionRef.current.offsetHeight / 2;
        const viewportCenter = scrolled + window.innerHeight / 2;
        const distance = viewportCenter - elementCenter;
        setOffset(distance * speed);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundImage: !videoBackground && backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundAttachment: !videoBackground ? 'fixed' : undefined,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {/* Parallax background layer for static images */}
      {backgroundImage && !videoBackground && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            transform: `translateY(${offset}px)`,
            willChange: 'transform',
          }}
        />
      )}

      {/* Parallax overlay for video backgrounds */}
      {videoBackground && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translateY(${offset * 0.5}px)`,
            willChange: 'transform',
          }}
        />
      )}

      {/* Content layer with parallax effect for videos */}
      <div 
        className="relative z-10"
        style={videoBackground ? {
          transform: `translateY(${offset * 0.3}px)`,
          willChange: 'transform',
          transition: 'transform 0.1s ease-out',
        } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
