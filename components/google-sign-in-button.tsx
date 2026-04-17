import Script from "next/script";

const GoogleSignInButton = () => {
  return (
    <>
      <div
        id="g_id_onload"
        data-client_id="309432024159-evsda6e2okuv8275v9695mct47portju.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleSignInWithGoogle"
        data-nonce=""
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
  );
};

export default GoogleSignInButton;
