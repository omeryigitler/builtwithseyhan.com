import React, { useState, useRef, useEffect } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  alt: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ 
  beforeImage, 
  afterImage, 
  alt,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER"
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = 5;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setSliderPosition((current) => Math.max(0, current - step));
    }

    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setSliderPosition((current) => Math.min(100, current + step));
    }

    if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    }

    if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };
  
  const stopDragging = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', stopDragging);
      window.addEventListener('touchend', stopDragging);
    } else {
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchend', stopDragging);
    }
    return () => {
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchend', stopDragging);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label={`${beforeLabel} / ${afterLabel}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPosition)}
      className="relative w-full h-full overflow-hidden select-none cursor-ew-resize transform-gpu isolate focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onKeyDown={handleKeyDown}
    >
      {/* After Image (Background) */}
      <img 
        src={afterImage} 
        alt={`After ${alt}`} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        draggable={false}
      />
      
      {/* Label After - Slides in on hover */}
      <div className="absolute top-4 right-4 text-white text-[10px] font-black tracking-[0.2em] z-10 pointer-events-none drop-shadow-md transition-all duration-500 opacity-60 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100">
        {afterLabel}
      </div>

      {/* Before Image (Foreground - Clipped) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={beforeImage} 
          alt={`Before ${alt}`} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          draggable={false}
        />
        {/* Label Before - Slides in on hover */}
        <div className="absolute top-4 left-4 text-white text-[10px] font-black tracking-[0.2em] z-10 pointer-events-none drop-shadow-md transition-all duration-500 opacity-60 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100">
            {beforeLabel}
        </div>
      </div>

      {/* Slider Handle - Interactive Glow */}
      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-white/50 group-hover:bg-brand cursor-ew-resize z-20 flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.2)] transition-colors duration-300"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-lg transform transition-all duration-300 group-hover:scale-125 group-hover:bg-brand group-hover:text-black">
            <ChevronsLeftRight size={14} className="text-gray-900 group-hover:text-black transition-colors" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};
