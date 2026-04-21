import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - Incident Copilot",
  description:
    "Review the terms and conditions for using Incident Copilot services.",
};

const lastUpdated = "April 17, 2026";

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By accessing or using Incident Copilot, you agree to these Terms of Service. If you do not agree, you should not use the service.",
  },
  {
    title: "Use of the Service",
    body: "You may use Incident Copilot only for lawful business purposes and in accordance with applicable policies. You are responsible for the activity that occurs under your account.",
  },
  {
    title: "Account Responsibilities",
    body: "You must keep your account credentials secure and notify us promptly of any unauthorized use. You are responsible for maintaining accurate account and workspace information.",
  },
  {
    title: "Integrations and Third-Party Services",
    body: "Incident Copilot may connect to third-party platforms such as observability, issue tracking, and source control tools. Your use of those services is subject to their terms and privacy policies.",
  },
  {
    title: "Availability and Changes",
    body: "We may modify, suspend, or discontinue parts of the service to improve reliability and functionality. We may also update these terms from time to time and will post revisions on this page.",
  },
  {
    title: "Limitation of Liability",
    body: "To the maximum extent permitted by law, Incident Copilot is provided on an 'as is' and 'as available' basis without warranties of any kind. We are not liable for indirect, incidental, or consequential damages arising from your use of the service.",
  },
];

export default function TermsOfServicePage() {
  return (
    <section className="bg-background text-foreground">
      <div className="container mx-auto max-w-3xl px-4 py-16 md:py-20">
        <p className="text-sm text-muted-foreground">
          Last updated: {lastUpdated}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          These Terms of Service govern your use of Incident Copilot and outline
          your rights and responsibilities when using our services.
        </p>

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <article key={section.title} className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight">
                {section.title}
              </h2>
              <p className="leading-7 text-muted-foreground">{section.body}</p>
            </article>
          ))}
        </div>

        <article className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Contact Us</h2>
          <p className="leading-7 text-muted-foreground">
            For terms-related questions, email us at{" "}
            <a
              href="mailto:legal@incidentcopilot.app"
              className="font-medium text-foreground underline underline-offset-4"
            >
              legal@incidentcopilot.app
            </a>
            .
          </p>
        </article>

        <div className="mt-10">
          <Link
            href="/"
            className="text-sm font-medium text-foreground underline underline-offset-4"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
