
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWallpaperById } from '@/lib/wallpapers';
import WallpaperDetail from '@/components/WallpaperDetail';

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const wallpaper = getWallpaperById(id || '');
  
  // If wallpaper not found, redirect to home
  useEffect(() => {
    if (!wallpaper && !isLoading) {
      navigate('/', { replace: true });
    }
  }, [wallpaper, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!wallpaper) {
    return null; // Will redirect
  }
  
  return <WallpaperDetail wallpaper={wallpaper} />;
};

export default Detail;
