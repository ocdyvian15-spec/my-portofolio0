"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeMode = "light-mode" | "dark-mode" | "theme-zap" | "theme-blue" | "theme-love";

interface ThemeModeContextType {
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
}

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(undefined);

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
    const [themeMode, setThemeModeState] = useState<ThemeMode>("dark-mode");

    useEffect(() => {
        const savedTheme = localStorage.getItem("app-theme-mode") as ThemeMode;
        if (savedTheme) setThemeModeState(savedTheme);
    }, []);

    const setThemeMode = (mode: ThemeMode) => {
        setThemeModeState(mode);
        localStorage.setItem("app-theme-mode", mode);
    };

    return (
        <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
            {children}
        </ThemeModeContext.Provider>
    );
}

export function useThemeMode() {
    const context = useContext(ThemeModeContext);
    if (!context) {
        throw new Error("useThemeMode must be used within a ThemeModeProvider");
    }
    return context;
}