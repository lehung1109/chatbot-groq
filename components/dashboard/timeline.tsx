import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { timelineItems } from "@/data/dashboard";

export function Timeline() {
  return (
    <Card className="border-border/70 bg-card/90 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>Responder timeline</CardTitle>
          <CardDescription>
            Command log from the last 25 minutes
          </CardDescription>
        </div>
        <Button variant="secondary">Export</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {timelineItems.map((item) => (
          <div key={item.time + item.title} className="flex gap-3">
            <div className={`mt-1 h-2.5 w-2.5 rounded-full ${item.color}`} />
            <div>
              <p className="text-sm font-medium">
                {item.time} · {item.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
