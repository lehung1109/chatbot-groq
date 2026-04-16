import Header from "@/components/header";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <Hero />
      </main>
    </>
  );
}
