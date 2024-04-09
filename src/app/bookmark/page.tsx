"use client";

import { getCookie } from "cookies-next";

import BookmarkTop from "@/components/BookmarkTop";

export default function Page() {
  const bookmarks = getCookie("bookmark");
  const ids = JSON.parse(bookmarks || "[]").join(",");

  return <BookmarkTop ids={ids} />;
}
