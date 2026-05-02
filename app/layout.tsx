import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@heroitvn/shacnui/ui/tooltip";
import { ThemeProvider } from "@/providers/theme-provider";
import { ChatbotStoreProvider } from "@heroitvn/chatbot-toggle";
import { Geist } from "next/font/google";
import { Toaster } from "@heroitvn/shacnui/ui/sonner";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Incident Copilot",
  description:
    "An AI-powered incident management tool for incident response teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={geist.className}>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <ChatbotStoreProvider>{children}</ChatbotStoreProvider>
          </TooltipProvider>
        </ThemeProvider>

        <Toaster />
      </body>
    </html>
  );
}

