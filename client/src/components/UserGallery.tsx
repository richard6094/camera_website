import { useState, useRef, useEffect, useCallback } from 'react';

interface UserGalleryProps {
  images: string[];
  /** Called when user clicks an image (not a drag). Receives the image index. */
  onImageClick?: (index: number) => void;
}

export function UserGallery({ images, onImageClick }: UserGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartRelX = useRef(0);
  const hasDragged = useRef(false);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(nextImage, 4000);
    return () => clearInterval(timer);
  }, [autoPlay, nextImage]);

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
    setTranslateX(offset);
  };

  const handleDragEnd = (clientX: number) => {
    if (!isDragging) return;
    setIsDragging(false);

    if (hasDragged.current) {
      const rect = containerRef.current?.getBoundingClientRect();
      const endRelX = rect ? (clientX - rect.left) / rect.width : 0.5;
      // Forward (next): started right half, ended left half
      if (dragStartRelX.current > 0.5 && endRelX < 0.5) {
        setCurrentIndex((currentIndex + 1) % images.length);
      // Backward (prev): started left half, ended right half
      } else if (dragStartRelX.current < 0.5 && endRelX > 0.5) {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
      }
    }
    // Lightbox is handled separately via onClick on the image

    setTranslateX(0);
    setAutoPlay(true);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    handleDragEnd(e.clientX);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setTranslateX(0);
    }
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    handleDragEnd(touch.clientX);
  };

  // Calculate indices for previous and next images
  const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;

  // Create extended array for infinite loop effect
  const extendedImages = [
    images[prevIndex], // Previous image (for seamless loop)
    ...images,
    images[nextIndex], // Next image (for seamless loop)
  ];

  return (
    <div className="sp-scale-in w-full max-w-7xl mx-auto">
      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden select-none touch-pan-y"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => {
          if (isDragging) {
            setIsDragging(false);
            setTranslateX(0);
          }
          setAutoPlay(true);
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex items-center"
          style={{
            transform: `translateX(calc(-${(currentIndex + 1) * 85}% + ${translateX}px))`,
            transition: isDragging ? 'none' : 'transform 500ms ease-in-out',
            gap: '0',
          }}
        >
          {extendedImages.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="flex-shrink-0"
              style={{ 
                width: '85%',
                userSelect: 'none',
                paddingLeft: '1.5%',
                paddingRight: '1.5%',
              }}
            >
              <div className="overflow-hidden rounded-xl aspect-[3/2]">
              <img
                src={image}
                alt={`Sample ${index + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
                onClick={() => {
                  if (!hasDragged.current && onImageClick) {
                    let originalIndex = index - 1;
                    if (originalIndex < 0) originalIndex = images.length - 1;
                    if (originalIndex >= images.length) originalIndex = 0;
                    onImageClick(originalIndex);
                  }
                }}
              />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Camera Scale Indicator */}
      <div className="mt-8 md:mt-12 flex items-end justify-center" style={{ height: '36px' }}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative flex flex-col items-center transition-all duration-300 ease-out group"
            style={{
              paddingLeft: index === 0 ? '0' : '8px',
              paddingRight: index === images.length - 1 ? '0' : '8px',
            }}
            aria-label={`Go to image ${index + 1}`}
          >
            {/* Scale mark - mimics camera dial marks */}
            <div
              className="bg-current transition-all duration-300 ease-out"
              style={{
                width: '1.5px',
                height: currentIndex === index ? '28px' : '12px',
              }}
            />
            {/* Subtle hover effect */}
            <div
              className="w-1 h-1 rounded-full bg-current invisible group-hover:visible transition-opacity duration-200 mt-1"
            />
          </button>
        ))}
      </div>

      {/* Current slide number - mimics camera display */}
      <div className="mt-6 text-center">
        <span className="text-sm font-mono opacity-50">
          {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
