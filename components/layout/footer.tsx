import Link from "next/link";
import { Badge } from "@heroitvn/shacnui/ui/badge";
import { Button } from "@heroitvn/shacnui/ui/button";
import { Separator } from "@heroitvn/shacnui/ui/separator";
import { Globe, HeartHandshake, TerminalSquare, Wheat } from "lucide-react";
import { Github } from "../github-icon";

const footerLinks = {
  Product: [
    { label: "Overview", href: "#product" },
    { label: "Workflow", href: "#workflow" },
    { label: "Signals", href: "#signals" },
    { label: "FAQ", href: "#faq" },
  ],
  Build: [
    { label: "Architecture", href: "#architecture" },
    { label: "GitHub", href: "#github" },
    { label: "Demo", href: "#demo" },
  ],
  Resources: [
    { label: "Next.js", href: "https://nextjs.org" },
    { label: "shadcn/ui", href: "https://ui.shadcn.com" },
    { label: "OpenTelemetry", href: "https://opentelemetry.io" },
  ],
};

export function SiteFooter() {
  return (
    <footer
      id="github"
      className="relative overflow-hidden border-t border-white/10 bg-slate-950 text-slate-50"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.06),transparent_24%),radial-gradient(circle_at_80%_40%,rgba(168,85,247,0.05),transparent_22%)]" />

      <div className="container relative mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="Incident Copilot home"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
                <Wheat className="h-4 w-4" />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-base font-semibold tracking-tight text-white">
                  Incident Copilot
                </span>
                <Badge
                  variant="outline"
                  className="border-cyan-400/20 bg-cyan-400/10 text-[10px] uppercase tracking-[0.18em] text-cyan-200"
                >
                  AI Ops
                </Badge>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
              A portfolio-grade product concept for AI-assisted incident
              investigation, designed to bring logs, metrics, traces, deploys,
              and RCA workflow into one shared workspace.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
              >
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
              >
                <Link href="#demo">
                  <TerminalSquare className="mr-2 h-4 w-4" />
                  Demo
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group}>
                <h3 className="text-sm font-medium text-white">{group}</h3>

                <ul className="mt-4 space-y-3">
                  {links.map((link) => {
                    const isExternal = link.href.startsWith("http");

                    return (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="text-sm text-slate-400 transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span>Â© 2026 Incident Copilot</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-700 md:inline-block" />
            <span>Built with Next.js, shadcn/ui, and Tailwind CSS</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/terms-of-service"
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy-policy"
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <span className="inline-flex items-center gap-2">
              <Globe className="h-4 w-4" />
              English resources only
            </span>
            <span className="inline-flex items-center gap-2">
              <HeartHandshake className="h-4 w-4" />
              Designed for on-call teams
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

