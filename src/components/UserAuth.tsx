
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn, AlertTriangle } from 'lucide-react';
import { authenticateUser } from '@/data/mockData';

const UserAuth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      const user = authenticateUser(username, password);
      if (user) {
        // Vulnerable: Store user data in localStorage without proper session management
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate('/profile');
      } else {
        setError('Invalid username or password');
      }
    } else {
      // Registration would go here, but for demo purposes we just show a message
      setError('Registration functionality is not implemented yet');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="cyber-panel p-8"
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold cyber-text-gradient">
            {isLogin ? 'Login to Your Account' : 'Create New Account'}
          </h2>
          <p className="text-muted-foreground mt-2">
            {isLogin 
              ? 'Enter your credentials to access the system' 
              : 'Register for a new account to get started'}
          </p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-cyber-red/20 border border-cyber-red/30 rounded-md flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-cyber-red" />
            <p className="text-sm text-cyber-red">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="cyber-input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">Try username: admin, password: admin123</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="cyber-input pr-10"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full cyber-button py-3 flex items-center justify-center gap-2"
            >
              <LogIn className="h-5 w-5" />
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-cyber-blue hover:text-cyber-teal transition-colors"
          >
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
          </button>
        </div>
        
        <div className="mt-6 border-t border-cyber-teal/20 pt-4">
          <p className="text-xs text-muted-foreground text-center">
            This login page contains several security vulnerabilities including:
            <br />
            - Plain text password storage
            <br />
            - Weak password requirements
            <br />
            - Insecure session management
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default UserAuth;
