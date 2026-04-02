import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  
  // Use refs for coordinates to avoid re-renders on every frame
  const mouse = useRef({ x: 0, y: 0 });
  const follower = useRef({ x: 0, y: 0 });
  
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop/non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      // Move main dot instantly for responsiveness
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target is clickable/interactive
      const isClickable = target.closest('button') || 
                          target.closest('a') || 
                          target.closest('input') || 
                          target.closest('.cursor-pointer') ||
                          target.closest('[role="button"]') ||
                          target.closest('.group\\/slider'); // Special case for slider
      
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    // Animation Loop
    let rAF: number;
    
    const animate = () => {
      // Linear Interpolation (Lerp) for smooth following
      // Formula: Current + (Target - Current) * Speed
      follower.current.x += (mouse.current.x - follower.current.x) * 0.15;
      follower.current.y += (mouse.current.y - follower.current.y) * 0.15;

      if (followerRef.current) {
        // We handle scale here in JS to prevent transform conflict with CSS
        const scale = isHovering ? 1.8 : 1;
        followerRef.current.style.transform = `translate3d(${follower.current.x}px, ${follower.current.y}px, 0) scale(${scale})`;
      }

      rAF = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rAF);
    };
  }, [isHovering]); 

  if (!isVisible) return null;

  return (
    <>
      {/* Main Dot - Direct Follow */}
      <div 
        ref={cursorRef}
        // Light Mode: Gray-900, Dark Mode: Brand (Volt)
        className="fixed top-0 left-0 w-3 h-3 bg-gray-900 dark:bg-brand rounded-full pointer-events-none z-[100] -ml-1.5 -mt-1.5 mix-blend-difference"
      />
      
      {/* Follower Ring - Physics Follow */}
      <div 
        ref={followerRef}
        className={`fixed top-0 left-0 w-8 h-8 border rounded-full pointer-events-none z-[99] -ml-4 -mt-4 transition-colors duration-300 ease-out will-change-transform
          ${isHovering 
            ? 'bg-gray-900/10 dark:bg-brand/20 border-transparent' 
            : 'border-gray-900 dark:border-brand'
          }
        `}
      />
    </>
  );
};