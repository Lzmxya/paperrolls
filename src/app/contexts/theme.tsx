import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage, useMedia } from "react-use";

type ThemeName = "dark" | "light" | "system";

type ThemeContextData = {
  theme: ThemeName;
  setTheme: Dispatch<SetStateAction<ThemeName>>;
};

interface ThemeContextProps {
  children: ReactElement;
}

const ThemeContext = createContext({} as ThemeContextData);

export function ThemeProvider({ children }: ThemeContextProps) {
  const isPrefersDark = useMedia("(prefers-color-scheme: dark)");
  const [themeConfig, setThemeConfig] = useLocalStorage<ThemeName>("theme");
  const [theme, setTheme] = useState(themeConfig || "system");

  useEffect(() => {
    if (theme === "dark" || (theme === "system" && isPrefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setThemeConfig(theme);
  }, [isPrefersDark, setThemeConfig, theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
