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
  AlertTriangle,
  ArrowRight,
  Bot,
  Clock3,
  FileText,
  Radar,
  SearchCheck,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Open the incident",
    description:
      "Start from an alert, a failing service, or a sudden latency spike. Incident Copilot loads impact, related services, recent deploys, and the active investigation window.",
    icon: AlertTriangle,
    tone: "border-amber-400/25 bg-amber-400/10 text-amber-200",
  },
  {
    step: "02",
    title: "Ask natural questions",
    description:
      "Use plain English to ask what changed, what broke first, whether this has happened before, or which dependency is driving customer impact.",
    icon: Bot,
    tone: "border-cyan-400/25 bg-cyan-400/10 text-cyan-200",
  },
  {
    step: "03",
    title: "Follow the evidence",
    description:
      "Every answer stays tied to logs, traces, metrics, deploy events, runbooks, and prior incidents, so responders can validate instead of guessing.",
    icon: SearchCheck,
    tone: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
  },
  {
    step: "04",
    title: "Generate the RCA draft",
    description:
      "Turn the investigation trail into a structured first-pass RCA with timeline, impact, root cause, contributing factors, and follow-up actions.",
    icon: FileText,
    tone: "border-violet-400/25 bg-violet-400/10 text-violet-200",
  },
];

const proofItems = [
  {
    label: "Incident summary",
    detail: "SEV-1 Â· Checkout latency spike Â· Blast radius detected",
  },
  {
    label: "Recent changes",
    detail: "Deploy found 2 minutes before the incident window",
  },
  {
    label: "Correlated evidence",
    detail: "Error bursts, slow traces, and DB contention grouped together",
  },
  {
    label: "Suggested next action",
    detail: "Compare pool metrics before and after deploy",
  },
];

export default function InvestigationFlow() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-slate-950 py-24 text-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.08),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.07),transparent_28%)]" />

      <div className="container relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <Badge
              variant="outline"
              className="border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
            >
              Investigation flow
            </Badge>

            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              How Incident Copilot works
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              The workflow is designed to move responders from raw telemetry to
              an evidence-backed explanation without losing context along the
              way.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-white/10 text-slate-200">
                Alert-first
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-slate-200">
                Natural language
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-slate-200">
                Evidence-backed
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-slate-200">
                RCA-ready
              </Badge>
            </div>

            <div className="mt-8 rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.05] p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 text-cyan-300" />
                <p className="text-sm leading-6 text-slate-200">
                  Instead of jumping between dashboards, runbooks, and
                  deployment history, responders keep the investigation inside
                  one shared workspace.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-cyan-500 text-slate-950 hover:bg-cyan-400"
              >
                View workflow demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
              >
                See the architecture
              </Button>
            </div>
          </div>

          <div className="grid gap-6 lg:col-span-7 xl:grid-cols-[1.15fr_0.85fr]">
            <Card className="border-white/10 bg-white/[0.04]">
              <CardHeader>
                <CardTitle className="text-white">Investigation path</CardTitle>
                <CardDescription className="text-slate-400">
                  A step-by-step flow from incident intake to post-incident
                  output.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="relative">
                  <div className="absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-cyan-400/40 via-white/10 to-violet-400/30" />

                  <div className="space-y-6">
                    {steps.map((item, index) => {
                      const Icon = item.icon;

                      return (
                        <div key={item.step} className="relative pl-14">
                          <div
                            className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border ${item.tone}`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 sm:p-5">
                            <div className="flex flex-wrap items-center gap-3">
                              <Badge
                                variant="outline"
                                className="border-white/10 text-slate-300"
                              >
                                Step {item.step}
                              </Badge>
                              <h3 className="text-base font-semibold text-white sm:text-lg">
                                {item.title}
                              </h3>
                            </div>

                            <p className="mt-3 text-sm leading-7 text-slate-300">
                              {item.description}
                            </p>

                            {index < steps.length - 1 && (
                              <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                                <ArrowRight className="h-3.5 w-3.5" />
                                Next step
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-white/10 bg-white/[0.04]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Radar className="h-4 w-4 text-cyan-300" />
                    What gets loaded first
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    The system pulls the highest-value context at incident
                    start.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  {proofItems.map((item, index) => (
                    <div key={item.label}>
                      <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
                        <p className="text-sm font-medium text-slate-100">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          {item.detail}
                        </p>
                      </div>

                      {index < proofItems.length - 1 && (
                        <Separator className="my-3 bg-white/5" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-amber-400/20 bg-amber-400/[0.06]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Clock3 className="h-4 w-4 text-amber-300" />
                    Why this matters
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Faster context gathering means faster investigation.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-sm leading-7 text-slate-200">
                    During an incident, responders lose time when they have to
                    reconstruct the same context across monitoring, logs,
                    traces, deploy history, and internal docs. This workflow
                    reduces that overhead by bringing the first layer of context
                    into a single starting point.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

