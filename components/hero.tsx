import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  GitCommitHorizontal,
  Radar,
  ShieldAlert,
  Sparkles,
  Workflow,
} from "lucide-react";

const proofItems = [
  "Correlates logs, metrics, traces, and deploy history",
  "Guides investigation with evidence-backed AI reasoning",
  "Drafts the RCA from the incident trail",
];

const timeline = [
  { time: "10:20", label: "checkout-service deploy detected" },
  { time: "10:22", label: "p95 latency alert fired" },
  { time: "10:24", label: "error bursts found in checkout logs" },
  { time: "10:27", label: "slow trace exemplars linked to DB contention" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-slate-950 text-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(251,191,36,0.08),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.08),transparent_26%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_20%,transparent_80%,rgba(255,255,255,0.02))]" />

      <div className="container relative mx-auto max-w-7xl px-4 pb-16 pt-20 md:px-6 md:pb-24 md:pt-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Badge
              variant="outline"
              className="border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
            >
              AI-assisted incident investigation
            </Badge>

            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              Investigate incidents from alert to RCA
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Incident Copilot brings logs, metrics, traces, deploys, and
              runbooks into one workspace, so on-call engineers can understand
              impact, test hypotheses, and move to resolution faster.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-cyan-500 text-slate-950 hover:bg-cyan-400"
              >
                <Link href="#demo">
                  View live demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
              >
                <Link href="#architecture">Read the architecture</Link>
              </Button>
            </div>

            <div className="mt-8 grid gap-3">
              {proofItems.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <Sparkles className="mt-0.5 h-4 w-4 text-cyan-300" />
                  <p className="text-sm leading-6 text-slate-200">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="bg-white/10 text-slate-200">
                Next.js
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-slate-200">
                OpenTelemetry
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-slate-200">
                AI tool calling
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-slate-200">
                Incident workflow
              </Badge>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Card className="overflow-hidden border-white/10 bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_24px_80px_rgba(2,8,23,0.45)] backdrop-blur">
              <CardHeader className="border-b border-white/10 bg-white/[0.03]">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="bg-rose-500/15 text-rose-200 hover:bg-rose-500/15">
                        SEV-1
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-white/10 text-slate-300"
                      >
                        checkout-service
                      </Badge>
                    </div>

                    <CardTitle className="mt-3 text-xl text-white sm:text-2xl">
                      Checkout latency spike after deploy
                    </CardTitle>
                    <CardDescription className="mt-2 max-w-2xl text-slate-400">
                      Started at 10:22 UTC · Affected services: checkout,
                      payments, gateway · Customer impact detected in the active
                      incident window
                    </CardDescription>
                  </div>

                  <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.08] px-4 py-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-amber-200">
                      <ShieldAlert className="h-4 w-4" />
                      Blast radius expanding
                    </div>
                    <p className="mt-1 text-xs leading-5 text-slate-300">
                      Elevated latency and retries on the checkout path
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="grid gap-6 p-5 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                        <Radar className="h-3.5 w-3.5 text-cyan-300" />
                        p95 latency
                      </div>
                      <div className="mt-3 text-2xl font-semibold text-white">
                        2.4s
                      </div>
                      <p className="mt-1 text-sm text-amber-300">
                        +1.7s vs baseline
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                        <AlertTriangle className="h-3.5 w-3.5 text-rose-300" />
                        error rate
                      </div>
                      <div className="mt-3 text-2xl font-semibold text-white">
                        3.8%
                      </div>
                      <p className="mt-1 text-sm text-rose-300">
                        critical increase
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                        <GitCommitHorizontal className="h-3.5 w-3.5 text-emerald-300" />
                        recent change
                      </div>
                      <div className="mt-3 text-lg font-semibold text-white">
                        10:20 deploy
                      </div>
                      <p className="mt-1 text-sm text-emerald-300">
                        strong timing correlation
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-slate-100">
                          Investigation timeline
                        </p>
                        <p className="mt-1 text-sm text-slate-400">
                          The first signals loaded into the workspace
                        </p>
                      </div>

                      <Badge
                        variant="outline"
                        className="border-cyan-400/20 text-cyan-200"
                      >
                        live incident context
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      {timeline.map((item, index) => (
                        <div key={item.time}>
                          <div className="grid grid-cols-[64px_1fr] gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                            <div className="font-mono text-sm text-cyan-200">
                              {item.time}
                            </div>
                            <div className="text-sm text-slate-200">
                              {item.label}
                            </div>
                          </div>

                          {index < timeline.length - 1 && (
                            <Separator className="my-2 bg-white/5" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.06] p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-cyan-200">
                      <Bot className="h-4 w-4" />
                      AI summary
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-100">
                      I found a strong correlation between the latest checkout
                      deploy and the latency spike. The first signs of
                      degradation appeared in checkout traces, followed by retry
                      amplification and database contention across the payments
                      path.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="border-cyan-400/20 text-cyan-200"
                      >
                        trace samples
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-rose-400/20 text-rose-200"
                      >
                        error logs
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-amber-400/20 text-amber-200"
                      >
                        deploy diff
                      </Badge>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-100">
                      <Workflow className="h-4 w-4 text-emerald-300" />
                      Suggested next step
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      Compare connection pool behavior before and after the
                      deploy, then validate whether retry policy changes
                      increased pressure on the database and payment dependency.
                    </p>

                    <Button
                      variant="outline"
                      className="mt-4 w-full justify-between border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
                    >
                      Open investigation workspace
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-400">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Built for on-call engineers
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Evidence-backed AI answers
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                From alert to RCA
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
