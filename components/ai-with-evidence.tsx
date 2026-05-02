import { Badge } from "@heroitvn/shacnui/ui/badge";
import { Button } from "@heroitvn/shacnui/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@heroitvn/shacnui/ui/card";
import { Separator } from "@heroitvn/shacnui/ui/separator";
import {
  ArrowRight,
  Bot,
  Brain,
  FileSearch,
  GitCompareArrows,
  MessageSquareQuote,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

const prompts = [
  "What changed before the spike started?",
  "Why did p95 increase after the 10:20 deploy?",
  "Which dependency is driving the error budget burn?",
  "Have we seen this failure pattern before?",
];

const toolEvents = [
  {
    label: "Comparing deploy 1.41.9 â†’ 1.42.0",
    meta: "config diff Â· retry policy Â· pool settings",
    tone: "cyan",
  },
  {
    label: "Searching correlated error groups",
    meta: "checkout-service Â· 12 min window",
    tone: "rose",
  },
  {
    label: "Inspecting slow trace exemplars",
    meta: "db.query Â· payment.authorize spans",
    tone: "emerald",
  },
  {
    label: "Retrieving related runbook and prior incident",
    meta: "checkout latency regression Â· SEV-1",
    tone: "amber",
  },
];

const evidence = [
  {
    title: "Deploy diff",
    detail: "checkout-service@1.42.0 changed retry and pool config",
    badge: "change",
  },
  {
    title: "Trace sample",
    detail: "db.query span > 2.8s on the critical checkout path",
    badge: "trace",
  },
  {
    title: "Log burst",
    detail: "Connection pool exhausted appeared 133 times",
    badge: "logs",
  },
  {
    title: "Runbook",
    detail: "Database contention mitigation playbook matched current symptoms",
    badge: "runbook",
  },
];

function ToneDot({ tone }: { tone: "cyan" | "rose" | "emerald" | "amber" }) {
  const map = {
    cyan: "bg-cyan-400",
    rose: "bg-rose-400",
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
  };

  return <span className={`h-2.5 w-2.5 rounded-full ${map[tone]}`} />;
}

export function AiWithEvidenceSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#020817] py-24 text-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.10),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(251,113,133,0.08),transparent_28%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.08),transparent_30%)]" />
      <div className="container relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <Badge
              variant="outline"
              className="border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
            >
              AI with evidence
            </Badge>

            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              AI reasoning, grounded in real evidence.
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Incident Copilot helps responders ask better questions, surface
              the most relevant signals, and move faster under pressure. Every
              answer stays tied to logs, traces, metrics, deploy events, and
              operational context instead of acting like a black box.
            </p>

            <div className="mt-8 space-y-3">
              {prompts.map((prompt) => (
                <div
                  key={prompt}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <MessageSquareQuote className="mt-0.5 h-4 w-4 text-cyan-300" />
                  <p className="text-sm text-slate-200">{prompt}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-cyan-500 text-slate-950 hover:bg-cyan-400"
              >
                View investigation demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
              >
                Read architecture
              </Button>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-300" />
              <p className="text-sm leading-6 text-slate-200">
                Use the assistant to accelerate investigation, summarize
                context, and test hypotheses â€” not to replace engineering
                judgment.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:col-span-7">
            <Card className="overflow-hidden border-white/10 bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
              <CardHeader className="border-b border-white/10 bg-white/[0.03]">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Bot className="h-5 w-5 text-cyan-300" />
                      Investigation thread
                    </CardTitle>
                    <CardDescription className="mt-1 text-slate-400">
                      Streaming reasoning with visible tool activity and linked
                      evidence.
                    </CardDescription>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/15">
                      live analysis
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-white/10 text-slate-300"
                    >
                      incident: SEV-1
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-5 p-5">
                <div className="flex gap-3">
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">
                    <Bot className="h-4 w-4 text-cyan-200" />
                  </div>

                  <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                    <p className="text-sm leading-7 text-slate-100">
                      I found a strong correlation between the 10:20 deploy and
                      the latency spike. Error bursts began about 90 seconds
                      later, and the slowest traces now cluster around database
                      access on the checkout path.
                    </p>

                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/[0.06] p-3">
                        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
                          <Sparkles className="h-3.5 w-3.5" />
                          Fact
                        </div>
                        <p className="mt-2 text-sm text-slate-200">
                          The incident window starts immediately after the
                          latest checkout deploy.
                        </p>
                      </div>

                      <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-3">
                        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-amber-200">
                          <Brain className="h-3.5 w-3.5" />
                          Hypothesis
                        </div>
                        <p className="mt-2 text-sm text-slate-200">
                          A retry or connection-pool regression likely amplified
                          DB contention.
                        </p>
                      </div>
                    </div>

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
                      <Badge
                        variant="outline"
                        className="border-emerald-400/20 text-emerald-200"
                      >
                        runbook match
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-slate-300" />
                    <p className="text-sm font-medium text-slate-100">
                      Tool activity
                    </p>
                  </div>

                  <div className="space-y-3">
                    {toolEvents.map((event, index) => (
                      <div key={event.label}>
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <ToneDot
                              tone={
                                event.tone as
                                  | "cyan"
                                  | "rose"
                                  | "emerald"
                                  | "amber"
                              }
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-slate-200">
                              {event.label}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              {event.meta}
                            </p>
                          </div>

                          <Badge
                            variant="outline"
                            className="border-white/10 text-[11px] text-slate-300"
                          >
                            completed
                          </Badge>
                        </div>

                        {index < toolEvents.length - 1 && (
                          <Separator className="mt-3 bg-white/5" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
              <Card className="border-white/10 bg-white/[0.04]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <FileSearch className="h-4 w-4 text-emerald-300" />
                    Evidence board
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Every conclusion should be explainable and reviewable.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  {evidence.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border border-white/10 bg-slate-950/60 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-slate-100">
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-slate-400">
                            {item.detail}
                          </p>
                        </div>

                        <Badge
                          variant="secondary"
                          className="bg-white/10 text-slate-200 hover:bg-white/10"
                        >
                          {item.badge}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-white/[0.04]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <ScanSearch className="h-4 w-4 text-cyan-300" />
                    What the assistant can do
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Built for investigation, not generic conversation.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
                    <div className="flex items-start gap-3">
                      <GitCompareArrows className="mt-0.5 h-4 w-4 text-cyan-300" />
                      <div>
                        <p className="text-sm font-medium text-slate-100">
                          Compare signals across time windows
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          See what changed before and after a deploy, config
                          update, or traffic spike.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
                    <div className="flex items-start gap-3">
                      <Brain className="mt-0.5 h-4 w-4 text-amber-300" />
                      <div>
                        <p className="text-sm font-medium text-slate-100">
                          Suggest likely root causes
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          Separate facts from hypotheses and recommend the next
                          highest-value check.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
                    <div className="flex items-start gap-3">
                      <FileSearch className="mt-0.5 h-4 w-4 text-emerald-300" />
                      <div>
                        <p className="text-sm font-medium text-slate-100">
                          Pull forward the right evidence
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          Logs, traces, deploy diffs, runbooks, and similar
                          incidents stay attached to the answer.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="mt-2 w-full justify-between border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
                  >
                    Explore the investigation workflow
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

