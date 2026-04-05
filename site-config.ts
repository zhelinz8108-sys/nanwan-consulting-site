const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export const siteConfig = {
  name: "Nanwan Consulting",
  brandNameCn: "南湾咨询",
  brandNameEn: "Nanwan Consulting",
  legalNameCn: "南湾咨询（无锡）有限公司",
  legalNameEn: "Nanwan Consulting (Wuxi) Co., Ltd.",
  phone: "15358006881",
  email: "info@nanwanzx.com",
  descriptionCn:
    "南湾咨询（无锡）有限公司官网，展示公司主体信息、服务方向与隐私政策。",
  descriptionEn:
    "Official website of Nanwan Consulting (Wuxi) Co., Ltd., presenting the company's public profile, service focus, and privacy practices.",
  siteUrl: configuredSiteUrl,
  uscc: "91320213MAE2TM5H3C",
  address: "无锡市永和路18-2-4030",
  capital: "100万元整",
  establishedCn: "2024年10月25日",
  establishedEn: "October 25, 2024",
  privacyEffectiveDateCn: "2026年4月5日",
  privacyEffectiveDateEn: "April 5, 2026",
} as const;

type HeaderReader = {
  get(name: string): string | null;
};

export function resolveSiteUrl(headerReader?: HeaderReader) {
  if (siteConfig.siteUrl) {
    return siteConfig.siteUrl;
  }

  const host =
    headerReader?.get("x-forwarded-host") ??
    headerReader?.get("host") ??
    "localhost:3000";
  const protocol =
    headerReader?.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");

  return `${protocol}://${host}`;
}
