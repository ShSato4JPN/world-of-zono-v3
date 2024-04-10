import queryString from "query-string";

import { BlogPostsData } from "@/app/api/posts/[id]/route";
import BlogTags from "@/components/BlogTags";
import SwrConfig from "@/components/SwrConfig";

type PageProps = {
  params: { name: string };
};

async function getPosts(
  name: string,
  skip: number,
  limit: number,
): Promise<BlogPostsData> {
  const res = await fetch(
    queryString.stringifyUrl({
      url: `${process.env.NEXT_PUBLIC_URL}/api/tags/${name}`,
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

export default async function Page({ params: { name } }: PageProps) {
  const limit = 10;
  const skip = 0;
  const post = await getPosts(name, skip, limit);

  return (
    <SwrConfig value={{ fallbackData: [post] }}>
      <BlogTags name={name} />
    </SwrConfig>
  );
}
