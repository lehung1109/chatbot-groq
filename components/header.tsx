"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ArrowRight, Menu, ShieldAlert } from "lucide-react";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const navItems = [
  { label: "Product", href: "#product" },
  { label: "Workflow", href: "#workflow" },
  { label: "Signals", href: "#signals" },
  { label: "Architecture", href: "#architecture" },
  { label: "GitHub", href: "#github" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Incident Copilot home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
              <ShieldAlert className="h-4 w-4" />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight text-white sm:text-base">
                Incident Copilot
              </span>
              <Badge
                variant="outline"
                className="hidden border-cyan-400/20 bg-cyan-400/10 text-[10px] uppercase tracking-[0.18em] text-cyan-200 sm:inline-flex"
              >
                AI Ops
              </Badge>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-slate-300 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            asChild
            variant="ghost"
            className="text-slate-200 hover:bg-white/5 hover:text-white"
          >
            <Link href="https://github.com" target="_blank" rel="noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>

          <Button
            asChild
            className="bg-cyan-500 text-slate-950 hover:bg-cyan-400"
          >
            <Link href="#demo">
              View demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[320px] border-white/10 bg-slate-950 text-slate-50"
            >
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
                  <ShieldAlert className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Incident Copilot
                  </p>
                  <p className="text-xs text-slate-400">
                    AI-assisted incident investigation
                  </p>
                </div>
              </div>

              <Separator className="my-6 bg-white/10" />

              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-sm text-slate-200 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <Separator className="my-6 bg-white/10" />

              <div className="space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
                >
                  <Link
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub repository
                  </Link>
                </Button>

                <Button
                  asChild
                  className="w-full justify-between bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                >
                  <Link href="#demo" onClick={() => setOpen(false)}>
                    View demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-6 rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.06] p-4">
                <p className="text-sm font-medium text-cyan-200">
                  Built for on-call teams
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Correlate logs, metrics, traces, deploys, and runbooks in one
                  shared incident workspace.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
