import type { Metadata } from "next";

import { HomePageContent } from "@/components/home-page-content";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/site-config";

export const metadata: Metadata = {
  ...createPageMetadata({
    description: siteConfig.descriptionCn,
    path: "/",
  }),
  title: {
    absolute: `${siteConfig.legalNameCn} | ${siteConfig.name}`,
  },
};

export default function HomePage() {
  return <HomePageContent />;
}
