"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import styles from "./style.module.scss";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.layout}>
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
