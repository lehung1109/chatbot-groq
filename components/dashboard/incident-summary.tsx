import { Badge } from "@heroitvn/shacnui/ui/badge";
import { Card, CardContent } from "@heroitvn/shacnui/ui/card";
import { summaryCards } from "@/data/dashboard";

const toneMap = {
  success: "secondary",
  destructive: "destructive",
  warning: "ghost",
  primary: "default",
} as const;

export function IncidentSummary() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
      {summaryCards.map((item) => (
        <Card
          key={item.title}
          className="border-border/70 bg-card/90 shadow-sm"
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {item.title}
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight">
                  {item.value}
                </p>
              </div>
              <Badge variant={toneMap[item.tone]}>{item.delta}</Badge>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{item.hint}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

