import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import { ScrollArea } from "@/components/ui/scroll-area";

const inter = Inter({ subsets: ["latin"] });

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ScrollArea className="w-full h-dvh">
      {children}
    </ScrollArea>
  );
}
