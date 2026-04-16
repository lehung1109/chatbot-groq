import Header from "@/components/header";
import Hero from "@/components/hero";
import InvestigationFlow from "@/components/Investigation-flow";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <Hero />
        <InvestigationFlow />
      </main>
    </>
  );
}
