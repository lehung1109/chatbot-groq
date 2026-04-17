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

export default function LoginPage() {
  return (
    <div className="grid lg:grid-cols-2">
      <section className="hidden bg-slate-900 p-10 text-white lg:flex lg:flex-col lg:justify-center">
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
          <Card className="border-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Sign in
              </CardTitle>
              <CardDescription>
                Enter your email and password to access your account.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-normal text-slate-600 dark:text-slate-300"
                  >
                    Remember me
                  </Label>
                </div>

                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </form>

              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                  OR CONTINUE WITH
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
                <Button variant="outline" className="w-full">
                  Google
                </Button>
              </div>

              <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
                >
                  Create an account
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
