export const siteConfig = {
  name: "Nanwan Consulting",
  legalNameCn: "南湾咨询（无锡）有限公司",
  legalNameEn: "Nanwan Consulting (Wuxi) Co., Ltd.",
  description:
    "Official website of Nanwan Consulting (Wuxi) Co., Ltd., presenting the company's public profile, service focus, and privacy practices.",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000",
  uscc: "91320213MAE2TM5H3C",
  address: "无锡市永和路18-2-4030",
  capital: "100万元整",
  establishedCn: "2024年10月25日",
  establishedEn: "October 25, 2024",
} as const;
