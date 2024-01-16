import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = (theme) => {
        setTheme((theme) => {
            (theme === 'light'? 'dark' : 'light');
        })
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    return useContext(ThemeContext);
}