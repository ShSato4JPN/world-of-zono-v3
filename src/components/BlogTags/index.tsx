"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import InfiniteScroll, { Props } from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";

import { setCookie, getCookie } from "cookies-next";
import dayjs from "dayjs";
import Link from "next/link";
import queryString from "query-string";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

import { BlogPostsData } from "@/app/api/posts/route";
import fetcher from "@/libs/fetcher";
import { removeTagString } from "@/libs/utils";

import styles from "./style.module.scss";

type BlogTagsProps = {
  name: string;
};

export default function BlogTags({ name }: BlogTagsProps) {
  const cookies = getCookie("bookmark");

  const getKey: SWRInfiniteKeyLoader<BlogPostsData> = (
    pageIndex,
    previousPageData,
  ) => {
    return previousPageData && !previousPageData.items.length
      ? null
      : queryString.stringifyUrl({
          url: `${process.env.NEXT_PUBLIC_URL}/api/tags/${name}`,
          query: {
            skip: pageIndex * 10,
            limit: 10,
          },
        });
  };

  const { data, size, setSize } = useSWRInfinite<BlogPostsData>(
    getKey,
    fetcher,
  );
  // ブックマークの更新時に再レンダリングするためのフラグ(Cookie を更新しても際レンダリングされないため)
  const [refresh, setRefresh] = useState<boolean>(false);
  // cookie の影響による react-hydration-error 対策
  const [isPreRender, setIsPreRender] = useState<boolean>(true);

  const addCookie = useCallback(
    (id: string) => {
      const data = JSON.parse(cookies || "[]") as Array<string>;
      setCookie("bookmark", [...data, id], { maxAge: 60 * 60 * 24 * 180 });
      setRefresh(() => !refresh);
    },
    [cookies, refresh],
  );

  const deleteCookie = useCallback(
    (id: string) => {
      const data = JSON.parse(cookies || "[]") as Array<string>;
      setCookie("bookmark", [...data.filter((v: string) => v !== id)]);
      setRefresh(() => !refresh);
    },
    [cookies, refresh],
  );

  const posts = useMemo<JSX.Element[]>(
    () =>
      data
        ?.map(({ items }) =>
          items.map(({ sys, fields }) => {
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
                    <Link href={`/blog/tag/${tag}`} key={tag}>
                      <div className={styles.tag}>{tag}</div>
                    </Link>
                  ))}
                </div>
                <div className={styles.body}>{removeTagString(body)}</div>
              </div>
            );
          }),
        )
        .flat() || [],
    [addCookie, cookies, data, deleteCookie],
  );

  const next = useCallback<Props["next"]>(() => {
    setSize(size + 1);
  }, [setSize, size]);

  const hasMore = useMemo<Props["hasMore"]>(
    () => posts.length < (data?.at(0)?.total || 0),
    [data, posts.length],
  );

  useEffect(() => {
    setIsPreRender(false);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.blogTags}>
        <h1 className={styles.selectTag}>Tag : {decodeURIComponent(name)}</h1>
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
          <InfiniteScroll
            className="posts"
            dataLength={posts.length}
            next={next}
            hasMore={hasMore}
            loader={<div className={styles.loaderWrapper}>Loading...</div>}
          >
            {posts}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}
