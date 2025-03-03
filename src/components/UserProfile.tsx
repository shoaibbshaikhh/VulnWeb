import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User as UserIcon, Mail, Shield, AlertTriangle, Key } from 'lucide-react';
import { User, getUserById } from '@/data/mockData';
import { useParams, Link } from 'react-router-dom';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const { id } = useParams<{ id?: string }>();
  
  useEffect(() => {
    // Load the current user from local storage (vulnerable)
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      setCurrentUser(JSON.parse(userString));
    }
    
    // If ID is provided in URL, load that user (IDOR vulnerability)
    // Otherwise load the current user
    if (id) {
      const userId = parseInt(id, 10);
      const fetchedUser = getUserById(userId);
      
      if (fetchedUser) {
        setUser(fetchedUser);
        
        // Show warning if accessing another user's profile
        if (currentUser && fetchedUser.id !== currentUser.id) {
          setShowWarning(true);
        }
      }
    } else if (currentUser) {
      setUser(currentUser);
    }
  }, [id, currentUser]);

  if (!user) {
    return (
      <div className="w-full max-w-md mx-auto text-center my-8">
        <div className="cyber-panel p-6">
          <h2 className="text-xl font-bold mb-4">User Not Found</h2>
          <Link to="/login" className="cyber-button">Login to View Profile</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="cyber-panel p-6"
      >
        {showWarning && (
          <div className="mb-4 p-3 bg-cyber-red/20 border border-cyber-red/30 rounded-md flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-cyber-red" />
            <p className="text-sm text-cyber-red">
              You've accessed another user's profile through an IDOR vulnerability!
            </p>
          </div>
        )}
        
        <div className="text-center mb-6">
          <div className="w-24 h-24 rounded-full border-2 border-cyber-teal/50 mx-auto mb-4 overflow-hidden">
            <img 
              src={user.avatar} 
              alt={user.username}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold cyber-text-gradient">{user.username}</h2>
          <div className="flex items-center justify-center gap-1 text-muted-foreground">
            <span className={`px-2 py-1 text-xs rounded-full ${
              user.role === 'admin' 
                ? 'bg-cyber-red/20 text-cyber-red' 
                : 'bg-cyber-blue/20 text-cyber-blue'
            }`}>
              {user.role.toUpperCase()}
            </span>
            <span className="text-xs">
              Since {new Date(user.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-md bg-cyber-dark-blue/40 border border-cyber-teal/10">
            <Mail className="h-5 w-5 text-cyber-teal" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p>{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-md bg-cyber-dark-blue/40 border border-cyber-teal/10">
            <UserIcon className="h-5 w-5 text-cyber-teal" />
            <div>
              <p className="text-xs text-muted-foreground">User ID</p>
              <p>{user.id}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-md bg-cyber-dark-blue/40 border border-cyber-teal/10">
            <Key className="h-5 w-5 text-cyber-teal" />
            <div>
              <p className="text-xs text-muted-foreground">Password (Exposed!)</p>
              <p className="font-mono">{user.password}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-md bg-cyber-dark-blue/40 border border-cyber-teal/10">
            <Shield className="h-5 w-5 text-cyber-teal" />
            <div>
              <p className="text-xs text-muted-foreground">Permissions</p>
              <p>{user.role === 'admin' ? 'Full System Access' : 'Limited Access'}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-sm text-muted-foreground border-t border-cyber-teal/20 pt-4">
          <p>
            This profile page contains IDOR vulnerabilities allowing any user ID to be accessed 
            directly via the URL parameter: <code className="text-cyber-teal">/profile/[id]</code>
          </p>
          <p className="mt-2">
            Try accessing other profiles:
            <Link to="/profile/1" className="ml-2 text-cyber-blue hover:text-cyber-teal">Admin (ID: 1)</Link>
            <Link to="/profile/2" className="ml-2 text-cyber-blue hover:text-cyber-teal">Alice (ID: 2)</Link>
            <Link to="/profile/3" className="ml-2 text-cyber-blue hover:text-cyber-teal">Bob (ID: 3)</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;
