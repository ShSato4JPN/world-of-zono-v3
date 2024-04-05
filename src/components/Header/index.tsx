"use client";
import { useMemo } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegStar } from "react-icons/fa6";
import { GoBook } from "react-icons/go";
import { GoMail } from "react-icons/go";
import { RiAccountPinBoxLine } from "react-icons/ri";

import ThemeToggle from "@/components/ThemeToggle";

import styles from "./style.module.scss";

export default function Header() {
  const pathname = usePathname();

  const currentStype = {
    style: {
      borderBottom: "2px solid #a52a2a",
    },
  };

  const menuList = useMemo(
    () => [
      { key: "blog", icon: <GoBook />, label: "Blog", path: "/blog" },
      {
        key: "profile",
        icon: <RiAccountPinBoxLine />,
        label: "Profile",
        path: "/profile",
      },
      {
        key: "bookmark",
        icon: <FaRegStar />,
        label: "Bookmark",
        path: "/",
      },
      { key: "contact", icon: <GoMail />, label: "Contact", path: "/contact" },
    ],
    [],
  );

  const items = useMemo<JSX.Element[]>(
    () =>
      menuList.map((item) => (
        <Link className={styles.linkField} href={item.path} key={item.key}>
          <div className={styles.icon}>{item.icon}</div>
          <div
            className={styles.link}
            style={pathname === item.path ? { ...currentStype.style } : {}}
          >
            {item.label}
          </div>
        </Link>
      )),
    [currentStype.style, menuList, pathname],
  );

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link className={styles.siteName} href="/">
          <div>World Of Zono</div>
        </Link>
        <nav className={styles.links}>
          {items}
          <div className={styles.linkField} key={"theme"}>
            <div className={styles.icon}>
              <ThemeToggle />
            </div>
            <div className={styles.link}>Theme</div>
          </div>
        </nav>
      </header>
    </div>
  );
}
