import { createClient } from "contentful-management";

const client = createClient(
  {
    accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN || "",
  },
  { type: "plain" },
);

export default client;
