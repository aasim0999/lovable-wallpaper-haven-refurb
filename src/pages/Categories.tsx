
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import WallpaperGrid from '@/components/WallpaperGrid';
import CategoryPills from '@/components/CategoryPills';
import { getWallpapersByCategory } from '@/lib/wallpapers';

const Categories = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category') || 'all';
  
  const wallpapers = getWallpapersByCategory(category);
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  
  useEffect(() => {
    // Smooth scroll to top when category changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <section className="mt-8 md:mt-16 text-center animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
              {category === 'all' ? 'All Wallpapers' : `${categoryName} Wallpapers`}
            </h1>
            <p className="text-foreground/70 max-w-xl mx-auto mb-8">
              {category === 'all' 
                ? 'Browse our complete collection of high-quality wallpapers'
                : `Explore our curated collection of ${categoryName.toLowerCase()} wallpapers`}
            </p>
          </section>
          
          <CategoryPills />

          <WallpaperGrid 
            wallpapers={wallpapers} 
            className="mb-16"
            emptyMessage={`No wallpapers found in the ${categoryName.toLowerCase()} category.`}
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

export default Categories;
