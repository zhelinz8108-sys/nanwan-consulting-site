"use client";

import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import { siteConfig } from "@/site-config";

const notFoundCopy = {
  zh: {
    eyebrow: "页面不存在",
    title: "你访问的页面暂时无法找到。",
    summary: `你请求的页面未在${siteConfig.legalNameCn}官方网站中找到。`,
    home: "返回首页",
    privacy: "隐私政策",
  },
  en: {
    eyebrow: "Page Not Found",
    title: "This page is not available.",
    summary: `The requested page could not be found on the official website of ${siteConfig.legalNameCn}.`,
    home: "Return Home",
    privacy: "Privacy Policy",
  },
} as const;

export function NotFoundPageContent() {
  const { language } = useLanguage();
  const copy = notFoundCopy[language];

  return (
    <div className="policy-shell">
      <section className="policy-hero reveal">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 className="policy-title">{copy.title}</h1>
        <p className="policy-summary">{copy.summary}</p>

        <div className="button-row">
          <Link className="primary-button" href="/">
            {copy.home}
          </Link>
          <Link className="secondary-button" href="/privacy">
            {copy.privacy}
          </Link>
        </div>
      </section>
    </div>
  );
}
