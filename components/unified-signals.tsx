import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Box,
  Database,
  GitCommitHorizontal,
  Network,
  Radar,
  ReceiptText,
  Waves,
} from "lucide-react";

const kpis = [
  {
    title: "Request rate",
    value: "1.2k rpm",
    change: "+8.4%",
    tone: "text-emerald-400",
    bars: [48, 62, 58, 72, 68, 80, 76, 88],
  },
  {
    title: "Error rate",
    value: "3.8%",
    change: "+2.1%",
    tone: "text-rose-400",
    bars: [18, 24, 20, 40, 52, 58, 44, 36],
  },
  {
    title: "p95 latency",
    value: "2.4s",
    change: "+1.7s",
    tone: "text-amber-400",
    bars: [16, 18, 20, 24, 38, 55, 72, 84],
  },
  {
    title: "Saturation",
    value: "81%",
    change: "+12%",
    tone: "text-cyan-400",
    bars: [30, 34, 36, 42, 48, 60, 70, 76],
  },
];

const logGroups = [
  {
    label: "DB timeout exceeded",
    meta: "842 events · checkout-service",
    level: "error",
  },
  {
    label: "Retry storm detected",
    meta: "417 events · payments-api",
    level: "warn",
  },
  {
    label: "Connection pool exhausted",
    meta: "133 events · postgres-primary",
    level: "critical",
  },
];

const traces = [
  {
    path: "POST /checkout",
    detail: "db.query span > 2.8s",
    impact: "critical path",
  },
  {
    path: "POST /payment/authorize",
    detail: "upstream wait 1.3s",
    impact: "dependency bottleneck",
  },
  {
    path: "GET /cart/summary",
    detail: "healthy baseline",
    impact: "control sample",
  },
];

const changes = [
  "checkout-service@1.42.0 deployed at 10:20",
  "DB_POOL_SIZE changed from 20 to 40",
  "smart-retries feature flag enabled",
];

const dependencies = [
  "payments-api",
  "postgres-primary",
  "redis-cache",
  "gateway-edge",
];

function MiniBars({ bars }: Readonly<{ bars: number[] }>) {
  return (
    <div className="flex h-10 items-end gap-1">
      {bars.map((bar, index) => (
        <div
          key={index}
          className="w-2 rounded-full bg-primary/70"
          style={{ height: `${bar}%` }}
        />
      ))}
    </div>
  );
}

