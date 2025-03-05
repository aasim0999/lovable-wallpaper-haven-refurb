
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onClose?: () => void;
  className?: string;
}

const SearchBar = ({ onClose, className }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      if (onClose) onClose();
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={`w-full flex items-center space-x-2 ${className}`}
    >
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search wallpapers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-2 pl-10 pr-4 bg-transparent border-b border-gray-200 focus:border-gray-400 focus:outline-none transition-colors"
          autoFocus
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default SearchBar;
