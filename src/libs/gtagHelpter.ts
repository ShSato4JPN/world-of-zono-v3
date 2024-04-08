export const pageview = (url: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
    page_path: url,
  });
};