export function UnifiedSignalsSection() {
  return (
    <section className="relative overflow-hidden border-y bg-slate-950 py-24 text-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.10),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.08),transparent_30%)]" />
      <div className="container relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
              >
                Unified signals
              </Badge>
            </div>

            <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              One place for the signals that matter.
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Correlate metrics, logs, traces, and deploy events inside the same
              incident window. Instead of bouncing between tools, responders can
              narrow the blast radius, inspect likely causes, and move from
              spike to root cause in one workspace.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-white/10 text-slate-200">
                Metrics
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-slate-200">
                Logs
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-slate-200">
                Traces
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-slate-200">
                Deploys
              </Badge>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:col-span-7">
            <Card className="border-white/10 bg-white/5 backdrop-blur">
              <CardContent className="flex items-start gap-3 p-4">
                <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-300" />
                <div>
                  <p className="text-sm font-medium text-slate-200">
                    Latency spike detected
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    p95 jumped 4x in the last 12 minutes.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 backdrop-blur">
              <CardContent className="flex items-start gap-3 p-4">
                <GitCommitHorizontal className="mt-0.5 h-4 w-4 text-cyan-300" />
                <div>
                  <p className="text-sm font-medium text-slate-200">
                    Deploy marker found
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    checkout-service changed 2 minutes before the spike.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 backdrop-blur">
              <CardContent className="flex items-start gap-3 p-4">
                <Radar className="mt-0.5 h-4 w-4 text-emerald-300" />
                <div>
                  <p className="text-sm font-medium text-slate-200">
                    Trace exemplar attached
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Slow spans point to DB contention.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {kpis.map((kpi) => (
                <Card
                  key={kpi.title}
                  className="border-white/10 bg-white/[0.04] shadow-none"
                >
                  <CardHeader className="pb-2">
                    <CardDescription className="text-slate-400">
                      {kpi.title}
                    </CardDescription>
                    <CardTitle className="text-2xl font-semibold text-white">
                      {kpi.value}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className={`text-xs font-medium ${kpi.tone}`}>
                      {kpi.change} vs baseline
                    </div>
                    <MiniBars bars={kpi.bars} />
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-white/10 bg-white/4">
              <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <CardTitle className="text-white">
                    Incident window overview
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Latency and error rate aligned to the same production time
                    range.
                  </CardDescription>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="border-white/10 text-slate-300"
                  >
                    service: checkout
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-white/10 text-slate-300"
                  >
                    env: prod
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-white/10 text-slate-300"
                  >
                    range: 1h
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="rounded-xl border border-white/10 bg-slate-900/80 p-4">
                  <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-cyan-400" />{" "}
                        Latency
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-rose-400" />{" "}
                        Error rate
                      </div>
                    </div>
                    <div className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-1 text-amber-200">
                      Deploy at 10:20
                    </div>
                  </div>

                  <div className="relative h-72 overflow-hidden rounded-lg border border-white/5 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[100%_48px,48px_100%]">
                    <svg
                      viewBox="0 0 800 280"
                      className="absolute inset-0 h-full w-full"
                      preserveAspectRatio="none"
                    >
                      <line
                        x1="515"
                        y1="0"
                        x2="515"
                        y2="280"
                        stroke="rgba(251,191,36,0.8)"
                        strokeDasharray="6 6"
                        strokeWidth="2"
                      />
                      <path
                        d="M0,210 C60,205 110,204 160,202 C210,200 250,198 300,194 C350,190 400,185 460,170 C520,155 560,120 610,110 C660,100 710,98 800,92"
                        fill="none"
                        stroke="rgba(34,211,238,0.95)"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M0,230 C60,229 110,228 160,226 C210,224 250,220 300,218 C350,216 400,213 460,205 C520,197 560,184 610,156 C660,128 710,122 800,118"
                        fill="none"
                        stroke="rgba(251,113,133,0.9)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="610"
                        cy="110"
                        r="5"
                        fill="rgba(34,211,238,1)"
                      />
                      <circle
                        cx="610"
                        cy="156"
                        r="5"
                        fill="rgba(251,113,133,1)"
                      />
                    </svg>

                    <div className="absolute left-[515px] top-3 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-1 text-[10px] font-medium text-amber-200">
                      deploy
                    </div>

                    <div className="absolute inset-x-0 bottom-0 flex justify-between px-3 pb-2 text-[10px] text-slate-500">
                      <span>09:55</span>
                      <span>10:05</span>
                      <span>10:15</span>
                      <span>10:25</span>
                      <span>10:35</span>
                      <span>10:45</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 xl:grid-cols-2">
              <Card className="border-white/10 bg-white/4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <ReceiptText className="h-4 w-4 text-rose-300" />
                    Top log patterns
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Grouped errors and bursts inside the active incident window.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {logGroups.map((log, index) => (
                    <div
                      key={log.label}
                      className="rounded-lg border border-white/10 bg-black/20 p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-slate-100">
                            {log.label}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {log.meta}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            log.level === "critical"
                              ? "border-rose-400/30 bg-rose-400/10 text-rose-200"
                              : log.level === "warn"
                                ? "border-amber-400/30 bg-amber-400/10 text-amber-200"
                                : "border-white/10 text-slate-300"
                          }
                        >
                          {log.level}
                        </Badge>
                      </div>
                      {index < logGroups.length - 1 && (
                        <Separator className="mt-3 bg-white/5" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-white/4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Waves className="h-4 w-4 text-cyan-300" />
                    Trace exemplars
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Slow paths and service spans most likely tied to user
                    impact.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {traces.map((trace) => (
                    <div
                      key={trace.path}
                      className="rounded-lg border border-white/10 bg-black/20 p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-mono text-sm text-cyan-100">
                            {trace.path}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {trace.detail}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                        >
                          {trace.impact}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-4">
            <Card className="border-white/10 bg-white/4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <GitCommitHorizontal className="h-4 w-4 text-amber-300" />
                  Recent changes
                </CardTitle>
                <CardDescription className="text-slate-400">
                  The strongest “why now?” signals around incident start time.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {changes.map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-white/10 bg-black/20 px-3 py-3 text-sm text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Network className="h-4 w-4 text-emerald-300" />
                  Dependencies
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Systems linked to the active customer path.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {dependencies.map((dep) => (
                  <div
                    key={dep}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-3"
                  >
                    <div className="flex items-center gap-2 text-sm text-slate-200">
                      {dep.includes("postgres") ? (
                        <Database className="h-4 w-4 text-slate-400" />
                      ) : dep.includes("redis") ? (
                        <Box className="h-4 w-4 text-slate-400" />
                      ) : (
                        <Activity className="h-4 w-4 text-slate-400" />
                      )}
                      {dep}
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-500" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-cyan-400/20 bg-cyan-400/6">
              <CardHeader>
                <CardTitle className="text-white">AI summary</CardTitle>
                <CardDescription className="text-slate-300">
                  First-pass interpretation across correlated signals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-cyan-300/10 bg-slate-950/60 p-4 text-sm leading-6 text-slate-200">
                  Checkout latency increased shortly after the 10:20 deploy.
                  Error bursts and slow traces both point to database
                  contention, with retry amplification increasing pressure on
                  the payments path. The fastest next check is to compare pool
                  usage before and after deploy, then validate whether the retry
                  policy changed.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
