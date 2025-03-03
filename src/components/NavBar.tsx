import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Search, User, MessageSquare, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: 'Dashboard', path: '/', icon: <Shield className="w-5 h-5" /> },
    { name: 'Search', path: '/search', icon: <Search className="w-5 h-5" /> },
    { name: 'Profile', path: '/profile', icon: <User className="w-5 h-5" /> },
    { name: 'Comments', path: '/comments', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Login', path: '/login', icon: <LogIn className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-cyber-dark-blue/80 backdrop-blur-md border-b border-cyber-teal/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-cyber-teal to-cyber-blue flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyber-dark" />
              </div>
              <div>
                <span className="text-xl font-bold cyber-text-gradient">VulnWeb</span>
                <p className="text-sm text-gray-400">
                Learn & Fix Common Security Flaws.
                </p>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                    location.pathname === link.path 
                      ? "text-cyber-teal border-b-2 border-cyber-teal" 
                      : "text-gray-300 hover:text-cyber-teal"
                  )}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-cyber-teal hover:bg-cyber-dark-blue"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-cyber-dark-blue/90 backdrop-blur-md border-b border-cyber-teal/20 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-all duration-200",
                  location.pathname === link.path 
                    ? "text-cyber-teal bg-cyber-dark/50" 
                    : "text-gray-300 hover:text-cyber-teal hover:bg-cyber-dark/30"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;