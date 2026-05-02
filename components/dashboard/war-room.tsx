import { Badge } from "@heroitvn/shacnui/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@heroitvn/shacnui/ui/card";
import { warRoomMembers } from "@/data/dashboard";

export function WarRoom() {
  return (
    <Card className="border-border/70 bg-card/90 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>War room</CardTitle>
          <CardDescription>Team coordination and ownership</CardDescription>
        </div>
        <Badge variant="secondary">7 online</Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {warRoomMembers.map((member) => (
          <div
            key={member.role}
            className="flex items-center justify-between rounded-xl border bg-background/60 px-3 py-3"
          >
            <div>
              <p className="text-sm font-medium">{member.role}</p>
              <p className="text-xs text-muted-foreground">{member.name}</p>
            </div>
            <Badge variant={member.state === "Owner" ? "default" : "secondary"}>
              {member.state}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

