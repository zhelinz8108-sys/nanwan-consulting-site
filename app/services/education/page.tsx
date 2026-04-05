import { ServicePageContent } from "@/components/service-page-content";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/site-config";

export const metadata = createPageMetadata({
  title: "国际教育规划",
  description:
    "南湾咨询国际教育规划服务，覆盖方向评估、选校匹配、申请材料准备与录取后衔接支持。",
  path: "/services/education",
});

const copy = {
  zh: {
    back: "← 返回首页",
    badge: "核心服务",
    title: "国际教育规划",
    intro: "为有留学意向的学生和家庭提供全流程、体系化的教育规划服务。我们不做信息搬运，而是基于对院校、专业和申请逻辑的深入理解，帮助每一位客户找到真正适合的方向。",
    sections: [
      {
        title: "方向评估与定位",
        items: [
          "深度了解学生的学术背景、兴趣特长与职业倾向",
          "分析目标国家的教育体系、签证政策与就业前景",
          "综合评估后给出 2-3 条可行的留学路径建议",
          "家庭沟通会议，对齐期望与现实条件",
        ],
      },
      {
        title: "院校筛选与匹配",
        items: [
          "根据定位结果建立个性化院校清单（冲刺/匹配/保底）",
          "逐校分析录取标准、专业优势与校园文化",
          "关注排名之外的因素：地理位置、实习资源、校友网络",
          "动态调整选校策略，跟踪最新招生变化",
        ],
      },
      {
        title: "申请策略与材料准备",
        items: [
          "制定完整的申请时间线与任务清单",
          "文书指导：挖掘个人故事，提炼核心竞争力",
          "推荐信策略：选择推荐人、沟通要点建议",
          "标化考试规划与成绩提交策略",
        ],
      },
      {
        title: "面试与录取后衔接",
        items: [
          "模拟面试训练，覆盖常见问题与应答框架",
          "Offer 对比分析，帮助做出最终选择",
          "入学前准备指引：签证、住宿、选课、行前清单",
          "与跨境安居服务无缝衔接，确保平稳过渡",
        ],
      },
    ],
    cta: "咨询教育规划",
    ctaSub: `电话 ${siteConfig.phone} ｜ 邮箱 ${siteConfig.email}`,
  },
  en: {
    back: "← Back to Home",
    badge: "Core Service",
    title: "Education Planning",
    intro: "We provide end-to-end education planning for students and families considering studying abroad. Rather than simply aggregating information, we leverage deep knowledge of institutions, programs, and admissions logic to help each client find the right path.",
    sections: [
      {
        title: "Assessment & Positioning",
        items: [
          "In-depth understanding of academic background, interests, and career goals",
          "Analysis of target countries' education systems, visa policies, and employment prospects",
          "2-3 actionable study-abroad pathway recommendations",
          "Family alignment sessions to bridge expectations and reality",
        ],
      },
      {
        title: "School Selection & Matching",
        items: [
          "Personalized school lists (reach / match / safety)",
          "School-by-school analysis of admission criteria, program strengths, and culture",
          "Beyond rankings: location, internship access, alumni networks",
          "Dynamic strategy adjustments tracking latest admissions changes",
        ],
      },
      {
        title: "Application Strategy & Materials",
        items: [
          "Complete application timeline and task checklist",
          "Essay coaching: uncovering personal stories and core strengths",
          "Recommendation letter strategy and talking points",
          "Standardized test planning and score submission strategy",
        ],
      },
      {
        title: "Interview & Post-Admission",
        items: [
          "Mock interview training with common Q&A frameworks",
          "Offer comparison analysis for final decision-making",
          "Pre-departure guide: visa, housing, course selection, packing list",
          "Seamless handoff to relocation services for a smooth transition",
        ],
      },
    ],
    cta: "Inquire About Education Planning",
    ctaSub: `Phone: ${siteConfig.phone} ｜ Email: ${siteConfig.email}`,
  },
} as const;

export default function EducationPage() {
  return <ServicePageContent copy={copy} />;
}
