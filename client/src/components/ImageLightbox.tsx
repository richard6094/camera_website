import { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageLightbox({ images, initialIndex, isOpen, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  // Pinch-to-zoom state
  const [initialDistance, setInitialDistance] = useState(0);
  const [initialScale, setInitialScale] = useState(1);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        setScale(prev => Math.min(prev + 0.1, 3));
      } else {
        setScale(prev => Math.max(prev - 0.1, 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen, currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Calculate distance between two touch points
  const getDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Handle touch start for pinch-to-zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch gesture started
      e.preventDefault();
      const distance = getDistance(e.touches[0], e.touches[1]);
      setInitialDistance(distance);
      setInitialScale(scale);
      setIsDragging(false);
    } else if (e.touches.length === 1 && scale > 1) {
      // Single touch for panning when zoomed
      setIsDragging(true);
      setDragStart({ 
        x: e.touches[0].clientX - position.x, 
        y: e.touches[0].clientY - position.y 
      });
    } else if (e.touches.length === 1) {
      // Single touch for swipe navigation
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: 0 });
    }
  };

  // Handle touch move for pinch-to-zoom and panning
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialDistance > 0) {
      // Pinch zoom
      e.preventDefault();
      const distance = getDistance(e.touches[0], e.touches[1]);
      const newScale = Math.min(Math.max((distance / initialDistance) * initialScale, 1), 3);
      setScale(newScale);
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      // Pan when zoomed
      e.preventDefault();
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  // Handle touch end
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      // All touches released
      if (initialDistance > 0) {
        // End of pinch gesture
        setInitialDistance(0);
        setInitialScale(1);
      } else if (isDragging && scale === 1) {
        // End of swipe gesture for navigation
        const deltaX = e.changedTouches[0].clientX - dragStart.x;
        if (Math.abs(deltaX) > 50) {
          if (deltaX > 0) {
            handlePrevious();
          } else {
            handleNext();
          }
        }
      }
      setIsDragging(false);
    } else if (e.touches.length === 1) {
      // One finger still touching (transition from pinch to pan)
      setInitialDistance(0);
      if (scale > 1) {
        setIsDragging(true);
        setDragStart({ 
          x: e.touches[0].clientX - position.x, 
          y: e.touches[0].clientY - position.y 
        });
      }
    }
  };

  // Handle mouse drag for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ 
        x: e.clientX - position.x, 
        y: e.clientY - position.y 
      });
    } else {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: 0 });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isDragging && scale === 1) {
      const deltaX = e.clientX - dragStart.x;
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          handlePrevious();
        } else {
          handleNext();
        }
      }
    }
    setIsDragging(false);
  };

  // Reset position when scale changes back to 1
  useEffect(() => {
    if (scale === 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [scale]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[110] p-2 sm:p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full damped-transition"
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
      </button>

      {/* Navigation Buttons */}
      {images.length > 1 && scale === 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-[110] p-2 sm:p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full damped-transition"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-[110] p-2 sm:p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full damped-transition"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
          </button>
        </>
      )}

      {/* Image Counter */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[110] px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
        <p className="text-white text-xs sm:text-sm tracking-wider">
          {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </p>
      </div>

      {/* Zoom Indicator */}
      {scale > 1 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[110] px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
          <p className="text-white text-xs sm:text-sm tracking-wider">
            {Math.round(scale * 100)}%
          </p>
        </div>
      )}

      {/* Image Container */}
      <div 
        ref={imageContainerRef}
        className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 md:p-12"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: scale > 1 ? 'none' : 'pan-y' }}
      >
        <img
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain select-none"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            transition: isDragging || initialDistance > 0 ? 'none' : 'transform 0.3s ease-out',
            cursor: isDragging ? 'grabbing' : scale > 1 ? 'grab' : 'default',
          }}
          draggable={false}
        />
      </div>

      {/* Instructions */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[110] px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
        <p className="text-white/70 text-xs tracking-wider hidden sm:block">
          滚轮缩放 · ESC 关闭
        </p>
        <p className="text-white/70 text-xs tracking-wider sm:hidden">
          双指缩放 · 单指拖动
        </p>
      </div>
    </div>
  );
}
