import { createContext, useState } from "react";

interface IThemeContext {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  darkMode: false,
  toggleDarkMode: () => {},
});

interface IThemContextProviderProps {
  children: React.ReactNode;
}

const ThemeContextProvider = ({ children }: IThemContextProviderProps) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode: () => void = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
