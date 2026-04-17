declare global {
  interface Window {
    handleSignInWithGoogle:
      | ((response: CredentialResponse) => Promise<void>)
      | null;
  }
}

export {};
