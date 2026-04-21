export const summaryCards = [
  {
    title: "MTTA",
    value: "4m 12s",
    delta: "-18%",
    hint: "Faster than last 7 days",
    tone: "success",
  },
  {
    title: "Error rate",
    value: "12.4%",
    delta: "+8.1%",
    hint: "Spike started 22m ago",
    tone: "destructive",
  },
  {
    title: "Impacted users",
    value: "18.2k",
    delta: "High",
    hint: "Checkout sessions timing out",
    tone: "warning",
  },
  {
    title: "Latest deploy",
    value: "#8421",
    delta: "12m ago",
    hint: "payments-worker canary 100%",
    tone: "primary",
  },
] as const;

export const healthData = [
  { time: "09:10", latency: 1120, errors: 2.1, queue: 1400 },
  { time: "09:20", latency: 1180, errors: 2.6, queue: 1750 },
  { time: "09:30", latency: 1310, errors: 4.9, queue: 2200 },
  { time: "09:40", latency: 1520, errors: 7.4, queue: 3100 },
  { time: "09:50", latency: 2010, errors: 12.4, queue: 4900 },
  { time: "10:00", latency: 1620, errors: 8.8, queue: 3600 },
  { time: "Now", latency: 1280, errors: 4.2, queue: 2100 },
] as const;

export const incidents = [
  {
    name: "SEV-1 payment latency spike",
    service: "checkout-api",
    impact: "18.2k users affected",
    owner: "Linh Tran",
    status: "Mitigating",
    started: "22m ago",
  },
  {
    name: "SEV-2 webhook delivery lag",
    service: "event-router",
    impact: "Partner notifications delayed",
    owner: "Huy Nguyen",
    status: "Investigating",
    started: "54m ago",
  },
  {
    name: "SEV-3 dashboard stale metrics",
    service: "timeseries-sync",
    impact: "Delayed by 4m",
    owner: "Mai Pham",
    status: "Monitoring",
    started: "2h ago",
  },
] as const;

export const timelineItems = [
  {
    time: "10:03",
    title: "SEV-1 declared",
    description: "Pager escalated from checkout-api alert policy.",
    color: "bg-red-400",
  },
  {
    time: "10:07",
    title: "Canary diff identified",
    description: "Error rate aligns with deploy #8421 reaching 100% traffic.",
    color: "bg-blue-400",
  },
  {
    time: "10:12",
    title: "Queue drain started",
    description: "Background retries throttled to reduce lock contention.",
    color: "bg-amber-400",
  },
  {
    time: "10:17",
    title: "Latency improving",
    description: "p95 dropped from 2.4s to 1.6s in the last 3 minutes.",
    color: "bg-emerald-400",
  },
] as const;

export const warRoomMembers = [
  { role: "Incident commander", name: "Linh Tran", state: "Owner" },
  { role: "Communications lead", name: "An Vo", state: "Assigned" },
  { role: "Database SME", name: "Quang Le", state: "Standby" },
] as const;
