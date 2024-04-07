import { BlogPostsData } from "@/app/api/posts/[id]/route";
import BlogPost from "@/components/BlogPost";
import SwrConfig from "@/components/SwrConfig";

type PageProps = {
  params: { id: string };
};

async function getPost(id: string): Promise<BlogPostsData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`, {
    next: { revalidate: 3600 }, // 1 hour
  });

  return res.json();
}

export default async function Page({ params: { id } }: PageProps) {
  const post = await getPost(id);

  return (
    <SwrConfig value={{ fallbackData: post }}>
      <BlogPost id={id} />
    </SwrConfig>
  );
}
