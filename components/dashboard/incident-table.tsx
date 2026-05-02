import { Badge } from "@heroitvn/shacnui/ui/badge";
import { Button } from "@heroitvn/shacnui/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@heroitvn/shacnui/ui/card";
import { incidents } from "@/data/dashboard";

const statusVariant = {
  Mitigating: "destructive",
  Investigating: "ghost",
  Monitoring: "default",
} as const;

export function IncidentTable() {
  return (
    <Card className="border-border/70 bg-card/90 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>Active incidents</CardTitle>
          <CardDescription>
            Prioritized by severity and customer impact
          </CardDescription>
        </div>
        <Button variant="secondary">View all</Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-left text-sm">
            <thead className="bg-background/70 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Incident</th>
                <th className="px-4 py-3 font-medium">Owner</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Started</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((incident) => (
                <tr key={incident.name} className="border-t border-border/70">
                  <td className="px-4 py-3">
                    <div className="font-medium">{incident.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {incident.service} Â· {incident.impact}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {incident.owner}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant[incident.status]}>
                      {incident.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {incident.started}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

