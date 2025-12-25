import defaultTheme from 'tailwindcss/defaultTheme'
/** @type {import('tailwindcss').Config} */
/**
 * TAILWIND CONFIGURATION
 * =====================
 * Enhanced color palette and theme configuration for the Employee Dashboard
 * Features:
 * - Modern gradient-ready color schemes
 * - Dark mode support via 'class' strategy
 * - Extended animation utilities
 * - Custom spacing and typography
 */
export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  darkMode: 'class', // Enables class-based dark mode (.dark class on html/body)
  theme: {
    extend: {
      // PRIMARY COLOR PALETTE
      // Used for buttons, links, active states, and accent elements
      colors: {
        primary: {
          50: '#eff6ff',   // Lightest - subtle backgrounds
          100: '#dbeafe',  // Very light - hover states
          200: '#bfdbfe',  // Light - borders
          300: '#93c5fd',  // Medium light - secondary elements
          400: '#60a5fa',  // Medium - interactive elements
          500: '#3b82f6',  // Base - primary actions (buttons, links)
          600: '#2563eb',  // Dark - hover states on primary
          700: '#1d4ed8',  // Darker - pressed states
          800: '#1e40af',  // Very dark - text on light backgrounds
          900: '#1e3a8a',  // Darkest - high contrast
        },
        // SECONDARY COLOR PALETTE (Purple/Violet)
        // Used for gradients, special highlights, and visual interest
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',  // Base secondary color
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        // SUCCESS STATES (Green)
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',  // Active status badges
          600: '#16a34a',
          700: '#15803d',
        },
        // ERROR/DANGER STATES (Red)
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',  // Exited status, error messages
          600: '#dc2626',
          700: '#b91c1c',
        },
        // WARNING STATES (Amber)
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
        },
        gray: {
          850: '#1e293b', // Custom gray shade for better dark mode gradients
        },
      },
      // ANIMATION KEYFRAMES
      // Custom animations for enhanced user experience
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'fadeInDown': 'fadeInDown 0.5s ease-out',
        'slideInLeft': 'slideInLeft 0.4s ease-out',
        'slideInRight': 'slideInRight 0.4s ease-out',
        'scaleIn': 'scaleIn 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'gradient': 'gradientShift 4s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      // SPACING
      // Extended spacing scale for fine-tuned layouts
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      // BORDER RADIUS
      // Custom rounded corner sizes
      borderRadius: {
        '4xl': '2rem',
      },
      // BOX SHADOWS
      // Enhanced shadows for depth
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.1)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-lg': '0 0 30px rgba(59, 130, 246, 0.6)',
      },
    },
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
}

