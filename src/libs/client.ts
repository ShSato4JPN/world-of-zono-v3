// Contentful API Client
import { createClient } from "contentful";

const client = createClient({
  accessToken: process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN || "",
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  space: process.env.CONTENTFUL_SPACE_ID || "",
});

export default client;
