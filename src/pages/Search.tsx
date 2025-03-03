
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import SearchBar from '@/components/SearchBar';
import { User } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User as UserIcon, Database } from 'lucide-react';

const Search = () => {
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const handleSearchResults = (results: User[]) => {
    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-cyber-dark cyber-grid-bg">
      <NavBar />
      
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold cyber-text-gradient mb-3">User Search</h1>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            This search functionality is vulnerable to SQL injection attacks. Try searching with <code className="bg-cyber-dark-blue/80 px-1 py-0.5 rounded">' OR '1'='1</code>
          </p>
        </div>
        
        <SearchBar onSearchResults={handleSearchResults} />
        
        <AnimatePresence>
          {hasSearched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="cyber-panel p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Database className="h-5 w-5 text-cyber-teal" />
                <h2 className="text-xl font-bold">Search Results</h2>
                <span className="text-sm text-muted-foreground ml-2">
                  Found {searchResults.length} users
                </span>
              </div>
              
              {searchResults.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No users found matching your query
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.map((user) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-4 p-4 bg-cyber-dark-blue/40 rounded-md border border-cyber-teal/10"
                    >
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-12 h-12 rounded-full border border-cyber-teal/30"
                      />
                      <div>
                        <h3 className="font-medium text-cyber-teal flex items-center gap-1">
                          {user.username}
                          {user.role === 'admin' && (
                            <span className="bg-cyber-red/20 text-cyber-red text-xs px-2 py-0.5 rounded-full">
                              ADMIN
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="ml-auto">
                        <Link
                          to={`/profile/${user.id}`}
                          className="text-cyber-blue hover:text-cyber-teal transition-colors text-sm flex items-center gap-1"
                        >
                          <UserIcon className="h-4 w-4" />
                          View
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              <div className="mt-6 border-t border-cyber-teal/20 pt-4">
                <p className="text-xs text-muted-foreground">
                  This search feature contains SQL injection vulnerabilities due to unsanitized user input in database queries.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Search;
