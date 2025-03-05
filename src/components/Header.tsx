
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import SearchBar from './SearchBar';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8',
        isScrolled || menuOpen || searchOpen
          ? 'py-3 bg-white/80 backdrop-blur-lg shadow-sm' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="text-xl md:text-2xl font-semibold tracking-tight animate-fade-in">
            <span className="tracking-tighter">Wallpaper</span>
            <span className="font-light">Haven</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" active={location.pathname === '/'}>
            Home
          </NavLink>
          <NavLink to="/categories" active={location.pathname.includes('/categories')}>
            Categories
          </NavLink>
          <NavLink to="/favorites" active={location.pathname === '/favorites'}>
            Favorites
          </NavLink>
        </nav>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => {
              setSearchOpen(!searchOpen);
              setMenuOpen(false);
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <Link
            to="/favorites"
            className="hidden md:flex w-10 h-10 rounded-full items-center justify-center hover:bg-gray-100 transition-colors duration-200"
            aria-label="Favorites"
          >
            <Heart className="w-5 h-5" />
          </Link>
          
          <button
            onClick={() => {
              setMenuOpen(!menuOpen);
              setSearchOpen(false);
            }}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          'absolute left-0 right-0 bg-white/95 backdrop-blur-lg shadow-sm md:hidden transition-all duration-300 overflow-hidden px-4 py-3',
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="flex flex-col space-y-4 pt-2 pb-4">
          <MobileNavLink to="/" active={location.pathname === '/'}>
            Home
          </MobileNavLink>
          <MobileNavLink to="/categories" active={location.pathname.includes('/categories')}>
            Categories
          </MobileNavLink>
          <MobileNavLink to="/favorites" active={location.pathname === '/favorites'}>
            Favorites
          </MobileNavLink>
        </nav>
      </div>

      {/* Search Bar Overlay */}
      <div 
        className={cn(
          'absolute left-0 right-0 bg-white/95 backdrop-blur-lg shadow-sm transition-all duration-300 overflow-hidden px-4 py-3',
          searchOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <SearchBar onClose={() => setSearchOpen(false)} />
      </div>
    </header>
  );
};

const NavLink = ({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) => (
  <Link
    to={to}
    className={cn(
      'relative px-1 py-2 text-sm font-medium transition-colors hover:text-foreground/80',
      active ? 'text-foreground' : 'text-foreground/60',
      "animated-link"
    )}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) => (
  <Link
    to={to}
    className={cn(
      'px-1 py-2 text-base font-medium transition-colors',
      active ? 'text-foreground' : 'text-foreground/60'
    )}
  >
    {children}
  </Link>
);

export default Header;
