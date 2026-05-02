"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../../packages/shacnui/src/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { JwtPayload } from "@supabase/supabase-js";

const SignInButton = () => {
  const supabase = createClient();
  const [claims, setClaims] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const getClaims = async () => {
      const { data } = await supabase.auth.getClaims();

      if (data?.claims) {
        setClaims(data.claims);
      }
    };

    getClaims();
  }, [supabase.auth]);

  return (
    claims && (
      <Button asChild className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
        <a href="/sign-in">
          Sign in
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
    )
  );
};

export default SignInButton;
