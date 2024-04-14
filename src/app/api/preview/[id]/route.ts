import { EntryProps } from "contentful-management";
import { NextResponse } from "next/server";

import plainClient from "@/libs/client-management";

type EntryFormat = {
  title: { "ja-JP": string };
  publishedAt: { "ja-JP": string };
  body: { "ja-JP": string };
  tags: { "ja-JP": string[] };
};

export type PreviewPostData = EntryProps<EntryFormat>;

export async function GET(
  _: Request,
  { params: { id } }: { params: { id: string } },
): Promise<NextResponse<PreviewPostData>> {
  const entry = (await plainClient.entry.get({
    spaceId: process.env.CONTENTFUL_SPACE_ID || "",
    environmentId: process.env.CONTENTFUL_ENVIRONMENT || "",
    entryId: id,
  })) as PreviewPostData;

  return NextResponse.json(entry);
}
