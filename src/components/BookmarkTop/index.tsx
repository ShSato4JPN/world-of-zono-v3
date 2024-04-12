"use client";

import { useEffect, useMemo, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

import dayjs from "dayjs";
import Link from "next/link";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

import { BlogPostsData } from "@/app/api/posts/[id]/route";
import useCookie from "@/hooks/useCookie";
import { removeTagString } from "@/libs/utils";

import styles from "./style.module.scss";

type BookmarkProps = {
  ids: string;
};

export default function BookmarkTop({ ids }: BookmarkProps) {
  const { cookies, saveBookmarkCookie, deleteBookmarkCookie } = useCookie();
  const [data, setData] = useState<BlogPostsData | undefined>();

  useEffect(() => {
    const dataFetch = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/posts/${ids}`,
        {
          cache: "no-store",
        },
      );

      const posts = (await res.json()) as BlogPostsData;
      setData(posts);
    };

    dataFetch();
  }, [cookies, ids]);

  const posts = useMemo<JSX.Element[]>(
    () =>
      data?.items
        .map(({ sys, fields }) => {
          const id = sys.id as string;
          const title = fields.title as string;
          const body = fields.body as string;
          const tags = fields.tags as string[];
          const publishedAt = fields.publishedAt as string;
          const bookmarked = cookies?.includes(id) || false;

          return (
            <div className={styles.post} key={id}>
              <div className={styles.publishedAt}>
                {dayjs(publishedAt).format("YYYY/MM/DD")}
              </div>
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
              <h1 className={styles.title}>
                <Link href={`/blog/${id}`}>{title}</Link>
              </h1>
              <div className={styles.tags}>
                {tags.map((tag) => (
                  <Link href={`/blog/tag/${tag}`} key={tag}>
                    <div className={styles.tag}>{tag}</div>
                  </Link>
                ))}
              </div>
              <div className={styles.body}>{removeTagString(body)}</div>
              <div className={styles.readMore}>
                <button>続きを読む</button>
              </div>
            </div>
          );
        })
        .flat() || [],
    [cookies, data?.items, deleteBookmarkCookie, saveBookmarkCookie],
  );

  const Description = (): JSX.Element => {
    return (
      <div className={styles.description}>
        <p>ブックマークに登録された記事がありません</p>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      {data === undefined ? (
        <div className={styles.loading}>
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#996b3f"
            radius="9"
            ariaLabel="three-dots-loading"
          />
        </div>
      ) : (
        <div className={styles.bookmarkTop}>
          {data?.items.length === 0 ? <Description /> : posts}
        </div>
      )}
    </div>
  );
}
