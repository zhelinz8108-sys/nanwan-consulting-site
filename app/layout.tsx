import type { Metadata } from "next";
import type { ReactNode } from "react";

import { LanguageProvider } from "@/components/language-provider";
import { SiteFrame } from "@/components/site-frame";
import { siteConfig } from "@/site-config";

const metadataBase = siteConfig.siteUrl ? new URL(siteConfig.siteUrl) : undefined;

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.legalNameCn} | ${siteConfig.name}`,
    template: `%s | ${siteConfig.legalNameCn}`,
  },
  description: siteConfig.descriptionCn,
  metadataBase,
  applicationName: siteConfig.legalNameCn,
  keywords: [
    siteConfig.brandNameCn,
    siteConfig.brandNameEn,
    siteConfig.legalNameCn,
    "无锡咨询公司",
    "隐私政策",
    "国际教育咨询",
  ],
  authors: [{ name: siteConfig.legalNameEn }],
  creator: siteConfig.legalNameEn,
  publisher: siteConfig.legalNameEn,
  openGraph: {
    title: `${siteConfig.legalNameCn} | ${siteConfig.name}`,
    description: siteConfig.descriptionCn,
    siteName: siteConfig.legalNameCn,
    locale: "zh_CN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
};

const globalStyles = String.raw`
:root {
  --bg: #faf8f6;
  --bg-alt: #f3efe9;
  --ink: #2d2319;
  --text: #5c4e41;
  --muted: #9a8b7c;
  --accent: #c67d4a;
  --accent-light: #faf0e6;
  --line: rgba(0,0,0,0.08);
  --radius: 12px;
  --max-w: 1080px;
  --font: "Inter", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  --font-display: "Inter", "PingFang SC", sans-serif;
  --transition: 200ms ease;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; }
html { scroll-behavior: smooth; }

body {
  font-family: var(--font);
  color: var(--text);
  background: var(--bg);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; }
button, input, textarea { font: inherit; }

/* Layout */
.container {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 24px;
}

/* Header */
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(250,250,249,0.88);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--line);
}

.header-shell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-logo {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.brand-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: 0.02em;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-link {
  font-size: 0.875rem;
  color: var(--muted);
  transition: color var(--transition);
}
.nav-link:hover { color: var(--ink); }

.lang-toggle {
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 8px;
  background: var(--bg-alt);
}

.lang-btn {
  padding: 4px 10px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--muted);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all var(--transition);
}
.lang-btn.active {
  background: #fff;
  color: var(--ink);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* Hero */
.hero {
  padding: 80px 0 60px;
  text-align: center;
  scroll-margin-top: 80px;
}

.hero-inner {
  max-width: 680px;
  margin: 0 auto;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--ink);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.hero-sub {
  margin-top: 16px;
  font-size: 1.1rem;
  color: var(--text);
  line-height: 1.8;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  height: 44px;
  padding: 0 24px;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all var(--transition);
  border: 1px solid transparent;
}

.btn-primary {
  background: var(--accent);
  color: #fff;
}
.btn-primary:hover {
  background: #a8643a;
  transform: translateY(-1px);
}

.btn-outline {
  background: transparent;
  color: var(--ink);
  border-color: var(--line);
}
.btn-outline:hover {
  border-color: var(--ink);
  transform: translateY(-1px);
}

/* Sections */
.section {
  padding: 64px 0;
  scroll-margin-top: 80px;
}

.section-alt {
  background: var(--bg-alt);
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.01em;
  margin-bottom: 40px;
}

/* Services */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.service-card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 28px 24px;
  transition: box-shadow var(--transition), transform var(--transition);
}
.service-card:hover {
  box-shadow: 0 8px 30px rgba(0,0,0,0.06);
  transform: translateY(-2px);
}
.service-card:hover .service-more {
  color: var(--accent);
}

.service-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: var(--accent-light);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  margin-bottom: 16px;
}
.service-icon-wrap svg {
  width: 22px;
  height: 22px;
}

.service-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 12px;
}

.service-points {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 8px;
}

.service-points li {
  font-size: 0.9rem;
  color: var(--text);
  padding-left: 16px;
  position: relative;
}
.service-points li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 9px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.5;
}

/* Why */
.why-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.why-item {
  padding: 24px;
  background: #fff;
  border-radius: var(--radius);
  border: 1px solid var(--line);
}

.why-num {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.1em;
  margin-bottom: 8px;
}

.why-label {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 6px;
}

.why-desc {
  font-size: 0.9rem;
  color: var(--text);
  line-height: 1.6;
}

/* About */
.about-block {
  max-width: 720px;
}

.about-text {
  margin-top: 0;
  font-size: 1.05rem;
  line-height: 1.9;
  color: var(--text);
}

/* Contact */
.contact-block {
  max-width: 600px;
}

.contact-intro {
  font-size: 1rem;
  color: var(--text);
  margin-bottom: 28px;
}

.contact-info {
  display: grid;
  gap: 16px;
}

.form-field {
  display: grid;
  gap: 8px;
}

.form-label {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--ink);
}

.contact-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  background: #fff;
  border-radius: var(--radius);
  border: 1px solid var(--line);
}

.contact-label {
  font-size: 0.8rem;
  color: var(--muted);
  letter-spacing: 0.04em;
}

.contact-value {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--ink);
}

.contact-link {
  transition: color var(--transition);
}
.contact-link:hover { color: var(--accent); }

.contact-footer {
  margin-top: 24px;
}

