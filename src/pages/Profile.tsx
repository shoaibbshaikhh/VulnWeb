
import React from 'react';
import NavBar from '@/components/NavBar';
import UserProfile from '@/components/UserProfile';

const Profile = () => {
  return (
    <div className="min-h-screen bg-cyber-dark cyber-grid-bg">
      <NavBar />
      
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold cyber-text-gradient text-center mb-8">User Profile</h1>
        <UserProfile />
      </div>
    </div>
  );
};

export default Profile;
