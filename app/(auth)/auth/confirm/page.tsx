"use client";

import { useEffect, useState } from "react";
import { createClient } from "@heroitvn/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@heroitvn/shacnui/ui/button";
import { EmailOtpType } from "@supabase/supabase-js";

export default function ConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const confirmEmail = async () => {
      setLoading(true);
      const token_hash = searchParams.get("token_hash") || "";
      const type = searchParams.get("type") as EmailOtpType;
      const supabase = createClient();

      // Magic Link verification and Email confirmation
      try {
        const { error } = await supabase.auth.verifyOtp({
          type,
          token_hash,
        });
        if (error) {
          setError(error.message);
          setConfirmed(false);
        } else {
          setConfirmed(true);
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
        setConfirmed(false);
      } finally {
        setLoading(false);
      }
    };

    // only run when token is present
    if (searchParams.get("token_hash")) {
      confirmEmail();
    } else {
      setLoading(false);
      setError("No token_hash found in the URL.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoToDashboard = () => {
    router.replace("/dashboard");
  };

  const handleGoToSignIn = () => {
    router.replace("/sign-in");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md w-full rounded-xl bg-white/10 p-8 shadow-md">
        {loading ? (
          <div className="text-center text-white text-lg">
            Confirming your email...
          </div>
        ) : confirmed ? (
          <div className="flex flex-col items-center space-y-6">
            <div className="text-2xl font-semibold text-green-300">
              Email confirmed!
            </div>
            <div className="text-slate-200">
              You can now access your account.
            </div>
            <Button
              className="bg-cyan-500 hover:bg-cyan-400"
              onClick={handleGoToDashboard}
            >
              Go to Dashboard
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <div className="text-2xl font-semibold text-red-400">
              Confirmation failed
            </div>
            {error && <div className="text-sm text-red-300">{error}</div>}
            <Button
              variant="outline"
              className="text-cyan-300"
              onClick={handleGoToSignIn}
            >
              Go to Sign In
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