.link-arrow {
  font-size: 0.9rem;
  color: var(--accent);
  font-weight: 500;
  transition: opacity var(--transition);
}
.link-arrow:hover { opacity: 0.7; }

/* Contact layout */
.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

.contact-form-block .section-title {
  margin-bottom: 8px;
}

.contact-info-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 20px;
}

/* Form */
.inquiry-form {
  display: grid;
  gap: 14px;
  margin-top: 20px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #fff;
  font-size: 0.9rem;
  color: var(--ink);
  transition: border-color var(--transition);
  outline: none;
}

.form-input:focus,
.form-textarea:focus {
  border-color: var(--accent);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: var(--muted);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-submit {
  justify-self: start;
  cursor: pointer;
}
.form-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-success {
  margin-top: 20px;
  padding: 16px 20px;
  border-radius: var(--radius);
  background: var(--accent-light);
  color: var(--accent);
  font-size: 0.9rem;
  font-weight: 500;
}

.form-error {
  font-size: 0.85rem;
  color: #c0392b;
}

.form-note {
  font-size: 0.82rem;
  color: var(--muted);
}

.inline-link {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 0.16em;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 768px) {
  .contact-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

/* Service card "more" link */
.service-more {
  display: block;
  margin-top: 16px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--muted);
  transition: color var(--transition);
}

/* Service detail pages */
.service-detail {
  padding: 40px 0 80px;
}

.detail-back {
  display: inline-block;
  font-size: 0.875rem;
  color: var(--muted);
  margin-bottom: 32px;
  transition: color var(--transition);
}
.detail-back:hover { color: var(--ink); }

.detail-header {
  max-width: 640px;
  margin-bottom: 48px;
}

.detail-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  background: var(--accent-light);
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  margin-bottom: 16px;
}

.detail-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--ink);
  line-height: 1.2;
  margin-bottom: 16px;
}

.detail-intro {
  font-size: 1.05rem;
  line-height: 1.85;
  color: var(--text);
}

.detail-sections {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 48px;
}

.detail-section {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 28px 24px;
}

.detail-section-num {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.1em;
  margin-bottom: 8px;
}

.detail-section-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 16px;
}

.detail-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 10px;
}

.detail-list li {
  font-size: 0.9rem;
  color: var(--text);
  line-height: 1.6;
  padding-left: 18px;
  position: relative;
}
.detail-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.4;
}

.detail-cta {
  max-width: 480px;
  padding: 32px;
  background: var(--accent-light);
  border-radius: var(--radius);
  text-align: center;
}

.detail-cta-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 8px;
}

.detail-cta-sub {
  font-size: 0.9rem;
  color: var(--text);
}

@media (max-width: 768px) {
  .detail-sections {
    grid-template-columns: 1fr;
  }
}

/* Footer */
.site-footer {
  border-top: 1px solid var(--line);
  padding: 20px 0;
  background: var(--bg);
}

.footer-shell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.footer-copy {
  font-size: 0.8rem;
  color: var(--muted);
}

.footer-uscc {
  display: none;
}

.footer-link {
  font-size: 0.8rem;
  color: var(--muted);
  transition: color var(--transition);
}
.footer-link:hover { color: var(--ink); }

/* Policy pages (keep existing) */
.policy-shell {
  max-width: 760px;
  margin: 0 auto;
  padding: 56px 24px 110px;
}

.policy-hero {
  padding: 24px;
  border-radius: var(--radius);
  background: #fff;
  border: 1px solid var(--line);
}

.policy-title {
  margin: 8px 0 0;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 700;
  color: var(--ink);
}

.policy-summary {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text);
}

.policy-section {
  margin-top: 16px;
  padding: 24px;
  border-radius: var(--radius);
  background: #fff;
  border: 1px solid var(--line);
}

.policy-section h2 {
  margin: 0 0 12px;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--ink);
}

.policy-section p,
.policy-section li {
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--text);
}

.policy-list {
  margin: 12px 0 0;
  padding-left: 20px;
}

.policy-list li + li {
  margin-top: 8px;
}

.eyebrow {
  margin: 0 0 8px;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  color: var(--accent);
  font-weight: 600;
}

/* Meta grid (privacy page) */
.meta-grid {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.85rem;
}

.meta-item span { color: var(--muted); }
.meta-item strong { color: var(--ink); font-weight: 600; }

/* Button row (privacy/404) */
.button-row {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.primary-button,
.secondary-button {
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 0 20px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all var(--transition);
}

.primary-button {
  background: var(--accent);
  color: #fff;
}
.primary-button:hover {
  background: #a8643a;
}

.secondary-button {
  border: 1px solid var(--line);
  color: var(--ink);
}
.secondary-button:hover {
  border-color: var(--ink);
}

/* Animations */
.reveal {
  animation: fade-up 600ms ease both;
}
.delay-1 { animation-delay: 100ms; }
.delay-2 { animation-delay: 200ms; }

@keyframes fade-up {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 768px) {
  .services-grid,
  .why-grid {
    grid-template-columns: 1fr;
  }

  .hero { padding: 48px 0 40px; }
  .section { padding: 48px 0; }

  .nav { gap: 14px; }
  .nav-link { font-size: 0.8rem; }

  .footer-shell {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .header-shell {
    height: auto;
    padding: 12px 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .header-right {
    width: 100%;
    justify-content: space-between;
  }
}
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
        <LanguageProvider>
          <SiteFrame>{children}</SiteFrame>
        </LanguageProvider>
      </body>
    </html>
  );
}
