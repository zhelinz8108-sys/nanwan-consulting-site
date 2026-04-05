import type { Metadata } from "next";

import { siteConfig } from "@/site-config";

type PageMetadataInput = {
  description: string;
  path: string;
  title?: string;
  type?: "article" | "website";
};

function buildMetadataTitle(title?: string) {
  return title
    ? `${title} | ${siteConfig.legalNameCn}`
    : `${siteConfig.legalNameCn} | ${siteConfig.name}`;
}

export function createPageMetadata({
  description,
  path,
  title,
  type = "website",
}: PageMetadataInput): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const metadataTitle = buildMetadataTitle(title);

  return {
    title,
    description,
    alternates: siteConfig.siteUrl
      ? {
          canonical: canonicalPath,
        }
      : undefined,
    openGraph: {
      title: metadataTitle,
      description,
      url: siteConfig.siteUrl ? canonicalPath : undefined,
      siteName: siteConfig.legalNameCn,
      locale: "zh_CN",
      type,
    },
    twitter: {
      card: "summary",
      title: metadataTitle,
      description,
    },
  };
}
