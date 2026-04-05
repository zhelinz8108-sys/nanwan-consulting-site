import type { MetadataRoute } from "next";
import { headers } from "next/headers";

import { resolveSiteUrl } from "@/site-config";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const siteUrl = resolveSiteUrl(headersList);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
