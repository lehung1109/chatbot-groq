// app/login/page.tsx
import Link from "next/link";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Github } from "@/components/github-icon";
import GoogleSignInButton from "@/components/google-sign-in-button";

export default function LoginPage() {
  return (
    <div className="grid lg:grid-cols-2">
      <section className="bg-slate-900 p-10 text-white lg:flex lg:flex-col lg:justify-center">
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

      <section className="flex items-center justify-center p-6 sm:p-8 lg:p-10">
        <div className="w-full max-w-md">
          <GoogleSignInButton />
        </div>
      </section>
    </div>
  );
}
