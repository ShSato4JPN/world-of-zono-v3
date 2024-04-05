"use client";

import { Menu, MenuItem } from "@szhsin/react-menu";
import { useTheme } from "next-themes";
import { FaLightbulb } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

import "@szhsin/react-menu/dist/theme-dark.css";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import styles from "./style.module.scss";

type themes = "system" | "dark" | "light";

export default function ThemeToggle() {
  const { setTheme } = useTheme();
  // theme は初回読み込み時は undefined　を返すため、初期化時は LocalStrage,　window の値を優先する
  const appTheme = localStorage.getItem("theme") as themes | null;
  const osTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  // next-theme の値を優先する
  const currentTheme = !appTheme || appTheme === "system" ? osTheme : appTheme;

  const themeIcon = () => {
    switch (appTheme) {
      case "light":
        return <FaLightbulb className={styles.light} />;
      case "dark":
        return <FaLightbulb className={styles.dark} />;
      default:
        return <IoSettingsOutline className={styles.system} />;
    }
  };

  return (
    <Menu
      arrow
      transition
      theming={currentTheme === "dark" ? "dark" : undefined}
      menuButton={<button className={styles.trigger}>{themeIcon()}</button>}
    >
      <MenuItem className={styles.menuItem} onClick={() => setTheme("system")}>
        <IoSettingsOutline className={styles.system} />
        <span className={styles.label}>System</span>
      </MenuItem>
      <MenuItem className={styles.menuItem} onClick={() => setTheme("light")}>
        <FaLightbulb className={styles.light} />
        <span className={styles.label}>Light</span>
      </MenuItem>
      <MenuItem className={styles.menuItem} onClick={() => setTheme("dark")}>
        <FaLightbulb className={styles.dark} />
        <span className={styles.label}>Dark</span>
      </MenuItem>
    </Menu>
  );
}
