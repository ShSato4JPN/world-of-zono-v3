import { useCallback, useEffect, useState } from "react";

import { getCookie, setCookie, CookieValueTypes } from "cookies-next";

export default function useCookie() {
  const [cookies, updateCookies] = useState<CookieValueTypes>(() =>
    getCookie("bookmark"),
  ); // [1
  const [refresh, setRefresh] = useState<boolean>(false);

  const saveBookmarkCookie = useCallback(
    (id: string) => {
      const data = JSON.parse(cookies || "[]") as Array<string>;
      setCookie("bookmark", [...data, id], { maxAge: 60 * 60 * 24 * 180 });
      setRefresh(() => !refresh);
    },
    [cookies, refresh],
  );

  const deleteBookmarkCookie = useCallback(
    (id: string) => {
      const data = JSON.parse(cookies || "[]") as Array<string>;
      setCookie("bookmark", [...data.filter((v: string) => v !== id)]);
      setRefresh(() => !refresh);
    },
    [cookies, refresh],
  );

  useEffect(() => {
    updateCookies(() => getCookie("bookmark"));
  }, [refresh]);

  return { cookies, saveBookmarkCookie, deleteBookmarkCookie };
}
