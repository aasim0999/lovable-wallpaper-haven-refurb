
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import WallpaperGrid from '@/components/WallpaperGrid';
import SearchBar from '@/components/SearchBar';
import { searchWallpapers } from '@/lib/wallpapers';

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';
  
  const wallpapers = searchWallpapers(query);
  
  useEffect(() => {
    // Smooth scroll to top when search query changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [query]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <section className="mt-8 md:mt-16 text-center animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">Search Results</h1>
            
            <div className="max-w-xl mx-auto mb-8">
              <SearchBar className="bg-secondary/50 rounded-lg p-2" />
            </div>
            
            <p className="text-foreground/70">
              Found {wallpapers.length} {wallpapers.length === 1 ? 'result' : 'results'} for "{query}"
            </p>
          </section>

          <WallpaperGrid 
            wallpapers={wallpapers} 
            className="mt-12 mb-16"
            emptyMessage={`No wallpapers found matching "${query}". Try a different search term.`}
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

export default Search;
