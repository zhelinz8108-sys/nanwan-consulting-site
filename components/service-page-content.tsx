"use client";

import Link from "next/link";

import { useLanguage } from "@/components/language-provider";

type ServiceSection = {
  readonly items: readonly string[];
  readonly title: string;
};

type ServiceLocaleCopy = {
  readonly back: string;
  readonly badge: string;
  readonly cta: string;
  readonly ctaSub: string;
  readonly intro: string;
  readonly sections: readonly ServiceSection[];
  readonly title: string;
};

export type ServicePageCopy = {
  readonly en: ServiceLocaleCopy;
  readonly zh: ServiceLocaleCopy;
};

export function ServicePageContent({ copy }: { copy: ServicePageCopy }) {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <div className="service-detail">
      <div className="container">
        <Link href="/#services" className="detail-back">
          {t.back}
        </Link>

        <div className="detail-header reveal">
          <span className="detail-badge">{t.badge}</span>
          <h1 className="detail-title">{t.title}</h1>
          <p className="detail-intro">{t.intro}</p>
        </div>

        <div className="detail-sections">
          {t.sections.map((section, index) => (
            <div
              key={section.title}
              className={`detail-section reveal ${index > 0 ? `delay-${Math.min(index, 2)}` : ""}`}
            >
              <div className="detail-section-num">0{index + 1}</div>
              <h2 className="detail-section-title">{section.title}</h2>
              <ul className="detail-list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="detail-cta reveal">
          <p className="detail-cta-title">{t.cta}</p>
          <p className="detail-cta-sub">{t.ctaSub}</p>
        </div>
      </div>
    </div>
  );
}
