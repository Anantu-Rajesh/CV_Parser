import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Start with true = dark mode (since page defaults to dark)
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Load saved theme on mount
    const saved = localStorage.getItem('theme');
    console.log('📖 Loading saved theme:', saved);
    
    if (saved === 'light') {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(true); // Default to dark
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    console.log('🎨 Theme Effect - isDarkMode:', isDarkMode);
    
    if (isDarkMode) {
      console.log('✅ DARK MODE: Adding dark class');
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      console.log('☀️ LIGHT MODE: Removing dark class');
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    console.log('HTML classList:', root.classList.toString());
    console.log('Has dark class?', root.classList.contains('dark'));
  }, [isDarkMode]);

  const toggleTheme = () => {
    console.log('🔄 Toggle clicked - Current isDarkMode:', isDarkMode, '-> Will become:', !isDarkMode);
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
