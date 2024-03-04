import { createContext, useContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  const darkModeHandler = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      localStorage.theme = 'dark';
    } else {
      localStorage.theme = 'light';
    }
  };

  return (
    <ThemeContext.Provider value={{ setDarkMode, darkMode, darkModeHandler }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
