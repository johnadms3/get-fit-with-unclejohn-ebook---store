"use cilent"

import { useTheme } from "../context/ThemeContext"

export default function ThemeToggle() {

    const ctx = useTheme()

    return(
        <button
        onClick={ctx.toggleTheme}
        className="text-tg px-3 py-2 rounded-lg transition-colors"
        style={{ color: "var(--sidebar-muted)"}}
        aira-label="Toggle theme"
        >

            {ctx.theme === "light" ? "🌙" : "☀️"}
        </button>
    )
}