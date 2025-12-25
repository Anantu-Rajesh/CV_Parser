/**
 * HEADER COMPONENT
 * ================
 * Top navigation bar with logo, user greeting, theme toggle, and logout
 * 
 * Features:
 * - Sticky positioning for always-visible navigation
 * - Gradient background with backdrop blur
 * - Real-time date display
 * - Theme toggle (light/dark mode)
 * - Animated elements with hover effects
 * - Responsive design
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo(transparent).png"
import { useTheme } from '../context/ThemeContext'

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth tokens/data here
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    /* Main Header Container - Sticky with shadow and backdrop blur */
    <header className="h-16 sm:h-20 bg-gradient-to-r from-gray-800 via-gray-850 to-gray-900 border-b border-gray-700 flex items-center shadow-2xl sticky top-0 z-50 backdrop-blur-md">
      {/* Logo Section - Fixed width matching sidebar */}
      <div className="w-48 sm:w-64 flex items-center justify-center border-r border-gray-700 h-full px-2 bg-gradient-to-br from-gray-800 via-gray-850 to-gray-800 relative overflow-hidden group">
        {/* Animated glow effect behind logo */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Logo Image with hover animation */}
        <img 
          src={logo} 
          alt="EwandzDigital" 
          className="h-8 sm:h-10 md:h-12 transition-all duration-500 hover:scale-110 hover:rotate-3 drop-shadow-2xl relative z-10 filter brightness-110" 
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-between px-3 sm:px-6 relative">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-purple-600/5 animate-gradient"></div>
        
        {/* Welcome Message Section */}
        <div className="animate-fadeInUp relative z-10">
          {/* Greeting with gradient text */}
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-wide flex items-center">
            <span className="mr-2">📊</span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
              Employee Dashboard
            </span>
          </h2>
          
          {/* Current Date - Hidden on small screens */}
          <p className="text-xs text-gray-400 mt-0.5 hidden sm:block font-medium">
            📅 {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Action Buttons Section */}
        <div className="flex items-center space-x-2 sm:space-x-3 relative z-10">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className='p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200 shadow-md hover:shadow-lg group'
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5 text-yellow-400 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-700 group-hover:-rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          
          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className='flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/50 transition-all duration-300 text-xs sm:text-sm transform hover:scale-105 hover:-rotate-1 relative overflow-hidden group'
          >
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            {/* Logout icon with rotation on hover */}
            <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            
            {/* Logout text */}
            <span className="hidden sm:inline relative z-10">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

