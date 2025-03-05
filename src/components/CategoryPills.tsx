
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { categories } from '@/lib/wallpapers';

const CategoryPills = () => {
  const location = useLocation();
  const currentCategory = new URLSearchParams(location.search).get('category') || 'all';
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      
      // Check scroll position after animation
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-4 mb-8">
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto px-4 py-2 space-x-2 no-scrollbar"
        onScroll={checkScroll}
      >
        {categories.map(category => (
          <Link
            key={category.id}
            to={`/categories?category=${category.id}`}
            className={cn(
              'flex-shrink-0 px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium',
              currentCategory === category.id 
                ? 'bg-foreground text-white shadow-md' 
                : 'bg-secondary text-foreground/70 hover:bg-secondary/80'
            )}
          >
            {category.name}
          </Link>
        ))}
      </div>
      
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default CategoryPills;
