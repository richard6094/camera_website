import { useEffect, useRef, useState } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  backgroundImage?: string;
  speed?: number; // 0.3 to 0.5 for subtle effect
  className?: string;
}

/**
 * ParallaxSection Component
 * Design Philosophy: Minimalism + Cinematic Aesthetics
 * 
 * Creates a subtle parallax scrolling effect where the background
 * moves slower than the foreground content, creating depth.
 * Effect is smooth and restrained, not distracting.
 */
export default function ParallaxSection({
  children,
  backgroundImage,
  speed = 0.4,
  className = '',
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        // Calculate parallax offset based on scroll position
        const scrolled = window.scrollY;
        const elementTop = sectionRef.current.offsetTop;
        const distance = scrolled - elementTop;
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
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {/* Parallax background layer */}
      {backgroundImage && (
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

      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
