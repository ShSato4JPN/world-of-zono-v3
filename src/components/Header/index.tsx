import Link from "next/link";
import { useTheme } from "next-themes";
import { FaBook } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { ImProfile } from "react-icons/im";
import { LuNetwork } from "react-icons/lu";

import ThemeToggle from "@/components/ThemeToggle";

import styles from "./style.module.scss";

export default function Header() {
  const { theme } = useTheme();

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.siteName}>World Of Zono</div>
        <nav className={styles.links}>
          <Link className={styles.linkField} href={"/blog"}>
            <div className={styles.icon}>
              <FaBook />
            </div>
            <div className={styles.link}>Blog</div>
          </Link>
          <Link className={styles.linkField} href={"/profile"}>
            <div className={styles.icon}>
              <ImProfile />
            </div>
            <div className={styles.link}>Profile</div>
          </Link>
          <Link className={styles.linkField} href={"/contact"}>
            <div className={styles.icon}>
              <GoMail />
            </div>
            <div className={styles.link}>Contact</div>
          </Link>
          <Link className={styles.linkField} href={"/sns"}>
            <div className={styles.icon}>
              <LuNetwork />
            </div>
            <div className={styles.link}>SNS</div>
          </Link>
          <div className={styles.linkField}>
            <div className={styles.icon}>
              <ThemeToggle />
            </div>
            <div className={styles.link}>{theme}</div>
          </div>
        </nav>
      </header>
    </div>
  );
}
