import * as contentful from "contentful";
import { NextResponse } from "next/server";

import client from "@/libs/client";

export type BlogPostSkeleton = {
  contentTypeId: "worldOfZonoV2";
  fields: {
    title: contentful.EntryFieldTypes.Text;
    publishedAt: contentful.EntryFieldTypes.Date;
    body: contentful.EntryFieldTypes.Text;
    tags: contentful.EntryFieldTypes.Array<contentful.EntryFieldTypes.Symbol>;
  };
};

export type BlogPostData = contentful.Entry<BlogPostSkeleton>;

export async function GET(
  _: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse<BlogPostData>> {
  const entry = await client.getEntry<BlogPostSkeleton>(params.id);

  return NextResponse.json(entry);
}
