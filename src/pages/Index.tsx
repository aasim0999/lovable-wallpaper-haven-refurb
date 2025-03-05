
import { useEffect } from 'react';
import Header from '@/components/Header';
import WallpaperGrid from '@/components/WallpaperGrid';
import CategoryPills from '@/components/CategoryPills';
import { getFeaturedWallpapers } from '@/lib/wallpapers';

const Index = () => {
  const featuredWallpapers = getFeaturedWallpapers();
  
  useEffect(() => {
    // Smooth scroll to top on page load
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <section className="mt-8 md:mt-16 text-center stagger-fade-in">
            <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-secondary text-foreground/70 mb-4">Premium Collection</span>
            <h1 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">Discover Beautiful Wallpapers</h1>
            <p className="text-foreground/70 max-w-xl mx-auto mb-8">
              Curated selection of stunning, high-quality wallpapers for your devices.
            </p>
          </section>
          
          <CategoryPills />

          <WallpaperGrid 
            wallpapers={featuredWallpapers} 
            className="mb-16"
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

export default Index;
