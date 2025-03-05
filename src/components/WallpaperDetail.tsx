
import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Download, Share } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Wallpaper } from '@/lib/wallpapers';
import { useFavorites } from '@/context/FavoritesContext';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface WallpaperDetailProps {
  wallpaper: Wallpaper;
}

const WallpaperDetail = ({ wallpaper }: WallpaperDetailProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isFavorite = favorites.includes(wallpaper.id);

  // Toggle controls visibility on mobile after a delay
  useEffect(() => {
    if (imageLoaded) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [imageLoaded]);

  const handleFavoriteClick = () => {
    toggleFavorite(wallpaper.id);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Wallpaper has been removed from your favorites." : "Wallpaper has been added to your favorites.",
      duration: 2000,
    });
  };

  const handleDownload = () => {
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = wallpaper.url;
    link.download = `${wallpaper.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: "Your wallpaper is being downloaded.",
      duration: 2000,
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: wallpaper.title,
          text: `Check out this awesome wallpaper: ${wallpaper.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Wallpaper link copied to clipboard.",
        duration: 2000,
      });
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {/* Background with blur effect */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-30 scale-110"
          style={{ backgroundImage: `url(${wallpaper.url})` }}
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Controls header - always visible on desktop, auto-hide on mobile */}
        <div 
          className={cn(
            "fixed top-0 left-0 right-0 z-20 transition-transform duration-500 md:transform-none",
            showControls ? 'transform-none' : '-translate-y-full'
          )}
          onClick={() => setShowControls(true)}
        >
          <div className="backdrop-blur-md bg-background/50 p-4 md:py-5 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            
            <div className="flex items-center space-x-2">
              <h1 className="text-base md:text-lg font-medium">{wallpaper.title}</h1>
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={handleFavoriteClick}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={cn('w-5 h-5', isFavorite ? 'fill-red-500 text-red-500' : 'text-foreground')} />
              </button>
              
              <button
                onClick={handleDownload}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors"
                aria-label="Download wallpaper"
              >
                <Download className="w-5 h-5 text-foreground" />
              </button>
              
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors"
                aria-label="Share wallpaper"
              >
                <Share className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Image container */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8 pt-20 md:pt-28 pb-16">
          <div 
            className="relative max-w-5xl w-full h-full flex items-center justify-center"
            onClick={() => setShowControls(!showControls)}
          >
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            )}
            <img
              src={wallpaper.url}
              alt={wallpaper.title}
              className={cn(
                "max-w-full max-h-[80vh] shadow-2xl rounded-lg object-contain transition-opacity duration-500",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>
        
        {/* Bottom info panel */}
        <div className="fixed bottom-0 left-0 right-0 z-20 backdrop-blur-md bg-background/50 p-4 md:p-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs px-2 py-1 bg-black/10 rounded-full">
                  {wallpaper.category.charAt(0).toUpperCase() + wallpaper.category.slice(1)}
                </span>
                {wallpaper.author && (
                  <span className="text-xs text-foreground/70">By {wallpaper.author}</span>
                )}
              </div>
              
              {wallpaper.description && (
                <p className="mt-2 text-sm text-foreground/80 line-clamp-2 md:line-clamp-1">
                  {wallpaper.description}
                </p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleFavoriteClick}
                className="flex-1 md:flex-none px-4 py-2 rounded-lg md:rounded-full flex items-center justify-center space-x-2 bg-black/10 hover:bg-black/20 transition-colors"
              >
                <Heart className={cn('w-5 h-5', isFavorite ? 'fill-red-500 text-red-500' : 'text-foreground')} />
                <span>{isFavorite ? "Saved" : "Save"}</span>
              </button>
              
              <button
                onClick={handleDownload}
                className="flex-1 md:flex-none px-4 py-2 rounded-lg md:rounded-full flex items-center justify-center space-x-2 bg-foreground text-background hover:bg-foreground/90 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperDetail;
