"use client";

import { createClient } from "@/lib/supabase/client";
import { generateNonce } from "@/lib/utils";
import { CredentialResponse } from "google-one-tap";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const GoogleSignInButton = () => {
  const [nonce, setNonce] = useState<string>("");
  const [hashedNonce, setHashedNonce] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const getNonce = async () => {
      const [newNonce, newHashedNonce] = await generateNonce();
      setNonce(newNonce);
      setHashedNonce(newHashedNonce);
    };

    getNonce();
  }, []);

  useEffect(() => {
    const supabase = createClient();

    window.handleSignInWithGoogle = async (response: CredentialResponse) => {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: response.credential,
        nonce: hashedNonce,
      });

      if (error) {
        toast.error(error.message);
      }

      console.log("Session data: ", data);
      console.log("Successfully logged in with Google");

      router.push("/dashboard");
    };
  }, [hashedNonce, router]);

  return (
    <>
      {nonce && hashedNonce && (
        <>
          <div
            id="g_id_onload"
            data-client_id="309432024159-evsda6e2okuv8275v9695mct47portju.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-callback="handleSignInWithGoogle"
            data-nonce={nonce}
            data-auto_prompt="false"
          ></div>

          <div
            className="g_id_signin"
            data-type="standard"
            data-shape="rectangular"
            data-theme="outline"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="left"
          ></div>

          <Script src="https://accounts.google.com/gsi/client" />
        </>
      )}
    </>
  );
};

export default GoogleSignInButton;
