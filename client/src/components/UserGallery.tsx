import { useState, useRef } from 'react';
import { ImageLightbox } from './ImageLightbox';

interface UserGalleryProps {
  images: string[];
}

export function UserGallery({ images }: UserGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  // Handle drag start
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  // Handle drag move
  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setTranslateX(diff);
  };

  // Handle drag end
  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Threshold for switching slides (20% on mobile, 30% on desktop)
    const isMobile = window.innerWidth < 768;
    const thresholdPercent = isMobile ? 0.2 : 0.3;
    const threshold = containerRef.current ? containerRef.current.offsetWidth * thresholdPercent : 200;

    if (translateX > threshold) {
      // Swipe right - go to previous
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else if (translateX < -threshold) {
      // Swipe left - go to next
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }

    setTranslateX(0);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
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
    <div className="w-full max-w-7xl mx-auto">
      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex items-center h-full transition-transform duration-300 ease-out"
          style={{
            // Offset by 1 to account for the prepended previous image
            // Show 85% of each image (15% overlap on each side)
            transform: `translateX(calc(-${(currentIndex + 1) * 85}% + ${translateX}px))`,
            transition: isDragging ? 'none' : 'transform 300ms ease-out',
            gap: '0',
          }}
        >
          {extendedImages.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="flex-shrink-0 h-full"
              style={{ 
                width: '85%',
                userSelect: 'none',
                paddingLeft: '1.5%',
                paddingRight: '1.5%',
              }}
            >
              <img
                src={image}
                alt={`Sample ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-2xl cursor-pointer hover:opacity-90 damped-transition"
                draggable={false}
                onClick={() => {
                  // Only open lightbox if not dragging
                  if (Math.abs(translateX) < 10) {
                    // Map extended index back to original index
                    let originalIndex = index - 1;
                    if (originalIndex < 0) originalIndex = images.length - 1;
                    if (originalIndex >= images.length) originalIndex = 0;
                    openLightbox(originalIndex);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Camera Scale Indicator */}
      <div className="mt-8 md:mt-12 flex items-end justify-center gap-0">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative flex flex-col items-center transition-all duration-300 ease-out group"
            aria-label={`Go to image ${index + 1}`}
          >
            {/* Scale mark - mimics camera dial marks */}
            <div
              className="bg-gray-800 transition-all duration-300 ease-out"
              style={{
                width: '1.5px',
                height: currentIndex === index ? '28px' : '12px',
                marginLeft: index === 0 ? '0' : '8px',
                marginRight: index === images.length - 1 ? '0' : '8px',
              }}
            />
            {/* Subtle hover effect */}
            <div
              className="absolute -bottom-1 w-1 h-1 rounded-full bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ bottom: '-4px' }}
            />
          </button>
        ))}
      </div>

      {/* Current slide number - mimics camera display */}
      <div className="mt-6 text-center">
        <span className="text-sm font-mono text-gray-500">
          {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
      </div>

      {/* Image Lightbox */}
      <ImageLightbox
        images={images}
        initialIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
      />
    </div>
  );
}
