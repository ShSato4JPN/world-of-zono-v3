"use client";
import { useEffect } from "react";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

import { pageview } from "@/libs/gtagHelpter";

function GoogleAnalytics(): JSX.Element {
  const pathName = usePathname();
  const searchParams = useSearchParams.toString();

  useEffect(() => {
    const url = pathName + searchParams.toString();

    pageview(url);
  }, [pathName, searchParams]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `,
        }}
      />
    </>
  );
}

export default GoogleAnalytics;
