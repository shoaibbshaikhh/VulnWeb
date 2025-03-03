
import React, { useState } from 'react';
import { Search, AlertTriangle } from 'lucide-react';
import { searchUsers, User } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearchResults: (results: User[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demonstrate vulnerability by showing a warning for SQL injection attempts
    if (query.includes("'") || query.includes('"')) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000);
    }
    
    const results = searchUsers(query);
    onSearchResults(results);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="cyber-input pl-10 pr-16"
            placeholder="Search users... (Try: ' OR '1'='1)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center px-4 text-cyber-teal hover:text-cyber-blue transition-colors"
          >
            Search
          </button>
        </div>
        
        <AnimatePresence>
          {showWarning && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 p-2 bg-cyber-red/20 border border-cyber-red/30 rounded-md flex items-center gap-2"
            >
              <AlertTriangle className="h-4 w-4 text-cyber-red" />
              <p className="text-sm text-cyber-red">
                Potential SQL injection detected! This input is vulnerable.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default SearchBar;
