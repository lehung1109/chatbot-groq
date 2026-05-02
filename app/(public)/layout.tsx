import { SiteFooter } from "@/components/layout/footer";
import Header from "@/components/layout/header";
import OneTapGoogleSignIn from "@heroitvn/google/one-tap-google-sign-in";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />

      <main className="flex-1">
        <OneTapGoogleSignIn />

        {children}
      </main>

      <SiteFooter />
    </>
  );
};

export default PublicLayout;
