"use client"

import { createContext, useContext, useState, useEffect } from "react"

type ThemeContextType = {
    theme: "light" | "dark"
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {

    const [theme, setTheme] = useState<"light" | "dark">("light")

    useEffect(() => {
        // Check if user has a saved preference
        const saved = localStorage.getItem("theme") as "light" | "dark" | null
        if (saved) {
            // setTheme(saved)
            document.documentElement.setAttribute("data-theme", saved)
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
        document.documentElement.setAttribute("data-theme", newTheme)
        localStorage.setItem("theme", newTheme)
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) throw new Error("useTheme must be used inside ThemeProvider")
    return context
}