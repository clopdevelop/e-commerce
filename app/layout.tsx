import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// todo Completar los metadatos https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata: Metadata = {
  title: {
    template: '',
    default: "Tienda Web",
    // absolute: '',
  },
  description: "Implementación General de una Tienda Web",
  generator: 'Next.js',
  applicationName: 'Mi Tienda',
  // referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: "Next.js Team", url: "https://nextjs.org" }],
  creator: 'Nombre del creador de la web',
  publisher: 'Nombre de quién lo publica',
  // formatDetection: {
  //   email: false,
  //   address: false,
  //   telephone: false,
  // },
};

import { NavBar } from "@/components/ui/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar></NavBar>
        <main className="flex flex-col items-center justify-between p-24">
          {children}
        </main>
        <footer className="py-10 flex justify-center items-center">
          Proyecto final de Ciclo
        </footer>
      </body>
    </html>
  );
}
