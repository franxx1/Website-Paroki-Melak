import * as prismic from "@prismicio/client";

export const repositoryName = "website-paroki-melak";

export const client = prismic.createClient(
  `https://${repositoryName}.cdn.prismic.io/api/v2`,
  {
    fetchOptions: {
      cache: "no-store",
    },
  }
);
