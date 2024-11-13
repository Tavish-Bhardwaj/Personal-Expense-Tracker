"use client"

import {createContext, useContext, useState, ReactNode} from 'react';
import { useEffect } from 'react';
type Theme = 'light' | 'dark';
type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType |undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode})=>{
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme) {
          setTheme(savedTheme); // Load saved theme if it exists
        } else {
          // Alternatively, detect system theme preference
          const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          setTheme(prefersDark ? 'dark' : 'light');
        }
      }, []);
    
      useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
      }, [theme]);
    
      const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
      };

    // const toggleTheme = ()=>{
    //     setTheme(theme === "light" ? "dark" : "light");
    // };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if(!context){
        throw new Error('ueTheme must be used within a ThemeProvider');
    }
    return context;
}