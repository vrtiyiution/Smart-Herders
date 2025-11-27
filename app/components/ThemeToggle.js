// components/ThemeToggle.jsx
"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggle = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 p-4 bg-white dark:bg-gray-800 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 border border-gray-300 dark:border-gray-700"
      aria-label="Сэдэв солих"
    >
      {isDark ? (
        <Moon className="w-7 h-7 text-gray-700 dark:text-gray-300" />
      ) : (
        <Sun className="w-7 h-7 text-yellow-600" />
      )}
    </button>
  );
}