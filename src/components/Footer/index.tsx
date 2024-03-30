"use client";
import dayjs from "dayjs";

import styles from "./style.module.scss";

export default function Footer(): JSX.Element {
  const now = dayjs();
  const copyright = `© ${now.year()} - Copyright world-of-zono, All Rights Reserved.`;

  return (
    <div className={styles.wrapper}>
      <footer>
        <span className={styles.copyright}>{copyright}</span>
      </footer>
    </div>
  );
}
