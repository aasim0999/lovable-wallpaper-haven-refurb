
export interface Wallpaper {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  category: string;
  featured: boolean;
  description?: string;
  author?: string;
  downloadCount?: number;
}

export const categories = [
  { id: 'all', name: 'All' },
  { id: 'nature', name: 'Nature' },
  { id: 'abstract', name: 'Abstract' },
  { id: 'architecture', name: 'Architecture' },
  { id: 'minimalist', name: 'Minimalist' },
  { id: 'space', name: 'Space' },
];

export const wallpapers: Wallpaper[] = [
  {
    id: '1',
    title: 'Serene Mountain Lake',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=500',
    category: 'nature',
    featured: true,
    description: 'A tranquil mountain lake surrounded by majestic peaks, perfect for a peaceful desktop background.',
    author: 'Nature Explorer',
    downloadCount: 1254
  },
  {
    id: '2',
    title: 'Geometric Abstraction',
    url: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=2070',
    thumbnail: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=500',
    category: 'abstract',
    featured: true,
    description: 'Bold geometric patterns with vibrant colors create a modern and stylish desktop background.',
    author: 'Abstract Artist',
    downloadCount: 987
  },
  {
    id: '3',
    title: 'Modern Architecture',
    url: 'https://images.unsplash.com/photo-1470723710355-95304d8aece4?q=80&w=2070',
    thumbnail: 'https://images.unsplash.com/photo-1470723710355-95304d8aece4?q=80&w=500',
    category: 'architecture',
    featured: false,
    description: 'Sleek lines and dramatic angles of modern architectural masterpieces.',
    author: 'Urban Photographer',
    downloadCount: 765
  },
  {
    id: '4',
    title: 'Minimalist Sunset',
    url: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?q=80&w=2070',
    thumbnail: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?q=80&w=500',
    category: 'minimalist',
    featured: true,
    description: 'A clean, minimalist sunset scene with a perfect horizon line.',
    author: 'Minimalist Designer',
    downloadCount: 1432
  },
  {
    id: '5',
    title: 'Cosmic Nebula',
    url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2027',
    thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=500',
    category: 'space',
    featured: true,
    description: 'A mesmerizing cosmic nebula with swirling colors and distant stars.',
    author: 'Astrophotographer',
    downloadCount: 2341
  },
  {
    id: '6',
    title: 'Forest Waterfall',
    url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070',
    thumbnail: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=500',
    category: 'nature',
    featured: false,
    description: 'A hidden waterfall in a lush forest setting with green foliage.',
    author: 'Nature Explorer',
    downloadCount: 876
  },
  {
    id: '7',
    title: 'Liquid Art',
    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070',
    thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=500',
    category: 'abstract',
    featured: true,
    description: 'Fluid abstract art with vibrant colors blending together.',
    author: 'Digital Artist',
    downloadCount: 1678
  },
  {
    id: '8',
    title: 'Urban Skyline',
    url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2113',
    thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=500',
    category: 'architecture',
    featured: true,
    description: 'A dramatic city skyline view captured during the golden hour.',
    author: 'Urban Photographer',
    downloadCount: 2134
  },
  {
    id: '9',
    title: 'Minimal Workspace',
    url: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=2071',
    thumbnail: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=500',
    category: 'minimalist',
    featured: false,
    description: 'Clean, minimalist workspace with essential items perfectly arranged.',
    author: 'Minimal Designer',
    downloadCount: 987
  },
  {
    id: '10',
    title: 'Milky Way Galaxy',
    url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2013',
    thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=500',
    category: 'space',
    featured: true,
    description: 'The stunning Milky Way galaxy stretching across the night sky.',
    author: 'Astrophotographer',
    downloadCount: 3421
  },
  {
    id: '11',
    title: 'Mountain Peak',
    url: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2076',
    thumbnail: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=500',
    category: 'nature',
    featured: true,
    description: 'A majestic mountain peak rising above the clouds at sunrise.',
    author: 'Mountain Climber',
    downloadCount: 1543
  },
  {
    id: '12',
    title: 'Color Explosion',
    url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070',
    thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=500',
    category: 'abstract',
    featured: false,
    description: 'An explosion of vibrant colors creating a dynamic abstract composition.',
    author: 'Color Artist',
    downloadCount: 876
  }
];

export const getWallpaperById = (id: string): Wallpaper | undefined => {
  return wallpapers.find(wallpaper => wallpaper.id === id);
};

export const getWallpapersByCategory = (category: string): Wallpaper[] => {
  if (category === 'all') {
    return wallpapers;
  }
  return wallpapers.filter(wallpaper => wallpaper.category === category);
};

export const getFeaturedWallpapers = (): Wallpaper[] => {
  return wallpapers.filter(wallpaper => wallpaper.featured);
};

export const searchWallpapers = (query: string): Wallpaper[] => {
  const lowercaseQuery = query.toLowerCase();
  return wallpapers.filter(
    wallpaper => 
      wallpaper.title.toLowerCase().includes(lowercaseQuery) || 
      wallpaper.category.toLowerCase().includes(lowercaseQuery) ||
      (wallpaper.description && wallpaper.description.toLowerCase().includes(lowercaseQuery))
  );
};
