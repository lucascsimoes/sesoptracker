import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body className={`md:flex justify-between overflow-hidden ${ inter.className }`}>
        <Navbar/>

        <ScrollArea className="w-full h-dvh">
          {children}
        </ScrollArea>
        <Toaster />
      </body>
    </html>
  );
}
