"use client";

import { useEffect, useMemo, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

import { setCookie, getCookie } from "cookies-next";
import dayjs from "dayjs";
import Link from "next/link";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

import { BlogPostsData } from "@/app/api/posts/[id]/route";
import { removeTagString } from "@/libs/utils";

import styles from "./style.module.scss";

type BookmarkProps = {
  ids: string;
};

export default function BookmarkTop({ ids }: BookmarkProps) {
  const cookies = getCookie("bookmark");
  const [data, setData] = useState<BlogPostsData | undefined>();
  // ブックマークの更新時に再レンダリングするためのフラグ(Cookie を更新しても際レンダリングされないため)
  const [refresh, setRefresh] = useState<boolean>(false);

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
        })
        .flat() || [],
    [addCookie, cookies, data?.items, deleteCookie],
  );

  const Description = (): JSX.Element => {
    return (
      <div className={styles.description}>
        <p>ブックマークに登録された記事がありません</p>
      </div>
    );
  };

  if (data === undefined) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.loading}>
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#ffe100"
            radius="9"
            ariaLabel="three-dots-loading"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.bookmarkTop}>
        {data?.items.length === 0 ? <Description /> : posts}
      </div>
    </div>
  );
}
