const steps = [
  {
    title: "Open the incident",
    description:
      "Start from an alert, a failing service, or a spike in latency. Incident Copilot loads the incident summary, impacted services, recent deploys, and the most relevant signals for the current time window.",
  },
  {
    title: "Ask natural questions",
    description:
      "Use plain English to ask what changed, what broke first, whether this has happened before, or which dependency is driving customer impact.",
  },
  {
    title: "Follow the evidence",
    description:
      "Every answer is backed by logs, traces, metrics, deploy events, runbooks, or similar incidents, so the system helps you investigate instead of asking you to trust a black box.",
  },
  {
    title: "Generate the RCA draft",
    description:
      "When the incident is mitigated, turn the investigation trail into a structured post-incident draft with timeline, impact, root cause, contributing factors, and follow-up actions.",
  },
];

const Timeline = () => {
  return (
    <div className="mx-auto max-w-(--breakpoint-sm) px-6 mb-24">
      <div className="relative ml-6">
        {/* Timeline line */}
        <div className="absolute inset-y-0 left-0 border-l" />

        {steps.map(({ title, description }, index) => (
          <div className="relative pb-10 pl-10 last:pb-0" key={index}>
            {/* Timeline Icon */}
            <div className="absolute left-px flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-muted-foreground/40 bg-accent ring-8 ring-background">
              <span className="font-satoshi font-semibold text-lg">
                {index + 1}
              </span>
            </div>

            {/* Content */}
            <div className="space-y-1.5 pt-1">
              <h3 className="font-medium text-xl tracking-[-0.01em]">
                {title}
              </h3>
              <p className="text-lg text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
