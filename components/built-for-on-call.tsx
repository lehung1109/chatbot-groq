import Link from "next/link";
import { Badge } from "@/packages/shacnui/src/ui/badge";
import { Button } from "@/packages/shacnui/src/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/packages/shacnui/src/ui/card";
import { Separator } from "@/packages/shacnui/src/ui/separator";
import {
  ArrowRight,
  BellRing,
  BookOpenText,
  ClipboardList,
  GitBranch,
  ShieldAlert,
  Siren,
  Users,
} from "lucide-react";

const features = [
  {
    icon: ClipboardList,
    title: "Incident timeline",
    description:
      "Bring alerts, deploys, responder notes, escalations, and mitigation events into one chronological view so every engineer sees the same source of truth.",
    badge: "shared context",
    accent: "border-cyan-400/20 bg-cyan-400/8 text-cyan-200",
  },
  {
    icon: GitBranch,
    title: "Dependency-aware investigation",
    description:
      "Map affected services, upstream dependencies, and blast radius without reconstructing service relationships manually during an outage.",
    badge: "blast radius",
    accent: "border-emerald-400/20 bg-emerald-400/8 text-emerald-200",
  },
  {
    icon: BookOpenText,
    title: "Runbook retrieval",
    description:
      "Surface the right SOPs, response playbooks, and service-specific recovery steps exactly when responders need them.",
    badge: "faster recovery",
    accent: "border-amber-400/20 bg-amber-400/8 text-amber-200",
  },
  {
    icon: BellRing,
    title: "Signal-driven triage",
    description:
      "Start from the alert, then correlate metrics, logs, traces, and recent changes to reduce noise and focus attention on the likely cause.",
    badge: "alert-first",
    accent: "border-rose-400/20 bg-rose-400/8 text-rose-200",
  },
  {
    icon: Users,
    title: "Responder handoff",
    description:
      "Let new responders join the incident with the timeline, evidence, and AI summary already in place, instead of asking the same context questions again.",
    badge: "team visibility",
    accent: "border-violet-400/20 bg-violet-400/8 text-violet-200",
  },
  {
    icon: ShieldAlert,
    title: "RCA-ready trail",
    description:
      "Keep investigation notes, evidence, and decisions attached to the incident so the transition from mitigation to RCA is much faster and cleaner.",
    badge: "post-incident ready",
    accent: "border-sky-400/20 bg-sky-400/8 text-sky-200",
  },
];

const highlights = [
  "Designed around real on-call pressure",
  "Reduces context switching during incidents",
  "Keeps evidence attached to every conclusion",
];

export function BuiltForOnCallSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-slate-950 py-24 text-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(34,211,238,0.08),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.07),transparent_24%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.06),transparent_24%)]" />

      <div className="container relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <Badge
              variant="outline"
              className="border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
            >
              Built for on-call teams
            </Badge>

            <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Operational context where the response actually happens
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Incident Copilot is designed around the decisions responders make
              during a real outage: what changed, who is affected, which
              dependency is involved, what to do next, and how to preserve the
              trail for RCA.
            </p>

            <div className="mt-8 space-y-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <Siren className="mt-0.5 h-4 w-4 text-cyan-300" />
                  <p className="text-sm leading-6 text-slate-200">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-medium text-slate-100">
                During an incident, speed comes from shared context.
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                The faster your team sees the same timeline, the same evidence,
                and the same current hypothesis, the less time gets wasted
                repeating investigations in parallel.
              </p>
              <Separator className="my-4 bg-white/5" />
              <Button
                asChild
                variant="outline"
                className="w-full justify-between border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
              >
                <Link href="#workflow">
                  Explore the response workflow
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <Card
                    key={feature.title}
                    className="group h-full border-white/10 bg-white/[0.04] transition-colors hover:bg-white/[0.06]"
                  >
                    <CardHeader className="space-y-4">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${feature.accent}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <CardTitle className="text-lg text-white">
                            {feature.title}
                          </CardTitle>
                          <Badge
                            variant="outline"
                            className="border-white/10 text-[11px] text-slate-300"
                          >
                            {feature.badge}
                          </Badge>
                        </div>

                        <CardDescription className="text-sm leading-7 text-slate-400">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-xs uppercase tracking-[0.18em] text-slate-500">
                        On-call capability
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
