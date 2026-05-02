"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/packages/shacnui/src/ui/badge";
import { Button } from "@/packages/shacnui/src/ui/button";
import { Separator } from "@/packages/shacnui/src/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/packages/shacnui/src/ui/sheet";
import { ArrowRight, Menu, Wheat } from "lucide-react";
import { Github } from "@/components/github-icon";
import SignInButton from "@/components/auth/sign-in-button";

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
              <Wheat className="h-4 w-4" />
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

          <SignInButton />
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
                  <Wheat className="h-4 w-4" />
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
