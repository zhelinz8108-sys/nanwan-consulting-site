"use client";

import Link from "next/link";
import { useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { siteConfig } from "@/site-config";

const homeCopy = {
  zh: {
    heroTitle: "跨境生活，从容启程",
    heroSub: "南湾咨询为有国际发展需求的家庭和个人，提供教育规划、安居协调与综合咨询服务。",
    heroCta: "了解我们的服务",
    heroContact: "联系咨询",

    servicesTitle: "我们能帮你做什么",
    servicesMore: "了解详情 →",
    services: [
      {
        icon: "education",
        href: "/services/education",
        title: "国际教育规划",
        points: [
          "留学方向评估与院校筛选",
          "申请材料策略与时间规划",
          "面试准备与录取后衔接",
        ],
      },
      {
        icon: "home",
        href: "/services/relocation",
        title: "跨境安居协调",
        points: [
          "目标城市区域信息梳理",
          "租房协调与合同审阅支持",
          "落地生活指引与资源对接",
        ],
      },
      {
        icon: "advisory",
        href: "/services/advisory",
        title: "综合顾问服务",
        points: [
          "跨境事务信息整合",
          "合作伙伴对接与沟通协调",
          "定制化咨询方案",
        ],
      },
    ],

    whyTitle: "为什么选择南湾",
    whyItems: [
      { label: "真实可查", desc: "工商注册信息公开透明，随时可验" },
      { label: "专注务实", desc: "不做大而全，聚焦跨境教育与安居" },
      { label: "长期陪伴", desc: "不只是一次咨询，而是持续的支持" },
    ],

    aboutTitle: "关于南湾咨询",
    aboutText: `${siteConfig.legalNameCn}成立于${siteConfig.establishedCn}，立足无锡，专注于为有国际发展需求的客户提供专业、稳妥的咨询服务。我们相信好的咨询不是制造焦虑，而是帮助客户看清选择、做好准备、从容出发。`,

    contactTitle: "联系我们",
    contactLabels: {
      company: "公司名称",
      address: "地址",
      phone: "联系电话",
      email: "邮箱",
      uscc: "统一社会信用代码",
    },
    privacyLink: "隐私政策",

    formTitle: "在线咨询",
    formSub: "留下您的信息，我们会尽快与您联系。",
    formName: "您的姓名",
    formNameLabel: "姓名",
    formContact: "手机号或邮箱",
    formContactLabel: "手机号或邮箱",
    formMessage: "想咨询的内容（选填）",
    formMessageLabel: "咨询内容（选填）",
    formSubmit: "提交咨询",
    formSending: "提交中...",
    formSuccess: "提交成功，我们会尽快联系您！",
    formError: "提交失败，请稍后重试或直接拨打电话。",
    formRateLimited: "提交过于频繁，请稍后再试。",
    formUnavailable: "咨询通道暂时不可用，请直接电话或邮件联系。",
    formPrivacyPrefix: "提交即表示你同意我们按照",
    formPrivacyLink: "隐私政策",
    formPrivacySuffix: "处理你的联系信息。",
    formWebsiteTrap: "公司官网",
  },
  en: {
    heroTitle: "Cross-Border Living, Simplified",
    heroSub: "Nanwan Consulting helps families and individuals navigate international education, relocation, and cross-border transitions with confidence.",
    heroCta: "Our Services",
    heroContact: "Get in Touch",

    servicesTitle: "How We Help",
    servicesMore: "Learn more →",
    services: [
      {
        icon: "education",
        href: "/services/education",
        title: "Education Planning",
        points: [
          "Study direction assessment & school selection",
          "Application strategy & timeline planning",
          "Interview prep & post-admission support",
        ],
      },
      {
        icon: "home",
        href: "/services/relocation",
        title: "Relocation Support",
        points: [
          "Neighborhood research & city orientation",
          "Rental coordination & lease review",
          "Settling-in guidance & local resources",
        ],
      },
      {
        icon: "advisory",
        href: "/services/advisory",
        title: "Advisory Services",
        points: [
          "Cross-border information consolidation",
          "Partner coordination & communication",
          "Customized consulting solutions",
        ],
      },
    ],

    whyTitle: "Why Nanwan",
    whyItems: [
      { label: "Transparent", desc: "Fully registered and publicly verifiable" },
      { label: "Focused", desc: "Specialized in cross-border education and relocation" },
      { label: "Long-term", desc: "Ongoing support, not just a one-time consultation" },
    ],

    aboutTitle: "About Nanwan",
    aboutText: `${siteConfig.legalNameEn} was established on ${siteConfig.establishedEn}, based in Wuxi. We focus on providing professional and reliable consulting services for clients with international development needs. We believe good consulting is not about creating anxiety — it's about helping clients see their options clearly and move forward with confidence.`,

    contactTitle: "Contact Us",
    contactLabels: {
      company: "Company",
      address: "Address",
      phone: "Phone",
      email: "Email",
      uscc: "Unified Social Credit Code",
    },
    privacyLink: "Privacy Policy",

    formTitle: "Get in Touch",
    formSub: "Leave your information and we'll get back to you shortly.",
    formName: "Your Name",
    formNameLabel: "Name",
    formContact: "Phone or Email",
    formContactLabel: "Phone or Email",
    formMessage: "What would you like to discuss? (optional)",
    formMessageLabel: "Message (optional)",
    formSubmit: "Submit Inquiry",
    formSending: "Submitting...",
    formSuccess: "Submitted! We'll contact you soon.",
    formError: "Submission failed. Please try again or call us directly.",
    formRateLimited: "Too many submissions. Please try again later.",
    formUnavailable: "Inquiry delivery is temporarily unavailable. Please contact us by phone or email.",
    formPrivacyPrefix: "By submitting, you agree to our",
    formPrivacyLink: "Privacy Policy",
    formPrivacySuffix: "for handling your contact information.",
    formWebsiteTrap: "Company website",
  },
} as const;

type FormStatus = "error" | "idle" | "ok" | "rate_limited" | "sending" | "unavailable";

export function HomePageContent() {
  const { language } = useLanguage();
  const t = homeCopy[language];
  const [form, setForm] = useState({
    contact: "",
    message: "",
    name: "",
    website: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.contact) {
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;

      if (res.ok && data?.ok) {
        setStatus("ok");
        setForm({
          contact: "",
          message: "",
          name: "",
          website: "",
        });
      } else if (res.status === 429) {
        setStatus("rate_limited");
      } else if (res.status === 503) {
        setStatus("unavailable");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const statusMessage =
    status === "error"
      ? t.formError
      : status === "rate_limited"
        ? t.formRateLimited
        : status === "unavailable"
          ? t.formUnavailable
          : null;

  return (
    <div className="page-shell">
      <section className="hero" id="top">
        <div className="container">
          <div className="hero-inner reveal">
            <h1 className="hero-title">{t.heroTitle}</h1>
            <p className="hero-sub">{t.heroSub}</p>
            <div className="hero-buttons">
              <a className="btn btn-primary" href="#services">
                {t.heroCta}
              </a>
              <a className="btn btn-outline" href="#contact">
                {t.heroContact}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <h2 className="section-title reveal">{t.servicesTitle}</h2>
          <div className="services-grid">
            {t.services.map((service, index) => (
              <Link
                key={service.title}
                href={service.href}
                className={`service-card reveal ${index > 0 ? `delay-${index}` : ""}`}
              >
                <div className="service-icon-wrap">
                  {service.icon === "education" ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M12 3 2 8.5l10 5.5 10-5.5L12 3Z" />
                      <path d="M2 8.5v6l10 5.5 10-5.5v-6" />
                      <path d="M12 14v6" />
                    </svg>
                  ) : null}
                  {service.icon === "home" ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="m3 10.5 9-7 9 7" />
                      <path d="M5 9.5V20h14V9.5" />
                      <path d="M10 20v-6h4v6" />
                    </svg>
                  ) : null}
                  {service.icon === "advisory" ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 8v4l3 2" />
                    </svg>
                  ) : null}
                </div>
                <h3 className="service-name">{service.title}</h3>
                <ul className="service-points">
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <span className="service-more">{t.servicesMore}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="about">
        <div className="container">
          <h2 className="section-title reveal">{t.whyTitle}</h2>
          <div className="why-grid">
            {t.whyItems.map((item, index) => (
              <div key={item.label} className={`why-item reveal ${index > 0 ? `delay-${index}` : ""}`}>
                <span className="why-num">0{index + 1}</span>
                <h3 className="why-label">{item.label}</h3>
                <p className="why-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-block reveal">
            <h2 className="section-title">{t.aboutTitle}</h2>
            <p className="about-text">{t.aboutText}</p>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="contact">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-form-block reveal">
              <h2 className="section-title">{t.formTitle}</h2>
              <p className="contact-intro">{t.formSub}</p>
              {status === "ok" ? (
                <div className="form-success" role="status" aria-live="polite">
                  {t.formSuccess}
                </div>
              ) : (
                <form className="inquiry-form" onSubmit={handleSubmit}>
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="inquiry-website">{t.formWebsiteTrap}</label>
                    <input
                      id="inquiry-website"
                      type="text"
                      name="website"
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                      autoComplete="off"
                      tabIndex={-1}
                    />
                  </div>

                  <label className="form-field">
                    <span className="form-label">{t.formNameLabel}</span>
                    <input
                      type="text"
                      className="form-input"
                      aria-label={t.formNameLabel}
                      placeholder={t.formName}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label className="form-field">
                    <span className="form-label">{t.formContactLabel}</span>
                    <input
                      type="text"
                      className="form-input"
                      aria-label={t.formContactLabel}
                      placeholder={t.formContact}
                      value={form.contact}
                      onChange={(e) => setForm({ ...form, contact: e.target.value })}
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck={false}
                      required
                    />
                  </label>

                  <label className="form-field">
                    <span className="form-label">{t.formMessageLabel}</span>
                    <textarea
                      className="form-textarea"
                      aria-label={t.formMessageLabel}
                      placeholder={t.formMessage}
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </label>

                  {statusMessage ? (
                    <p className="form-error" role="alert">
                      {statusMessage}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    className="btn btn-primary form-submit"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? t.formSending : t.formSubmit}
                  </button>

                  <p className="form-note">
                    {t.formPrivacyPrefix}{" "}
                    <Link href="/privacy" className="inline-link">
                      {t.formPrivacyLink}
                    </Link>{" "}
                    {t.formPrivacySuffix}
                  </p>
                </form>
              )}
            </div>

            <div className="contact-info-block reveal delay-1">
              <h3 className="contact-info-title">{t.contactTitle}</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-label">{t.contactLabels.company}</span>
                  <span className="contact-value">
                    {language === "zh" ? siteConfig.legalNameCn : siteConfig.legalNameEn}
                  </span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">{t.contactLabels.address}</span>
                  <span className="contact-value">{siteConfig.address}</span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">{t.contactLabels.phone}</span>
                  <a className="contact-value contact-link" href={`tel:${siteConfig.phone}`}>
                    {siteConfig.phone}
                  </a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">{t.contactLabels.email}</span>
                  <a className="contact-value contact-link" href={`mailto:${siteConfig.email}`}>
                    {siteConfig.email}
                  </a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">{t.contactLabels.uscc}</span>
                  <span className="contact-value">{siteConfig.uscc}</span>
                </div>
              </div>
              <div className="contact-footer">
                <Link href="/privacy" className="link-arrow">
                  {t.privacyLink} &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
