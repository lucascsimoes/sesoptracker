import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<> Loading... </>}>
      <ScrollArea className="w-full h-dvh">
        {children}
      </ScrollArea>
    </Suspense>
  );
}
