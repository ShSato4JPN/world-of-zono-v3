"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import styles from "./style.module.scss";

export default function Top() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <Header />
        <main className={styles.main}>top page</main>
        <Footer />
      </div>
    </div>
  );
}
