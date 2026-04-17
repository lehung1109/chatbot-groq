import { AiWithEvidenceSection } from "@/components/ai-with-evidence";
import { BuiltForOnCallSection } from "@/components/built-for-on-call";
import { FaqSection } from "@/components/faq";
import { FinalCtaSection } from "@/components/final-cta";
import Hero from "@/components/hero";
import InvestigationFlow from "@/components/investigation-flow";
import { UnifiedSignalsSection } from "@/components/unified-signals";

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
    </>
  );
}
