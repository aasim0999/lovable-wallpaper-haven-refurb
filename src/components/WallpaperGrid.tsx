
import { useState, useEffect } from 'react';
import WallpaperCard from './WallpaperCard';
import { Wallpaper } from '@/lib/wallpapers';
import { cn } from '@/lib/utils';

interface WallpaperGridProps {
  wallpapers: Wallpaper[];
  className?: string;
  emptyMessage?: string;
}

const WallpaperGrid = ({ 
  wallpapers, 
  className,
  emptyMessage = "No wallpapers found."
}: WallpaperGridProps) => {
  const [visibleWallpapers, setVisibleWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset visibility state when wallpapers change
    setVisibleWallpapers([]);
    setLoading(true);
    
    // Simulate staggered loading for better perceived performance
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Load wallpapers in batches
      const loadWallpapers = () => {
        const batch = 4; // Number of wallpapers to load at once
        setVisibleWallpapers(prev => {
          if (prev.length >= wallpapers.length) return prev;
          return [...wallpapers.slice(0, prev.length + batch)];
        });
      };
      
      // Load initial batch
      loadWallpapers();
      
      // Set up intersection observer for infinite scroll
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && visibleWallpapers.length < wallpapers.length) {
          loadWallpapers();
        }
      }, { rootMargin: '200px' });
      
      // Observe the sentinel element
      const sentinel = document.getElementById('scroll-sentinel');
      if (sentinel) observer.observe(sentinel);
      
      return () => {
        if (sentinel) observer.unobserve(sentinel);
      };
    }, 300);
    
    return () => clearTimeout(timer);
  }, [wallpapers]);

  if (wallpapers.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn("max-w-7xl mx-auto", className)}>
      <div className="wallpaper-grid stagger-fade-in">
        {visibleWallpapers.map((wallpaper, index) => (
          <WallpaperCard
            key={wallpaper.id}
            wallpaper={wallpaper}
            aspectRatio={index % 5 === 0 ? 'wide' : 'square'}
          />
        ))}
        
        {/* Loading skeletons */}
        {loading && Array.from({ length: 8 }).map((_, index) => (
          <div 
            key={`skeleton-${index}`}
            className="rounded-2xl bg-muted/60 animate-pulse aspect-square"
          />
        ))}
      </div>
      
      {visibleWallpapers.length < wallpapers.length && (
        <div id="scroll-sentinel" className="h-10" />
      )}
    </div>
  );
};

export default WallpaperGrid;
