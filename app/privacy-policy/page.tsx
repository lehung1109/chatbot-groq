import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Incident Copilot",
  description:
    "Learn how Incident Copilot handles data collection, storage, and security.",
};

const lastUpdated = "April 17, 2026";

const sections = [
  {
    title: "Information We Collect",
    body: "We may collect account details, usage analytics, incident timeline data, and communication preferences when you use Incident Copilot. We collect only the minimum information needed to provide and improve the product.",
  },
  {
    title: "How We Use Information",
    body: "We use your information to operate core features, secure the platform, troubleshoot incidents, and improve product quality. We do not sell personal data to third parties.",
  },
  {
    title: "Data Retention",
    body: "We retain data only for as long as required to provide the service, satisfy legal obligations, or resolve disputes. Retention windows may vary based on workspace settings and regulatory requirements.",
  },
  {
    title: "Security",
    body: "We use administrative, technical, and organizational safeguards to protect your information, including access controls, encrypted transport, and ongoing monitoring. No method of transmission or storage is guaranteed to be 100% secure.",
  },
  {
    title: "Third-Party Services",
    body: "Incident Copilot may integrate with tools such as observability, issue tracking, and source control platforms. Data shared with those services is governed by their respective privacy policies and your integration configuration.",
  },
  {
    title: "Your Choices",
    body: "You can request access, correction, export, or deletion of your data, subject to legal and operational limitations. You can also manage notification and communication preferences from your account settings.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-background text-foreground">
      <div className="container mx-auto max-w-3xl px-4 py-16 md:py-20">
        <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          This Privacy Policy explains how Incident Copilot collects, uses, and
          protects information when you use our services.
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
            For privacy-related questions, email us at <a
              href="mailto:privacy@incidentcopilot.app"
              className="font-medium text-foreground underline underline-offset-4"
            >
              privacy@incidentcopilot.app
            </a>
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
