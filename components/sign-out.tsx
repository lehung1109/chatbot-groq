"use client";

import { Button } from "@/components/ui/button";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const SignOut = () => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={() => {
        const supabase = createClient();
        supabase.auth.signOut();
        router.push("/");
      }}
    >
      Sign Out
    </Button>
  );
};

export default SignOut;
