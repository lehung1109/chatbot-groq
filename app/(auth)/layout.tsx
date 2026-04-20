import { SiteFooter } from "@/components/footer";
import Header from "@/components/header";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />

      <main className="flex-1">{children}</main>

      <SiteFooter />
    </>
  );
};

export default PublicLayout;
