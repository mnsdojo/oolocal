import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import prisma from "@/lib/db";
import Sidebar from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BurnMyCpu",
  description: "Ollama client but running locally",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const conversations = await prisma.conversation.findMany({});
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen">
            <Sidebar conversations={conversations} />
            <main className="flex-1 overflow-auto">
              <div className="float-right p-4">
                <ModeToggle />
              </div>
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
