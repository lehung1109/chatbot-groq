import GoogleSignInButton from "@heroitvn/google/google-sign-in-button";
import { Metadata } from "next";

// metadata
export const metadata: Metadata = {
  title: "Sign in - Incident Copilot",
  description: "Sign in to your account",
};

export default function LoginPage() {
  return (
    <div className="grid lg:grid-cols-2 min-h-full">
      <section className="bg-slate-900 p-10 lg:px-20 text-white lg:flex lg:flex-col lg:justify-center">
        <div className="max-w-md">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-sky-300">
            Welcome back
          </p>
          <h1 className="text-4xl font-semibold leading-tight">
            Sign in to continue to your workspace.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-300">
            Access your dashboard, manage your projects, and stay in sync with
            your team.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-30 lg:p-6">
        <div className="w-full max-w-md">
          <GoogleSignInButton />
        </div>
      </section>
    </div>
  );
}
