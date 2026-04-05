import { ServicePageContent } from "@/components/service-page-content";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/site-config";

export const metadata = createPageMetadata({
  title: "跨境安居协调",
  description:
    "南湾咨询跨境安居协调服务，提供城市研究、租房协调、合同支持与落地生活指引。",
  path: "/services/relocation",
});

const copy = {
  zh: {
    back: "← 返回首页",
    badge: "核心服务",
    title: "跨境安居协调",
    intro: "搬到一个陌生的城市，最难的不是买机票，而是落地后的一百件小事。我们帮助客户在目标城市快速建立生活基础，减少试错成本，把精力留给真正重要的事。",
    sections: [
      {
        title: "城市与区域研究",
        items: [
          "目标城市的区域特征分析：安全性、通勤、生活便利度",
          "针对不同需求（学生/家庭/职场人士）推荐适合的居住片区",
          "周边配套梳理：学校、超市、医疗、公共交通",
          "生活成本预估与预算规划建议",
        ],
      },
      {
        title: "租房协调与合同支持",
        items: [
          "根据预算和需求筛选房源，提供对比分析",
          "代为与房东/中介沟通，安排远程看房",
          "租赁合同关键条款审阅与风险提示",
          "押金、付款流程与入住时间协调",
        ],
      },
      {
        title: "落地生活指引",
        items: [
          "入住前准备清单：开户、电话卡、网络、保险",
          "第一周生活指南：交通卡办理、日用品采购路线",
          "当地生活习惯与文化差异提醒",
          "紧急联系方式与常用服务资源汇总",
        ],
      },
      {
        title: "持续支持与资源对接",
        items: [
          "入住后跟进，协助处理突发的居住问题",
          "社区资源推荐：语言课程、社交活动、华人网络",
          "如需搬迁或续租，提供后续协调支持",
          "与教育规划服务联动，为留学家庭提供一站式方案",
        ],
      },
    ],
    cta: "咨询安居服务",
    ctaSub: `电话 ${siteConfig.phone} ｜ 邮箱 ${siteConfig.email}`,
  },
  en: {
    back: "← Back to Home",
    badge: "Core Service",
    title: "Relocation Support",
    intro: "Moving to an unfamiliar city is not just about booking a flight — it's about the hundred small things after landing. We help clients establish a life foundation in their target city quickly, reducing trial-and-error costs so they can focus on what truly matters.",
    sections: [
      {
        title: "City & Neighborhood Research",
        items: [
          "District-level analysis: safety, commute times, daily convenience",
          "Neighborhood recommendations tailored to students, families, or professionals",
          "Local amenities mapping: schools, groceries, healthcare, transit",
          "Cost-of-living estimates and budget planning guidance",
        ],
      },
      {
        title: "Rental Coordination & Lease Support",
        items: [
          "Property shortlisting based on budget and needs with comparison analysis",
          "Communication with landlords and agents, virtual tour arrangements",
          "Key lease clause review and risk flagging",
          "Deposit, payment process, and move-in date coordination",
        ],
      },
      {
        title: "Settling-In Guidance",
        items: [
          "Pre-arrival checklist: bank account, SIM card, internet, insurance",
          "First-week guide: transit card, daily essentials shopping routes",
          "Local customs and cultural adjustment tips",
          "Emergency contacts and essential service directory",
        ],
      },
      {
        title: "Ongoing Support & Resources",
        items: [
          "Post-move-in follow-up for any housing issues",
          "Community resources: language classes, social events, local networks",
          "Assistance with future moves or lease renewals",
          "Integration with education planning for full-service family solutions",
        ],
      },
    ],
    cta: "Inquire About Relocation Support",
    ctaSub: `Phone: ${siteConfig.phone} ｜ Email: ${siteConfig.email}`,
  },
} as const;

export default function RelocationPage() {
  return <ServicePageContent copy={copy} />;
}
