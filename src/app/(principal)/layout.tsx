import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import Navbar from "@/components/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Navbar/>
        <ScrollArea className="w-full h-dvh">
          {children}
        </ScrollArea>
    </>
  );
}
