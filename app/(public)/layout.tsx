import OneTapGoogleSignIn from "@/components/one-tap-google-sign-in";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OneTapGoogleSignIn />
      {children}
    </>
  );
};

export default PublicLayout;
