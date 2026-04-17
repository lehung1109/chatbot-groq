import { AiWithEvidenceSection } from "@/components/ai-with-evidence";
import { BuiltForOnCallSection } from "@/components/built-for-on-call";
import { FaqSection } from "@/components/faq";
import Header from "@/components/header";
import Hero from "@/components/hero";
import InvestigationFlow from "@/components/investigation-flow";
import { UnifiedSignalsSection } from "@/components/unified-signals";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <Hero />
        <InvestigationFlow />
        <UnifiedSignalsSection />
        <AiWithEvidenceSection />
        <BuiltForOnCallSection />
        <FaqSection />
      </main>
    </>
  );
}
