import queryString from "query-string";

import { BlogPostsData } from "@/app/api/posts/route";
import BlogTop from "@/components/BlogTop";
import SwrConfig from "@/components/SwrConfig";

async function getPosts(limit: number, skip: number): Promise<BlogPostsData> {
  const res = await fetch(
    queryString.stringifyUrl({
      url: `${process.env.NEXT_PUBLIC_URL}/api/posts`,
      query: {
        skip,
        limit,
      },
    }),
    {
      next: { revalidate: 3600 }, // 1 hour
    },
  );
  return res.json();
}

export default async function Page() {
  const limit = 10;
  const skip = 0;

  const posts = await getPosts(limit, skip);

  return (
    <SwrConfig value={{ fallbackData: [posts] }}>
      <BlogTop />
    </SwrConfig>
  );
}
