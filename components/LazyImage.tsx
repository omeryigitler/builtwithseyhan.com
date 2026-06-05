import React, { useEffect, useRef, useState } from 'react';

type LazyImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string;
  rootMargin?: string;
};

export const LazyImage: React.FC<LazyImageProps> = ({ src, rootMargin = '400px', ...props }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [activeSrc, setActiveSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!imageRef.current) return;

    if (!('IntersectionObserver' in window)) {
      setActiveSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSrc(src);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(imageRef.current);

    return () => observer.disconnect();
  }, [src, rootMargin]);

  return <img ref={imageRef} src={activeSrc} {...props} />;
};
