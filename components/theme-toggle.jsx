"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import gsap from "gsap";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    // 1. GSAP Main Page "Breathe" Effect
    // Pushes the main content back slightly and blurs it during the theme swap
    gsap.fromTo(
      "main",
      { opacity: 0.7, scale: 0.98, filter: "blur(4px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }
    );

    // 2. The Ultimate SaaS Hack: Inject global transition to smooth out all color changes
    const css = document.createElement("style");
    css.id = "theme-transition-css";
    css.appendChild(
      document.createTextNode(
        `* {
          -webkit-transition: background-color 0.8s cubic-bezier(0.22, 1, 0.36, 1), color 0.8s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.8s cubic-bezier(0.22, 1, 0.36, 1) !important;
          transition: background-color 0.8s cubic-bezier(0.22, 1, 0.36, 1), color 0.8s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.8s cubic-bezier(0.22, 1, 0.36, 1) !important;
        }`
      )
    );
    document.head.appendChild(css);

    // 3. Trigger the actual theme swap
    setTheme(nextTheme);

    // 4. Cleanup the CSS after transition completes so hover states stay fast
    setTimeout(() => {
      const styleEl = document.getElementById("theme-transition-css");
      if (styleEl) styleEl.remove();
    }, 800);
  };

  if (!mounted) {
    return <div className="w-11 h-11 rounded-full border border-transparent" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-11 h-11 rounded-full bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-xl shadow-sm hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 hover:border-[#FC8B32]/50 hover:shadow-[#FC8B32]/10 transition-all duration-300 group overflow-hidden cursor-pointer"
      aria-label="Toggle theme"
    >
      <Sun className="absolute w-[1.3rem] h-[1.3rem] text-zinc-700 group-hover:text-[#FC8B32] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] dark:-rotate-90 dark:opacity-0 dark:scale-50 opacity-100 rotate-0 scale-100" />
      <Moon className="absolute w-[1.3rem] h-[1.3rem] text-zinc-300 group-hover:text-[#FC8B32] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] dark:rotate-0 dark:opacity-100 dark:scale-100 opacity-0 rotate-90 scale-50" />
    </button>
  );
}