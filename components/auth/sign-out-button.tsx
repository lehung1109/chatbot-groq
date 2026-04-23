"use client";

import { Button } from "@/components/ui/button";

import { createClient } from "@/lib/supabase/client";

const SignOut = () => {
  return (
    <Button
      variant="default"
      onClick={async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        window.location.replace("/");
      }}
      className="cursor-pointer"
    >
      Sign Out
    </Button>
  );
};

export default SignOut;
