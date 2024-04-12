"use client";

import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";

import dayjs from "dayjs";
import Link from "next/link";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import useSWR from "swr";

import { BlogPostsData } from "@/app/api/posts/[id]/route";
import ArticleViewer from "@/components/ArticleViewer";
import useCookie from "@/hooks/useCookie";
import fetcher from "@/libs/fetcher";

import styles from "./style.module.scss";

type BlogPostProps = {
  id: string;
};

export default function BlogPost({ id }: BlogPostProps) {
  const { cookies, saveBookmarkCookie, deleteBookmarkCookie } = useCookie();
  const { data } = useSWR<BlogPostsData>(
    `${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`,
    fetcher,
  );
  // cookie の影響による react-hydration-error 対策
  const [isPreRender, setIsPreRender] = useState<boolean>(true);

  const fields = data?.items.at(0)?.fields;
  const publishedAt = dayjs(fields?.publishedAt as string).format("YYYY/MM/DD");
  const title = fields?.title as string;
  const tags = fields?.tags as string[];
  const body = fields?.body as string;
  const bookmarked = cookies?.includes(id) || false;

  useEffect(() => {
    setIsPreRender(false);
  }, [data]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.blogPost}>
        {isPreRender ? (
          <div className={styles.loading}>
            <ThreeDots
              visible={true}
              height="70"
              width="70"
              color="#996b3f"
              radius="9"
              ariaLabel="three-dots-loading"
            />
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <div className={styles.bookmark}>
                {bookmarked ? (
                  <FaStar
                    className={styles.bookmarked}
                    onClick={() => deleteBookmarkCookie(id)}
                  />
                ) : (
                  <FaRegStar onClick={() => saveBookmarkCookie(id)} />
                )}
              </div>
              <time
                className={styles.publishedAt}
              >{`投稿日: ${publishedAt}`}</time>
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
          </>
        )}
      </div>
    </div>
  );
}
