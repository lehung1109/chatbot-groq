/** Nonce pair for Google ID token sign-in (raw + SHA-256 hex for GSI). */
export async function generateNonce(): Promise<[string, string]> {
  const nonce = btoa(
    String.fromCodePoint(...crypto.getRandomValues(new Uint8Array(32))),
  );
  const encoder = new TextEncoder();
  const encodedNonce = encoder.encode(nonce);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encodedNonce);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedNonce = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return [nonce, hashedNonce];
}
