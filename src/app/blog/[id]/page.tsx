import { BlogPostsData } from "@/app/api/posts/[id]/route";
import BlogPost from "@/components/BlogPost";
import SwrConfig from "@/components/SwrConfig";
import { removeTagString } from "@/libs/utils";

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
  const description = removeTagString(fields?.body as string).slice(0, 50);
  const url = "/og-image.webp";

  return {
    title,
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
