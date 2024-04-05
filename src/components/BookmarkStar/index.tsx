"use client";

import { setCookie, getCookie } from "cookies-next";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

type BookmarkStarProps = {
  id: string;
  bookmarked: boolean;
};

export default function BookmarkStar({ id, bookmarked }: BookmarkStarProps) {
  const bookmarkStyle = {
    style: {
      color: "orange",
    },
  };

  const addCookie = (id: string) => {
    const data = JSON.parse(getCookie("bookmark") || "[]") as Array<string>;
    setCookie("bookmark", [...data, id]);
  };

  const deleteCookie = (id: string) => {
    const data = JSON.parse(getCookie("bookmark") || "[]") as Array<string>;
    setCookie("bookmark", [data.filter((v: string) => v !== id)]);
  };

  return bookmarked ? (
    <FaStar
      {...(bookmarked && bookmarkStyle)}
      onClick={() => deleteCookie(id)}
    />
  ) : (
    <FaRegStar onClick={() => addCookie(id)} />
  );
}
