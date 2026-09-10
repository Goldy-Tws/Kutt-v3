"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`relative inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full transition-all duration-300 select-none group cursor-pointer ${
        isDark
          ? "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-kutt-muted hover:text-white"
          : "bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 shadow-sm"
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {/* Sun Icon (shown in Dark mode to prompt switching to light, or active in light) */}
        <Sun
          className={`w-4 h-4 transition-all duration-300 absolute ${
            isDark
              ? "text-amber-400 rotate-0 scale-100 opacity-100 group-hover:scale-110"
              : "text-slate-400 rotate-90 scale-0 opacity-0"
          }`}
        />
        {/* Moon Icon (shown in Light mode to prompt switching to dark) */}
        <Moon
          className={`w-4 h-4 transition-all duration-300 absolute ${
            isDark
              ? "text-slate-400 -rotate-90 scale-0 opacity-0"
              : "text-indigo-600 rotate-0 scale-100 opacity-100 group-hover:scale-110"
          }`}
        />
      </div>

      {showLabel && (
        <span className="text-xs font-semibold">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
}
