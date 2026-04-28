import {
  Activity,
  AlertTriangle,
  BookOpenText,
  FileText,
  Layers3,
  Siren,
  ShieldAlert,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const navItems = [
  { label: "Overview", icon: Activity, active: true },
  { label: "Incidents", icon: ShieldAlert },
  { label: "Services", icon: Layers3 },
  { label: "Alerts", icon: Siren },
  { label: "Runbooks", icon: BookOpenText },
  { label: "Postmortems", icon: FileText },
  { label: "History", icon: Clock, href: "/history" },
];

export function Sidebar() {
  return (
    <aside className="hidden h-screen flex-col border-r bg-card/70 backdrop-blur xl:flex">
      <div className="flex h-16 items-center gap-3 border-b px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold">PulseOps</p>
          <p className="text-xs text-muted-foreground">
            Incident command center
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-6 overflow-auto p-4">
        <Card className="border-border/70 bg-background/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              On-call
            </span>
            <Badge variant="secondary">Live</Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
              LT
            </div>
            <div>
              <p className="text-sm font-medium">Hung Le</p>
              <p className="text-xs text-muted-foreground">
                Primary responder · UTC+7
              </p>
            </div>
          </div>
          <Button variant="secondary" className="mt-4 w-full">
            Open handoff
          </Button>
        </Card>

        <nav className="space-y-1">
          {navItems.map(({ label, icon: Icon, active, href }) => (
            <a
              key={label}
              href={href}
              className={
                active
                  ? "flex w-full items-center gap-3 rounded-xl bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground"
                  : "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
