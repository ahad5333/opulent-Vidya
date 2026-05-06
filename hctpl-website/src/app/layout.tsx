"use client";

import useLenis from "@/hooks/useLenis";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import ChatWidget from "@/components/ChatWidget";
import SocialSidebar from "@/components/SocialSidebar";

import "./globals.css";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useLenis();
  const pathname = usePathname();
  const isAIRecruiter = pathname?.startsWith('/ai-recruiter');

  return (
    <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <body>
        {children}
        {!isAIRecruiter && <ChatWidget />}
        {!isAIRecruiter && <SocialSidebar />}
      </body>
    </html>
  );
}