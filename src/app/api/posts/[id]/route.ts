import * as contentful from "contentful";
import { NextResponse } from "next/server";

import client from "@/libs/client";

export type BlogPostSkeleton = {
  contentTypeId: "worldOfZono";
  fields: {
    title: contentful.EntryFieldTypes.Text;
    body: contentful.EntryFieldTypes.Text;
    publishedAt: contentful.EntryFieldTypes.Date;
    tags: contentful.EntryFieldTypes.Array<contentful.EntryFieldTypes.Symbol>;
  };
};

// Bookmark 機能を実装するため、基本的に getEntries でデータを取得して、フロント側で生合成を取る
//export type BlogPostData = contentful.Entry<BlogPostSkeleton>;
export type BlogPostsData = contentful.EntryCollection<BlogPostSkeleton>;

export async function GET(
  _: Request,
  { params: { id } }: { params: { id: string } },
): Promise<NextResponse<BlogPostsData>> {
  const entry = await client.getEntries<BlogPostSkeleton>({
    "sys.id[in]": id.split(","),
  });

  return NextResponse.json(entry);
}
