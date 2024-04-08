import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import { ThemeProvider } from "next-themes";

import Layout from "@/components/Layout";

import "./globals.scss";

const zenMaruGothic = Zen_Maru_Gothic({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "World Of Zono",
  description: "WOZ（World Of Zono）の公式サイトです",
  openGraph: {
    title: "World Of Zono",
    description: "WOZ（World Of Zono）の公式サイトです",
    siteName: "World Of Zono",
    images: {
      url: "/woz-logo.webp",
      alt: "World-Of-Zono",
      width: "500",
      height: "500",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp" suppressHydrationWarning>
      <body className={zenMaruGothic.className}>
        <ThemeProvider enableSystem={true}>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
