import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import { ThemeProvider } from "next-themes";

import GoogleAnalytics from "@/components/GoogleAnalytics";
import Layout from "@/components/Layout";

import "./globals.scss";

const zenMaruGothic = Zen_Maru_Gothic({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "World Of Zono",
  description: "いろいろなことを書いていくゆる〜いブログです。",
  openGraph: {
    title: "World Of Zono",
    description: "いろいろなことを書いていくゆる〜いブログです。",
    siteName: "World Of Zono",
    images: {
      url: "/og-image.webp",
      alt: "サイトイメージ",
      width: "1200",
      height: "630",
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
      <head>
        <GoogleAnalytics />
      </head>
      <body className={zenMaruGothic.className}>
        <ThemeProvider enableSystem={true}>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
