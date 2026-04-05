"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { useLanguage } from "@/components/language-provider";
import { siteConfig } from "@/site-config";

const frameCopy = {
  zh: {
    homeLabel: "南湾咨询首页",
    nav: [
      { label: "服务", href: "/#services" },
      { label: "关于", href: "/#about" },
      { label: "联系", href: "/#contact" },
    ],
    privacy: "隐私政策",
    translationLabel: "语言切换",
    footerIntro: `© ${new Date().getFullYear()} ${siteConfig.legalNameCn}`,
    footerPhone: `电话：${siteConfig.phone}`,
    footerUscc: `统一社会信用代码：${siteConfig.uscc}`,
  },
  en: {
    homeLabel: "Nanwan Consulting home",
    nav: [
      { label: "Services", href: "/#services" },
      { label: "About", href: "/#about" },
      { label: "Contact", href: "/#contact" },
    ],
    privacy: "Privacy",
    translationLabel: "Language switch",
    footerIntro: `© ${new Date().getFullYear()} ${siteConfig.legalNameEn}`,
    footerPhone: `Phone: ${siteConfig.phone}`,
    footerUscc: `USCC: ${siteConfig.uscc}`,
  },
} as const;

export function SiteFrame({ children }: { children: ReactNode }) {
  const { language, setLanguage } = useLanguage();
  const copy = frameCopy[language];

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-shell container">
          <Link className="brand" href="/#top" aria-label={copy.homeLabel}>
            <svg className="brand-logo" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="36" height="36" rx="10" fill="#c67d4a"/>
              {/* Brush-style Z with strong curves */}
              <path d="M9 14c4-4 12-3.5 17 0" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
              <path d="M25 13.5c-1 2-4 5-8 8c-3 2.5-6 4-7.5 5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
              <path d="M10 26c5-3.5 12-3 16 0" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
              {/* Extra artistic stroke — a sweeping tail flourish */}
              <path d="M25.5 23.5c1.5 2.5 1 5.5-3 8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
            </svg>
            <span className="brand-name">
              {language === "zh" ? siteConfig.brandNameCn : siteConfig.brandNameEn}
            </span>
          </Link>

          <div className="header-right">
            <nav className="nav" aria-label="Primary">
              {copy.nav.map((item) => (
                <a key={item.href} className="nav-link" href={item.href}>
                  {item.label}
                </a>
              ))}
              <Link className="nav-link" href="/privacy">
                {copy.privacy}
              </Link>
            </nav>

            <div className="lang-toggle" role="group" aria-label={copy.translationLabel}>
              <button
                type="button"
                className={`lang-btn ${language === "zh" ? "active" : ""}`}
                onClick={() => setLanguage("zh")}
              >
                中
              </button>
              <button
                type="button"
                className={`lang-btn ${language === "en" ? "active" : ""}`}
                onClick={() => setLanguage("en")}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="footer-shell container">
          <span className="footer-copy">{copy.footerIntro}</span>
          <span className="footer-copy">{copy.footerPhone}</span>
          <span className="footer-copy">{copy.footerUscc}</span>
          <Link className="footer-link" href="/privacy">{copy.privacy}</Link>
        </div>
      </footer>
    </div>
  );
}
