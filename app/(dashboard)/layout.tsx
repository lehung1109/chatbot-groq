import SignOut from "@/components/auth/sign-out-button";
import ChatbotToggle from "@/components/chatbot/chatbot-toggle";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_24%)] xl:grid-cols-[280px_minmax(0,1fr)]">
      <Sidebar />

      <main className="min-w-0">
        <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 xl:px-8">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Incident dashboard
              </p>

              <h1 className="text-xl font-semibold tracking-tight">
                SEV-1 payment latency spike
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-xl border bg-card px-3 py-2 text-sm text-muted-foreground md:flex">
                <Search className="h-4 w-4" />
                Search incidents, services, runbooks
              </div>

              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>

              <SignOut />
            </div>
          </div>
        </header>

        <div className="space-y-4 p-4 sm:p-6 xl:p-8">{children}</div>
      </main>

      <ChatbotToggle isFloat={true} />
    </div>
  );
};

export default DashboardLayout;
