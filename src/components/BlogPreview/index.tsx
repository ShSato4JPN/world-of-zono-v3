"use client";

import dayjs from "dayjs";
import Link from "next/link";
import { FaRegStar } from "react-icons/fa";
import useSWR from "swr";

import { PreviewPostData } from "@/app/api/preview/[id]/route";
import ArticleViewer from "@/components/ArticleViewer";
import fetcher from "@/libs/fetcher";

import styles from "./style.module.scss";

type BlogPostProps = {
  id: string;
};

export default function BlogPreview({ id }: BlogPostProps) {
  const { data } = useSWR<PreviewPostData>(
    `${process.env.NEXT_PUBLIC_URL}/api/preview/${id}`,
    fetcher,
  );

  const title = data?.fields.title["ja-JP"] || "";
  const body = data?.fields.body["ja-JP"] || "";
  const tags = data?.fields.tags["ja-JP"] || [];
  const publishedAt =
    dayjs(data?.fields.publishedAt["ja-JP"] as string).format("YYYY-MM-DD") ||
    "";

  return (
    <div className={styles.wrapper}>
      <div className={styles.blogPreview}>
        <h1 className={styles.preview}>※ プレビューモード ※</h1>
        <div className={styles.header}>
          <div className={styles.bookmark}>
            <FaRegStar />
          </div>
          <time className={styles.publishedAt}>{`投稿日: ${publishedAt}`}</time>
          <h1 className={styles.title}>{title}</h1>
          <h2>Tags</h2>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <Link href={`/blog/tag/${tag}`} key={tag}>
                <div className={styles.tag}>{tag}</div>
              </Link>
            ))}
          </div>
        </div>
        <article className={styles.body}>
          <ArticleViewer html={body} />
        </article>
      </div>
    </div>
  );
}
