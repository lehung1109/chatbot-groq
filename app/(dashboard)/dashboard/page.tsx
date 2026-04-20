import SignOut from "@/components/sign-out-button";
import { Metadata } from "next";

// metadata
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <SignOut />
    </div>
  );
};

export default DashboardPage;
