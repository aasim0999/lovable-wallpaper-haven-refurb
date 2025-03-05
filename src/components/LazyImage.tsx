
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'tall';
}

const LazyImage = ({ src, alt, className, aspectRatio = 'square' }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[16/9]',
    tall: 'aspect-[9/16]'
  };

  return (
    <div 
      className={cn(
        'relative overflow-hidden bg-muted rounded-lg',
        aspectRatioClasses[aspectRatio],
        className
      )}
    >
      {!error ? (
        <>
          <div className={cn(
            'absolute inset-0 bg-gray-200 animate-pulse-light',
            loaded ? 'opacity-0' : 'opacity-100'
          )} />
          <img
            src={src}
            alt={alt}
            className={cn(
              'w-full h-full object-cover transition-all duration-500',
              loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            )}
          />
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full text-muted-foreground text-sm">
          Failed to load image
        </div>
      )}
    </div>
  );
};

export default LazyImage;
