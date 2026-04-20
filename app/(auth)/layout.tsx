import { SiteFooter } from "@/components/layout/footer";
import Header from "@/components/layout/header";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />

      <main className="flex-1 grid w-full">{children}</main>

      <SiteFooter />
    </>
  );
};

export default PublicLayout;
