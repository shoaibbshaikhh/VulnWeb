
import React from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import VulnerabilityCard from '@/components/VulnerabilityCard';
import { vulnerabilities } from '@/data/mockData';
import { Shield, AlertTriangle, ArrowRight, Github } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-cyber-dark cyber-grid-bg">
      <NavBar />
      
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyber-teal to-cyber-blue flex items-center justify-center animate-pulse-glow"
          >
            <Shield className="h-8 w-8 text-cyber-dark" />
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl font-bold cyber-text-gradient mb-3"
          >
            Vulnerable Web App
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-xl text-muted-foreground"
          >
            A controlled environment to explore, understand, and learn how to fix common web application security vulnerabilities
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            {/* <a href="#vulnerabilities" className="cyber-button py-3 px-6">
              Explore Vulnerabilities
            </a> */}
            <a
              href="https://owasp.org/Top10/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-cyber-blue hover:text-cyber-teal transition-colors py-3 px-6"
            >
              OWASP Top 10 Reference
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12 p-4 border border-cyber-red/30 bg-cyber-red/10 rounded-md flex items-center gap-3"
        >
          <AlertTriangle className="h-6 w-6 text-cyber-red flex-shrink-0" />
          <div>
            <h3 className="font-medium text-cyber-red">Security Warning</h3>
            <p className="text-sm text-muted-foreground">
              This application is intentionally vulnerable for educational purposes. Do not use real credentials or personal information.
            </p>
          </div>
        </motion.div>
        
        <div id="vulnerabilities">
          {/* <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 cyber-text-gradient">
            <Shield className="h-6 w-6" />
            Featured Vulnerabilities
          </h2> */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vulnerabilities.map((vulnerability, index) => (
              <VulnerabilityCard 
                key={vulnerability.id} 
                vulnerability={vulnerability} 
                index={index} 
              />
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Built for educational purposes. Based on OWASP Top 10 vulnerabilities.
          </p>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            &copy; {new Date().getFullYear()} Shoaib Shaikh.
            <a href="https://github.com/shoaibbshaikhh/VulnWeb" className="text-cyber-blue hover:text-cyber-teal" target="_blank" rel="noreferrer">
              <Github className="h-5 w-5" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
