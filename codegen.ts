import path from "node:path";
import { config as loadEnv } from "dotenv";
import type { CodegenConfig } from "@graphql-codegen/cli";

loadEnv({ path: path.resolve(process.cwd(), ".env.local") });

const spaceId = process.env.CONTENTFUL_SPACE_ID?.trim();
const environment = process.env.CONTENTFUL_ENVIRONMENT?.trim() || "master";
const token = process.env.CONTENTFUL_ACCESS_TOKEN?.trim();

if (!spaceId || !token) {
  throw new Error(
    "codegen: set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN in .env.local (same vars as the Next.js app).",
  );
}

const schemaUrl = `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environment}`;

const config: CodegenConfig = {
  schema: {
    [schemaUrl]: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  },
  documents: ["src/graphql/operations.graphql"],
  generates: {
    "./gql/": {
      preset: "client",
      plugins: [],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
