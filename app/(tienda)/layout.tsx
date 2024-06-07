import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/globals.css";
import Providers from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

// todo Completar los metadatos https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata: Metadata = {
  description: "Implementación General de una Tienda Web",
  openGraph: {
    type: "website",
  },
};

import { NavBar } from "@/components/ui/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <Providers>
        <NavBar></NavBar>
        <div className="flex flex-col flex-grow">
        {children}</div>
      </Providers>
  );
}
