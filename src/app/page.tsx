import queryString from "query-string";

import { BlogPostsData } from "@/app/api/posts/route";
import SwrConfig from "@/components/SwrConfig";
import WozTop from "@/components/WozTop";

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
  const limit = 5;
  const skip = 0;

  const posts = await getPosts(limit, skip);

  return (
    <SwrConfig value={{ fallbackData: posts }}>
      <WozTop />
    </SwrConfig>
  );
}
