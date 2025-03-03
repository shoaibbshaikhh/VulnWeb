
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, AlertCircle } from 'lucide-react';
import { getComments, addComment, Comment, users } from '@/data/mockData';

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  
  useEffect(() => {
    // Get initial comments
    setComments(getComments());
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vulnerable: Check for potential XSS without actually sanitizing
    if (newComment.includes('<script>') || newComment.includes('</script>')) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000);
    }
    
    // Get current user from localStorage (vulnerable storage)
    const userString = localStorage.getItem('currentUser');
    const userId = userString ? JSON.parse(userString).id : 2; // Default to Alice if not logged in
    
    // Add comment without proper sanitization
    const comment = addComment(userId, newComment);
    setComments([...comments, comment]);
    setNewComment('');
  };
  
  // Helper to get username from user_id
  const getUserName = (userId: number): string => {
    const user = users.find(u => u.id === userId);
    return user ? user.username : 'Unknown User';
  };
  
  // Helper to get avatar from user_id
  const getUserAvatar = (userId: number): string => {
    const user = users.find(u => u.id === userId);
    return user ? user.avatar : '';
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="cyber-panel p-6"
      >
        <h2 className="text-2xl font-bold cyber-text-gradient mb-6">Comments</h2>
        
        {showWarning && (
          <div className="mb-4 p-3 bg-cyber-red/20 border border-cyber-red/30 rounded-md flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-cyber-red" />
            <p className="text-sm text-cyber-red">
              Potential XSS attack detected! This comment system is vulnerable to script injection.
            </p>
          </div>
        )}
        
        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2 cyber-scrollbar">
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-3 p-3 bg-cyber-dark-blue/40 rounded-md border border-cyber-teal/10"
            >
              <div className="flex-shrink-0">
                <img
                  src={getUserAvatar(comment.user_id)}
                  alt={getUserName(comment.user_id)}
                  className="w-10 h-10 rounded-full border border-cyber-teal/30"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-cyber-teal">{getUserName(comment.user_id)}</h4>
                  <span className="text-xs text-muted-foreground">
                    {new Date(comment.created_at).toLocaleString()}
                  </span>
                </div>
                {/* Vulnerable: Directly renders HTML without sanitization */}
                <div dangerouslySetInnerHTML={{ __html: comment.text }} />
              </div>
            </motion.div>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            className="cyber-input flex-1"
            placeholder="Add a comment... (Try: <script>alert('XSS')</script>)"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
          <button
            type="submit"
            className="cyber-button flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Post
          </button>
        </form>
        
        <div className="mt-6 border-t border-cyber-teal/20 pt-4">
          <p className="text-xs text-muted-foreground">
            This comment section contains XSS vulnerabilities due to unsanitized user input.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CommentSection;
