import React, { useEffect, useRef } from 'react';

export const ScrollProgress: React.FC = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight =
          document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${Math.min(Math.max(scroll, 0), 1)})`;
        }
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 z-[60] bg-transparent pointer-events-none">
      <div
        ref={progressRef}
        className="h-full origin-left scale-x-0 bg-brand shadow-[0_2px_10px_rgba(0,0,0,0.2)] transition-transform duration-100 ease-out"
      />
    </div>
  );
};
