import { AiWithEvidenceSection } from "@/components/ai-with-evidence";
import { BuiltForOnCallSection } from "@/components/built-for-on-call";
import { FaqSection } from "@/components/faq";
import { FinalCtaSection } from "@/components/final-cta";
import Hero from "@/components/hero";
import InvestigationFlow from "@/components/investigation-flow";
import { UnifiedSignalsSection } from "@/components/unified-signals";
import { ChatbotToggle } from "@/packages/chatbot-toggle/src";
import { Metadata } from "next";

// metadata
export const metadata: Metadata = {
  title: "Home - Incident Copilot",
  description:
    "Incident Copilot is an AI-powered incident management tool for incident response teams.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <InvestigationFlow />
      <UnifiedSignalsSection />
      <AiWithEvidenceSection />
      <BuiltForOnCallSection />
      <FaqSection />
      <FinalCtaSection />
      <ChatbotToggle isFloat={true} />
    </>
  );
}
