/**
 * SIDEBAR NAVIGATION COMPONENT
 * ===========================
 * Left-side navigation menu with enhanced styling and animations
 * 
 * Features:
 * - Dynamic navigation items
 * - Active state highlighting with gradient
 * - Smooth hover animations and transitions
 * - Responsive design (collapsible on mobile)
 */

import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    {
      path: '/dashboard/profile',
      label: 'View Profile',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      path: '/dashboard',
      label: 'Edit Profile',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
  ]

  return (
    /* Main Sidebar Container */
    <aside className="w-48 sm:w-64 bg-gradient-to-b from-gray-800 via-gray-850 to-gray-900 border-r border-gray-700 flex flex-col overflow-y-auto shadow-2xl">
      {/* Navigation Menu */}
      <nav className="p-2 sm:p-4 space-y-2 flex-1">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path

          return (
            /* Navigation Button with staggered animation */
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 group relative overflow-hidden stagger-item ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white shadow-lg shadow-blue-500/30 transform scale-105 ring-2 ring-blue-400/50'
                  : 'text-gray-300 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-750 hover:text-white hover:translate-x-1 hover:shadow-md'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Animated background shimmer on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Icon with rotation on hover */}
              <span className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 flex-shrink-0 relative z-10">
                {item.icon}
              </span>
              
              {/* Label */}
              <span className="font-semibold text-xs sm:text-sm truncate relative z-10">{item.label}</span>
              
              {/* Active indicator dot */}
              <span className={`absolute right-2 w-2 h-2 rounded-full bg-white transition-opacity duration-300 ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}></span>
            </button>
          )
        })}
      </nav>

      {/* User Profile Section (Footer) */}
      <div className="mt-auto p-3 sm:p-4 border-t border-gray-700 dark:border-gray-800 bg-gradient-to-r from-gray-800 via-gray-850 to-gray-800 dark:from-gray-900 dark:via-black dark:to-gray-900">
        <div className="flex items-center space-x-3 px-2 sm:px-3 py-2 sm:py-3 rounded-xl hover:bg-gray-700/50 dark:hover:bg-gray-800/50 transition-all duration-300 cursor-pointer group">
          {/* User Avatar with animated gradient ring */}
          <div className="relative flex-shrink-0">
            {/* Animated gradient ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Avatar circle with user initial */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-purple-400/30 group-hover:scale-110 transition-transform duration-300 text-sm sm:text-base">
              E
            </div>
          </div>
          
          {/* User Info */}
          <div className="flex-1 min-w-0">
            {/* Username */}
            <p className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-blue-300 transition-colors duration-300">
              Employee
            </p>
            
            {/* User Role Badge */}
            <p className="text-xs font-medium px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full inline-block mt-0.5 group-hover:bg-blue-500/30 transition-colors duration-300">
              User
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
