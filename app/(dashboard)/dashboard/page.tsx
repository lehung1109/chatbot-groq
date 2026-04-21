import SignOut from "@/components/auth/sign-out-button";
import { HealthChart } from "@/components/dashboard/health-chart";
import { IncidentSummary } from "@/components/dashboard/incident-summary";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";
import { Metadata } from "next";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IncidentTable } from "@/components/dashboard/incident-table";
import { Timeline } from "@/components/dashboard/timeline";
import { WarRoom } from "@/components/dashboard/war-room";
import AreaChart from "@/components/chart/area-chart";

// metadata
export const metadata: Metadata = {
  title: "Dashboard - Incident Copilot",
  description: "Dashboard",
};

const DashboardPage = () => {
  return (
    <div className="grid min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_24%)] xl:grid-cols-[280px_minmax(0,1fr)]">
      <Sidebar />

      <main className="min-w-0">
        <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 xl:px-8">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Incident dashboard
              </p>

              <h1 className="text-xl font-semibold tracking-tight">
                SEV-1 payment latency spike
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-xl border bg-card px-3 py-2 text-sm text-muted-foreground md:flex">
                <Search className="h-4 w-4" />
                Search incidents, services, runbooks
              </div>

              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>

              <Button>Declare comms</Button>
            </div>
          </div>
        </header>

        <div className="space-y-4 p-4 sm:p-6 xl:p-8">
          <IncidentSummary />

          <div className="grid gap-4 2xl:grid-cols-[minmax(0,1.5fr)_380px]">
            <HealthChart />
            <AreaChart />

            <Card className="border-border/70 bg-card/90 shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle>Probable root cause</CardTitle>

                  <CardDescription>
                    Signals correlated across deploys, logs, and queues
                  </CardDescription>
                </div>

                <Badge>87% confidence</Badge>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">
                      payments-worker memory leak
                    </p>

                    <span className="text-xs text-red-300">Primary</span>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Deploy #8421 increased retry fan-out and exhausted worker
                    heap after queue surge.
                  </p>
                </div>

                <div className="rounded-xl border bg-background/60 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">Redis saturation</p>

                    <span className="text-xs text-muted-foreground">
                      Secondary
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Cache miss amplification pushed command latency above 220ms
                    in us-east-1.
                  </p>
                </div>

                <div className="rounded-xl border bg-background/60 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">
                      Database lock contention
                    </p>

                    <span className="text-xs text-muted-foreground">Watch</span>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Checkout write transactions back up when retry queue crosses
                    4.8k jobs.
                  </p>
                </div>

                <Button className="w-full">Open rollback plan</Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <IncidentTable />

            <Timeline />
          </div>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <WarRoom />

            <Card className="border-border/70 bg-card/90 shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle>Recommended actions</CardTitle>

                  <CardDescription>
                    Next best steps from your runbooks
                  </CardDescription>
                </div>

                <Badge>3 pending</Badge>
              </CardHeader>

              <CardContent className="space-y-3">
                {[
                  [
                    "Rollback canary",
                    "Return payments-worker to stable build #8412",
                    true,
                  ],
                  [
                    "Broadcast status page",
                    "Send external update if impact remains over 30m",
                    false,
                  ],
                  [
                    "Cap retry fan-out",
                    "Reduce queue pressure and database lock contention",
                    false,
                  ],
                ].map(([title, description, checked]) => (
                  <label
                    key={String(title)}
                    className="flex items-start gap-3 rounded-xl border bg-background/60 p-3"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={Boolean(checked)}
                      className="mt-1 h-4 w-4 rounded border-border bg-background text-primary"
                    />

                    <span>
                      <span className="block text-sm font-medium">{title}</span>

                      <span className="block text-sm text-muted-foreground">
                        {description}
                      </span>
                    </span>
                  </label>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
