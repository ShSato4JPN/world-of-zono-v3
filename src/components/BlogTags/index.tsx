"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import InfiniteScroll, { Props } from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";

import dayjs from "dayjs";
import Link from "next/link";
import queryString from "query-string";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

import { BlogPostsData } from "@/app/api/posts/route";
import useCookie from "@/hooks/useCookie";
import fetcher from "@/libs/fetcher";
import { removeTagString } from "@/libs/utils";

import styles from "./style.module.scss";

type BlogTagsProps = {
  name: string;
};

export default function BlogTags({ name }: BlogTagsProps) {
  const { cookies, saveBookmarkCookie, deleteBookmarkCookie } = useCookie();

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
  // cookie の影響による react-hydration-error 対策
  const [isPreRender, setIsPreRender] = useState<boolean>(true);

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
                  <Link className={styles.readMoreLink} href={`/blog/${id}`}>
                    続きを読む
                  </Link>
                </div>
              </div>
            );
          }),
        )
        .flat() || [],
    [cookies, data, deleteBookmarkCookie, saveBookmarkCookie],
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
        <h1 className={styles.selectTag}>#{decodeURIComponent(name)}</h1>
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
