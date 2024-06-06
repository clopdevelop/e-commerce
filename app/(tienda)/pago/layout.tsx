import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
        <main className="my-10">
          {children}
        </main>
  );
}