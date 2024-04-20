"use client";

import { useMemo, useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";

import dayjs from "dayjs";
import Link from "next/link";
import queryString from "query-string";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { stripHtml } from "string-strip-html";
import useSWR from "swr";

import { BlogPostsData } from "@/app/api/posts/route";
import useCookie from "@/hooks/useCookie";
import fetcher from "@/libs/fetcher";

import styles from "./style.module.scss";

export default function WozTop() {
  const { cookies, saveBookmarkCookie, deleteBookmarkCookie } = useCookie();
  const { data } = useSWR<BlogPostsData>(
    queryString.stringifyUrl({
      url: `${process.env.NEXT_PUBLIC_URL}/api/posts`,
      query: {
        skip: 0,
        limit: 5,
      },
    }),
    fetcher,
  );
  // cookie の影響による react-hydration-error 対策
  const [isPreRender, setIsPreRender] = useState<boolean>(true);

  // 公開日をグルーピングする
  const publishedAtList = useMemo(
    () =>
      Array.from(
        new Set(
          data?.items.map(({ fields }) => fields.publishedAt as string) || [],
        ),
      ),
    [data],
  );

  // 公開日ごとに記事をまとめる
  const posts = useMemo<JSX.Element[]>(
    () =>
      publishedAtList
        .map((publishedAt) => {
          const posts = data?.items.filter(
            (item) => item.fields.publishedAt === publishedAt,
          );
          return (
            <div className={styles.publishedGroup} key={publishedAt}>
              <h2 className={styles.subtitle}>
                {dayjs(publishedAt).format("YYYY/MM/DD")}
              </h2>
              {posts?.map(({ sys, fields }) => {
                const id = sys.id as string;
                const title = fields.title as string;
                const body = fields.body as string;
                const tags = fields.tags as string[];
                const bookmarked = cookies?.includes(id) || false;

                return (
                  <div className={styles.post} key={id}>
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
                    <div className={styles.body}>{stripHtml(body).result}</div>
                    <div className={styles.readMore}>
                      <Link
                        className={styles.readMoreLink}
                        href={`/blog/${id}`}
                      >
                        続きを読む
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })
        .flat() || [],
    [
      cookies,
      data?.items,
      deleteBookmarkCookie,
      publishedAtList,
      saveBookmarkCookie,
    ],
  );

  useEffect(() => {
    setIsPreRender(false);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wozTop}>
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
            <h1 className={styles.latest}>Latest</h1>
            {posts}
          </>
        )}
      </div>
    </div>
  );
}
