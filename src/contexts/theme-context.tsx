"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { themes, Theme, applyTheme, observeDarkModeChanges } from '@/lib/themes';

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]); // Default theme

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    
    // Store theme preference in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('selected-theme', theme.name);
    }
  };

  // Load theme from localStorage on mount and set up dark mode observer
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('selected-theme');
      if (savedTheme) {
        const theme = themes.find(t => t.name === savedTheme);
        if (theme) {
          setCurrentTheme(theme);
          applyTheme(theme);
        }
      }
      
      // Set up observer for dark mode changes (from Fumadocs toggle)
      const cleanup = observeDarkModeChanges((isDark) => {
        // Re-apply current theme when dark mode changes
        applyTheme(currentTheme, isDark);
      });
      
      return cleanup;
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
