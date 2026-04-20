"use client";

import { Button } from "@/components/ui/button";

import { createClient } from "@/lib/supabase/client";

const SignOut = () => {
  return (
    <Button
      variant="outline"
      onClick={async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        window.location.replace("/");
      }}
    >
      Sign Out
    </Button>
  );
};

export default SignOut;
