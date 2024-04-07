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

export type BlogPostsData = contentful.EntryCollection<BlogPostSkeleton>;

export async function GET(req: Request): Promise<NextResponse<BlogPostsData>> {
  const { searchParams } = await new URL(req.url);
  const limit = Number(searchParams.get("limit") || 0);
  const skip = Number(searchParams.get("skip") || 0);

  const entries = await client.getEntries<BlogPostSkeleton>({
    content_type: "worldOfZono",
    order: ["-fields.publishedAt"],
    limit,
    skip,
  });

  return NextResponse.json(entries);
}
