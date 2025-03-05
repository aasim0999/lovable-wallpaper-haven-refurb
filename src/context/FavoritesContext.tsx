
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    // Load favorites from localStorage on initial render
    const savedFavorites = localStorage.getItem('wallpaper-favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Update localStorage when favorites change
  useEffect(() => {
    localStorage.setItem('wallpaper-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(favoriteId => favoriteId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const clearFavorites = () => {
    setFavorites([]);
    toast({
      title: "Favorites cleared",
      description: "All favorites have been removed.",
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
