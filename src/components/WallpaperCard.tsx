
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import LazyImage from './LazyImage';
import { Wallpaper } from '@/lib/wallpapers';
import { useFavorites } from '@/context/FavoritesContext';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  aspectRatio?: 'square' | 'video' | 'wide' | 'tall';
  className?: string;
}

const WallpaperCard = ({ 
  wallpaper, 
  aspectRatio = 'square',
  className 
}: WallpaperCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(wallpaper.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(wallpaper.id);
  };

  return (
    <Link
      to={`/detail/${wallpaper.id}`}
      className={cn(
        'group relative block overflow-hidden rounded-2xl transition-all duration-300 hover-scale',
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <LazyImage
        src={wallpaper.thumbnail}
        alt={wallpaper.title}
        aspectRatio={aspectRatio}
      />
      
      <div className={cn(
        'absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300',
        isHovering ? 'opacity-100' : 'opacity-0 sm:opacity-70'
      )} />
      
      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        <div className="self-end">
          <button
            onClick={handleFavoriteClick}
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
              isHovering ? 'opacity-100 bg-black/20 backdrop-blur-sm' : 'opacity-0 sm:opacity-70',
              isFavorite ? 'text-red-500' : 'text-white'
            )}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn('w-5 h-5', isFavorite ? 'fill-current' : '')} />
          </button>
        </div>
        
        <div className={cn(
          'transform transition-all duration-300',
          isHovering ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 sm:opacity-100 sm:translate-y-0'
        )}>
          <h3 className="text-white font-medium truncate">{wallpaper.title}</h3>
          <p className="text-white/70 text-sm mt-1">{wallpaper.category.charAt(0).toUpperCase() + wallpaper.category.slice(1)}</p>
        </div>
      </div>
    </Link>
  );
};

export default WallpaperCard;
