import React, { useEffect, useState } from "react";
import { Sun, Moon } from "react-feather";

const ColorToggle = () => {
  const [isDark, setIsDark] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-2 rounded-full shadow-md hover:scale-110 transition-transform"
      title="Toggle dark mode"
    >
      {isDark ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ColorToggle;