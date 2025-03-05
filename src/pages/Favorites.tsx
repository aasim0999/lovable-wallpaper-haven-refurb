
import { useEffect } from 'react';
import Header from '@/components/Header';
import WallpaperGrid from '@/components/WallpaperGrid';
import { useFavorites } from '@/context/FavoritesContext';
import { getWallpaperById } from '@/lib/wallpapers';
import { TrashIcon } from 'lucide-react';

const Favorites = () => {
  const { favorites, clearFavorites } = useFavorites();
  
  // Get full wallpaper objects from IDs
  const favoriteWallpapers = favorites
    .map(id => getWallpaperById(id))
    .filter(wallpaper => wallpaper !== undefined);
  
  useEffect(() => {
    // Smooth scroll to top on page load
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <section className="mt-8 md:mt-16 text-center animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Your Favorites</h1>
            <p className="text-foreground/70 max-w-xl mx-auto mb-8">
              Your personally curated collection of favorite wallpapers.
            </p>
            
            {favorites.length > 0 && (
              <button
                onClick={clearFavorites}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
              >
                <TrashIcon className="w-4 h-4" />
                <span>Clear All Favorites</span>
              </button>
            )}
          </section>

          <WallpaperGrid 
            wallpapers={favoriteWallpapers} 
            className="mt-12 mb-16"
            emptyMessage="You haven't saved any favorites yet. Browse wallpapers and click the heart icon to add them here."
          />
        </div>
      </main>
      
      <footer className="py-8 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-foreground/60">
          <p>© {new Date().getFullYear()} Wallpaper Haven. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Favorites;
