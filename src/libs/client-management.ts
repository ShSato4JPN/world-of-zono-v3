// Contentful Management API Client
import contentful from "contentful-management";
const client = contentful.createClient(
  {
    accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN || "",
  },
  { type: "plain" },
);

export default client;
