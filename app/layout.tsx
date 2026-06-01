import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/sidebar";
import GlobalHeader from "@/components/header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Command Center — Premium Client & Project Workspace",
  description: "Track milestones, manage project deliverables, and streamline client reviews and approvals on an all-in-one professional freelance dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground selection:bg-primary/10">
        <div className="relative flex flex-col md:flex-row min-h-screen w-full">
          {/* Responsive Sidebar Shell */}
          <Sidebar />

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col min-w-0 bg-zinc-50/50 dark:bg-zinc-950/40 min-h-[calc(100vh-4rem)] md:min-h-screen">
            {/* Context Switcher Global Header */}
            <GlobalHeader />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

