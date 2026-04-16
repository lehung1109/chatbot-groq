import Timeline from "./timeline";

const InvestigationFlow = () => {
  return (
    <div className="container max-w-4xl">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">
        How Incident Copilot works
      </h2>

      <p className="text-muted-foreground text-xl text-center mb-12">
        The product is designed to help responders move from raw telemetry to an
        evidence-backed explanation without losing context along the way.
      </p>

      <Timeline />
    </div>
  );
};

export default InvestigationFlow;
