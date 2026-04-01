import { GraphQLClient } from "graphql-request";
import { getContentfulConfig } from "@/lib/contentful/config";

export function getContentfulClient(preview = false) {
  const config = getContentfulConfig();
  const token = preview && config.previewAccessToken ? config.previewAccessToken : config.accessToken;

  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${config.spaceId}/environments/${config.environment}`;

  return new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
