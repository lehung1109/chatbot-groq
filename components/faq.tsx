import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, CircleHelp, ShieldCheck } from "lucide-react";
import { Github } from "./github-icon";

const faqs = [
  {
    value: "item-1",
    question: "Is Incident Copilot a monitoring platform?",
    answer:
      "No. Incident Copilot is not trying to replace your metrics, logs, or tracing stack. It sits on top of your existing observability and incident data sources to help responders investigate faster inside a single workspace.",
  },
  {
    value: "item-2",
    question: "Does the assistant replace engineers during incidents?",
    answer:
      "No. The assistant is designed to reduce investigation overhead, summarize signals, and suggest likely next checks. Engineers still validate evidence, make decisions, and own the response.",
  },
  {
    value: "item-3",
    question: "What kinds of evidence can the assistant use?",
    answer:
      "The assistant can work with logs, metrics, traces, deploy events, configuration changes, runbooks, and similar incidents. The goal is to keep answers tied to operational evidence instead of unsupported guesses.",
  },
  {
    value: "item-4",
    question: "Can it generate an RCA draft?",
    answer:
      "Yes. Incident Copilot can turn the investigation trail into a structured first-pass RCA draft with timeline, impact summary, suspected root cause, contributing factors, and follow-up actions.",
  },
  {
    value: "item-5",
    question: "What makes this different from a generic AI chat tool?",
    answer:
      "The product is designed around incident investigation workflows. It understands incident context, uses operational tools, surfaces linked evidence, and helps responders move from alert to RCA instead of just answering questions in isolation.",
  },
  {
    value: "item-6",
    question: "What stack is this built with?",
    answer:
      "The project is designed around Next.js, shadcn/ui, Tailwind CSS, OpenTelemetry concepts, and AI tool-calling workflows. It is intended as a portfolio-grade product concept focused on both UX and engineering depth.",
  },
];

export function FaqSection() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden border-y border-white/10 bg-slate-950 py-24 text-slate-50"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.08),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.07),transparent_24%)]" />

      <div className="container relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <Badge
              variant="outline"
              className="border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
            >
              FAQ
            </Badge>

            <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Questions teams usually ask before they trust the workflow
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Incident Copilot is a technical product concept, so the most
              useful questions are usually about evidence, workflow boundaries,
              and how it fits into an existing observability stack.
            </p>

            <Card className="mt-8 border-white/10 bg-white/[0.04]">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
                    <ShieldCheck className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white">
                      Evidence-backed by design
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      The assistant is meant to guide investigation with linked
                      telemetry and operational context, not replace judgment
                      with opaque answers.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    className="bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                  >
                    <Link href="#demo">
                      View demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
                  >
                    <Link href="#github">
                      <Github className="mr-2 h-4 w-4" />
                      Explore GitHub
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-8">
            <Card className="border-white/10 bg-white/[0.04]">
              <CardContent className="p-4 sm:p-6">
                <Accordion
                  type="single"
                  collapsible
                  defaultValue="item-1"
                  className="w-full"
                >
                  {faqs.map((faq) => (
                    <AccordionItem
                      key={faq.value}
                      value={faq.value}
                      className="border-b border-white/10"
                    >
                      <AccordionTrigger className="group py-5 text-left text-base font-medium text-white hover:no-underline sm:text-lg">
                        <div className="mr-4 flex items-start gap-3 text-left">
                          <CircleHelp className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />
                          <span>{faq.question}</span>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="pb-5 pl-7 pr-2 text-sm leading-7 text-slate-400 sm:text-base">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
