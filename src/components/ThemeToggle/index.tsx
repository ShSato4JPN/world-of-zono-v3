"use client";
import { useTheme } from "next-themes";
import { FaLightbulb } from "react-icons/fa";

import styles from "./style.module.scss";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-toggle">
      {theme === "light" ? (
        <FaLightbulb className={styles.dark} onClick={() => setTheme("dark")} />
      ) : (
        <FaLightbulb
          className={styles.light}
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
}
