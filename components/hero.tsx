import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="container">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-12 text-center h-[calc(100svh-4rem)] justify-center">
        <h2 className="text-balance font-medium font-satoshi text-xl min-[420px]:text-3xl leading-[1.4] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Investigate incidents <br />
          <span className="inline-block rounded-md bg-primary px-1.5 py-0.5 text-primary-foreground leading-[1.1] tracking-tight sm:rounded-lg sm:px-3.5">
            AI-assisted
          </span>{" "}
          Copilot
        </h2>

        <p className="mt-6 text-balance text-center text-muted-foreground text-base min-[420px]:text-xl tracking-normal sm:text-2xl sm:leading-normal md:text-3xl">
          Incident Copilot brings logs, metrics, traces, deploys, and runbooks
          into one workspace, so on-call engineers can understand impact, test
          hypotheses, and move to resolution faster.
        </p>

        <div className="mx-auto mt-10 flex w-full max-w-xs flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            className="w-full sm:w-auto py-2 px-4 h-auto cursor-pointer"
            size="lg"
          >
            Get Started <ArrowUpRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
