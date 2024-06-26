import { stripHtml } from "string-strip-html";

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

export async function generateMetadata({ params: { id } }: PageProps) {
  const post = await getPost(id);

  const fields = post.items.at(0)?.fields;
  const title = fields?.title as string;
  const description = stripHtml(fields?.body as string).result.slice(0, 50);
  const url = `${process.env.NEXT_PUBLIC_URL}/og-image.webp`;

  return {
    title: `${title} | WOZ`,
    description,
    openGraph: {
      title,
      description,
      siteName: "World Of Zono",
      images: {
        url: url,
        alt: "サイトイメージ",
        width: "1200",
        height: "640",
      },
    },
  };
}
