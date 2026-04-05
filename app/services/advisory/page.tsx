import { ServicePageContent } from "@/components/service-page-content";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/site-config";

export const metadata = createPageMetadata({
  title: "综合顾问服务",
  description:
    "南湾咨询综合顾问服务，帮助客户整合跨境信息、协调合作伙伴并制定长期咨询方案。",
  path: "/services/advisory",
});

const copy = {
  zh: {
    back: "← 返回首页",
    badge: "核心服务",
    title: "综合顾问服务",
    intro: "跨境事务往往涉及多个领域、多方协调。我们作为客户的长期顾问，帮助整合信息、理清思路、对接资源，让复杂的事情变得可管理。",
    sections: [
      {
        title: "跨境信息整合",
        items: [
          "针对客户的具体情况，梳理涉及的政策、流程与时间节点",
          "多国信息交叉比对，识别关键差异与潜在风险",
          "定期信息更新，确保决策基于最新情况",
          "复杂问题拆解，输出清晰的行动建议",
        ],
      },
      {
        title: "合作伙伴对接",
        items: [
          "根据客户需求推荐合适的专业服务方（律师、会计、翻译等）",
          "协助与第三方的沟通协调，降低信息不对称",
          "项目进度跟踪与多方协调管理",
          "确保各环节衔接顺畅，避免重复沟通",
        ],
      },
      {
        title: "定制化咨询方案",
        items: [
          "一对一深度沟通，了解客户的完整背景和真实需求",
          "量身定制咨询方案，而非套用标准模板",
          "分阶段推进，每个阶段有明确的交付物和检查点",
          "灵活调整方案，适应变化中的需求",
        ],
      },
      {
        title: "长期顾问关系",
        items: [
          "不只是解决当下的问题，而是建立持续的咨询关系",
          "阶段性回顾与复盘，优化后续规划",
          "家庭层面的综合考量：子女教育、居住安排、事业发展",
          "作为客户的「外脑」，在关键决策时提供独立视角",
        ],
      },
    ],
    cta: "咨询顾问服务",
    ctaSub: `电话 ${siteConfig.phone} ｜ 邮箱 ${siteConfig.email}`,
  },
  en: {
    back: "← Back to Home",
    badge: "Core Service",
    title: "Advisory Services",
    intro: "Cross-border matters often span multiple domains and require coordination across parties. As your long-term advisor, we consolidate information, clarify thinking, and connect resources — making complex situations manageable.",
    sections: [
      {
        title: "Information Consolidation",
        items: [
          "Mapping relevant policies, processes, and timelines to your specific situation",
          "Cross-country comparison to identify key differences and potential risks",
          "Regular information updates to ensure decisions are based on current data",
          "Breaking down complex issues into clear, actionable recommendations",
        ],
      },
      {
        title: "Partner Coordination",
        items: [
          "Recommending vetted professionals (lawyers, accountants, translators, etc.)",
          "Facilitating third-party communication to reduce information asymmetry",
          "Project progress tracking and multi-party coordination",
          "Ensuring smooth handoffs between service stages",
        ],
      },
      {
        title: "Customized Solutions",
        items: [
          "One-on-one deep consultation to understand your full context and real needs",
          "Tailored advisory plans — no cookie-cutter templates",
          "Phased execution with clear deliverables and checkpoints at each stage",
          "Flexible plan adjustments as circumstances evolve",
        ],
      },
      {
        title: "Long-Term Advisory",
        items: [
          "Building an ongoing advisory relationship, not just solving today's problem",
          "Periodic reviews and retrospectives to optimize future planning",
          "Family-level holistic planning: children's education, housing, career development",
          "Serving as your external sounding board for critical decisions",
        ],
      },
    ],
    cta: "Inquire About Advisory Services",
    ctaSub: `Phone: ${siteConfig.phone} ｜ Email: ${siteConfig.email}`,
  },
} as const;

export default function AdvisoryPage() {
  return <ServicePageContent copy={copy} />;
}
