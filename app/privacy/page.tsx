import { PrivacyPageContent } from "@/components/privacy-page-content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "隐私政策",
  description: "南湾咨询（无锡）有限公司的隐私政策页面，说明网站的信息收集、使用与安全措施。",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
