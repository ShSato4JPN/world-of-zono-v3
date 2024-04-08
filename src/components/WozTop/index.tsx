"use client";

import { useMemo, useState } from "react";

import { setCookie, getCookie } from "cookies-next";
import dayjs from "dayjs";
import Link from "next/link";
import queryString from "query-string";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import useSWR from "swr";

import { BlogPostsData } from "@/app/api/posts/route";
import fetcher from "@/libs/fetcher";
import { removeTagString } from "@/libs/utils";

import styles from "./style.module.scss";

export default function WozTop() {
  const cookies = getCookie("bookmark");
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
  // ブックマークの更新時に再レンダリングするためのフラグ(Cookie を更新しても際レンダリングされないため)
  const [refresh, setRefresh] = useState<boolean>(false);

  const addCookie = useMemo(
    () => (id: string) => {
      const data = JSON.parse(cookies || "[]") as Array<string>;
      setCookie("bookmark", [...data, id], { maxAge: 60 * 60 * 24 * 180 });
      setRefresh(() => !refresh);
    },
    [cookies, refresh],
  );

  const deleteCookie = useMemo(
    () => (id: string) => {
      const data = JSON.parse(cookies || "[]") as Array<string>;
      setCookie("bookmark", [...data.filter((v: string) => v !== id)]);
      setRefresh(() => !refresh);
    },
    [cookies, refresh],
  );

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
                          onClick={() => deleteCookie(id)}
                        />
                      ) : (
                        <FaRegStar onClick={() => addCookie(id)} />
                      )}
                    </div>
                    <h1 className={styles.title}>
                      <Link href={`/blog/${id}`}>{title}</Link>
                    </h1>
                    <div className={styles.tags}>
                      {tags.map((tag) => (
                        <Link href={`/tag/${tag}`} key={tag}>
                          <div className={styles.tag}>{tag}</div>
                        </Link>
                      ))}
                    </div>
                    <div className={styles.body}>{removeTagString(body)}</div>
                  </div>
                );
              }) || []}
            </div>
          );
        })
        .flat() || [],
    [addCookie, cookies, data?.items, deleteCookie, publishedAtList],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.wozTop}>
        <h1 className={styles.latest}>Latest</h1>
        {posts}
      </div>
    </div>
  );
}
