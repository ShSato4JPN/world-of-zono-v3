"use client";

import { useMemo, useState, useEffect } from "react";

import { Menu, MenuItem } from "@szhsin/react-menu";
import { useTheme } from "next-themes";
import { CiNoWaitingSign } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

import "@szhsin/react-menu/dist/theme-dark.css";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import styles from "./style.module.scss";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  const themeIcon = useMemo(() => {
    switch (theme) {
      case "light":
        return <MdLightMode className={styles.icon} />;
      case "dark":
        return <MdDarkMode className={styles.icon} />;
      default:
        return <IoSettingsOutline className={styles.icon} />;
    }
  }, [theme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <CiNoWaitingSign className={styles.icon} />;

  return (
    <Menu
      arrow
      transition
      theming={theme === "dark" ? "dark" : undefined}
      menuButton={<button className={styles.trigger}>{themeIcon}</button>}
    >
      <MenuItem className={styles.menuItem} onClick={() => setTheme("system")}>
        <IoSettingsOutline />
        <span className={styles.label}>System</span>
      </MenuItem>
      <MenuItem className={styles.menuItem} onClick={() => setTheme("light")}>
        <MdLightMode />
        <span className={styles.label}>Light</span>
      </MenuItem>
      <MenuItem className={styles.menuItem} onClick={() => setTheme("dark")}>
        <MdDarkMode />
        <span className={styles.label}>Dark</span>
      </MenuItem>
    </Menu>
  );
}
