import type { Metadata } from "next";
import { Fira_Code, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QueryProvider from "@/components/QueryProvider";
import { Toaster } from "sonner";

const FiraCode = Fira_Code({
  variable: "--font-fira-code",
  weight: ["600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevAgent AI - Elite Agentic AI Workspace",
  description:
    "Production-ready Agentic AI application to build and scale with LLMs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${FiraCode.variable}  antialiased bg-[#0F172A] text-slate-100 min-h-screen flex flex-col`}
      >
        <QueryProvider>
          <Toaster richColors theme="dark" closeButton />
          {/* রিকোয়ারমেন্ট অনুযায়ী Sticky/Fixed Navbar */}
          <Navbar />

          {/* মেইন কন্টেন্ট এরিয়া */}
          <main className="flex-grow mb-0 py-0">{children}</main>

          {/* গ্লোবাল ফুটার */}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
