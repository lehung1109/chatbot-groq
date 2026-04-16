import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/providers/theme-provider";
import { ChatbotProvider } from "@/providers/chatbot-provider";
import { AIProvider } from "@/providers/ai-provider";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Groq Chatbot",
  description:
    "A Next.js chat app powered by Groq and the Vercel AI SDK, with streaming responses and model selection.",
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
            <AIProvider>
              <ChatbotProvider>{children}</ChatbotProvider>
            </AIProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
