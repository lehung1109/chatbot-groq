import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { Github } from "./github-icon";

const proofPoints = [
  "Evidence-backed AI reasoning",
  "Correlated logs, metrics, traces, and deploys",
  "From alert triage to RCA draft",
];

export function FinalCtaSection() {
  return (
    <section
      id="demo"
      className="relative overflow-hidden border-t border-white/10 bg-slate-950 py-24 text-slate-50"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.08),transparent_26%),radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.08),transparent_26%)]" />

      <div className="container relative mx-auto max-w-6xl px-4 md:px-6">
        <Card className="overflow-hidden border-white/10 bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_24px_80px_rgba(2,8,23,0.45)]">
          <CardContent className="relative p-6 sm:p-8 md:p-10 lg:p-14">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,211,238,0.06),transparent_30%,transparent_70%,rgba(168,85,247,0.05))]" />

            <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
              <Badge
                variant="outline"
                className="border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
              >
                Final CTA
              </Badge>

              <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
                Faster understanding during incidents. Better learning after
                them.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Incident Copilot helps teams reduce investigation overhead, keep
                operational context where the work happens, and turn raw
                telemetry into clearer decisions during high-pressure response.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {proofPoints.map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                >
                  <Link href="#demo">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    View live demo
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
                >
                  <Link href="#architecture">
                    Read the architecture
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="text-slate-200 hover:bg-white/5 hover:text-white"
                >
                  <Link href="#github">
                    <Github className="mr-2 h-4 w-4" />
                    Explore GitHub
                  </Link>
                </Button>
              </div>

              <p className="mt-6 text-sm text-slate-500">
                A portfolio-grade product concept built with a focus on incident
                workflow, observability, and engineering depth.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
