// src/components/Header.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Function to format the current route into a readable page title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return 'Dashboard';
    
    // Remove leading slash and capitalize each word
    return path
      .substring(1)
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get user's first name or email
  const getUserName = () => {
    if (!user) return 'User';
    
    if (user.user_metadata && user.user_metadata.full_name) {
      return user.user_metadata.full_name.split(' ')[0];
    }
    
    if (user.email) {
      return user.email.split('@')[0];
    }
    
    return 'User';
  };

  return (
    <header className="header">
      <div className="page-title">{getPageTitle()}</div>
      <div className="user-info">
        <span className="username">Welcome, {getUserName()}</span>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;