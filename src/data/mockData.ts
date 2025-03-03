
export interface User {
  id: number;
  username: string;
  password: string; // Plain text for vulnerability demo
  email: string;
  role: 'user' | 'admin';
  avatar: string;
  created_at: string;
}

export interface Vulnerability {
  id: string;
  title: string;
  category: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  owasp_reference: string;
  color: string;
}

export interface Comment {
  id: number;
  user_id: number;
  text: string;
  created_at: string;
}

// Intentionally vulnerable mock user data
export const users: User[] = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123', // Weak password
    email: 'shoaibwhitehat@gmail.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=admin',
    created_at: '2023-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    username: 'alice',
    password: 'password123', // Weak password
    email: 'alice@example.com',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=alice',
    created_at: '2023-01-02T00:00:00.000Z'
  },
  {
    id: 3,
    username: 'bob',
    password: 'letmein', // Weak password
    email: 'bob@example.com',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=bob',
    created_at: '2023-01-03T00:00:00.000Z'
  },
];

export const vulnerabilities: Vulnerability[] = [
  {
    id: 'sqli',
    title: 'SQL Injection',
    category: 'Injection',
    description: 'Unsanitized user input in SQL queries allows attackers to manipulate database operations.',
    difficulty: 'Medium',
    owasp_reference: 'A03:2021-Injection',
    color: 'cyber-blue'
  },
  {
    id: 'xss',
    title: 'Cross-Site Scripting (XSS)',
    category: 'Injection',
    description: 'Allows attackers to inject malicious scripts that execute in users\' browsers.',
    difficulty: 'Easy',
    owasp_reference: 'A03:2021-Injection',
    color: 'cyber-teal'
  },
  {
    id: 'idor',
    title: 'Insecure Direct Object References',
    category: 'Broken Access Control',
    description: 'Allows attackers to bypass authorization and access resources directly.',
    difficulty: 'Medium',
    owasp_reference: 'A01:2021-Broken Access Control',
    color: 'cyber-purple'
  },
  {
    id: 'auth',
    title: 'Broken Authentication',
    category: 'Authentication',
    description: 'Authentication weaknesses allow attackers to impersonate users or bypass login.',
    difficulty: 'Hard',
    owasp_reference: 'A07:2021-Identification and Authentication Failures',
    color: 'cyber-red'
  },
  {
    id: 'csrf',
    title: 'Cross-Site Request Forgery',
    category: 'Session Management',
    description: 'Forces users to execute unwanted actions on applications where they\'re authenticated.',
    difficulty: 'Hard',
    owasp_reference: 'A05:2021-Security Misconfiguration',
    color: 'cyber-orange'
  },
  {
    id: 'misconfig',
    title: 'Security Misconfiguration',
    category: 'Configuration',
    description: 'Improperly configured applications reveal sensitive information or grant excessive access.',
    difficulty: 'Easy',
    owasp_reference: 'A05:2021-Security Misconfiguration',
    color: 'cyber-yellow'
  }
];

export const comments: Comment[] = [
  {
    id: 1,
    user_id: 2,
    text: 'This vulnerability is really interesting!',
    created_at: '2023-06-15T10:30:00.000Z'
  },
  {
    id: 2,
    user_id: 3,
    text: '<script>alert("XSS Attack!")</script>',
    created_at: '2023-06-15T11:45:00.000Z'
  },
  {
    id: 3,
    user_id: 2,
    text: 'I found a way to bypass the authentication!',
    created_at: '2023-06-16T09:15:00.000Z'
  }
];

// Vulnerable mock authentication function
export const authenticateUser = (username: string, password: string): User | null => {
  // Vulnerable: Direct comparison without hashing
  const user = users.find(u => u.username === username && u.password === password);
  return user || null;
};

// Vulnerable search function (SQL Injection simulation)
export const searchUsers = (query: string): User[] => {
  // Simulating SQL Injection vulnerability
  if (query.toLowerCase().includes("' or '1'='1")) {
    return users; // Returns all users when SQL injection is attempted
  }
  
  return users.filter(user => 
    user.username.toLowerCase().includes(query.toLowerCase()) ||
    user.email.toLowerCase().includes(query.toLowerCase())
  );
};

// Vulnerable direct object reference function
export const getUserById = (id: number): User | undefined => {
  // No authorization check - just returns the user if found
  return users.find(user => user.id === id);
};

// Returns user comments, vulnerable to XSS
export const getComments = (): Comment[] => {
  return comments;
};

// Store a comment - vulnerable to XSS due to no sanitization
export const addComment = (userId: number, text: string): Comment => {
  const newComment: Comment = {
    id: comments.length + 1,
    user_id: userId,
    text: text, // No sanitization
    created_at: new Date().toISOString()
  };
  
  comments.push(newComment);
  return newComment;
};
