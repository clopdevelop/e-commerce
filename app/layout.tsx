import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/theme-provider";
import CookieConsent  from "@/components/cookie-consent";
import type { Viewport } from 'next'
 
export const viewport: Viewport = {
  themeColor: 'black',
  
}

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
  authors: [{ name: "@clopdevlop", url: "https://github.com/clopdevelop" }],
  creator: 'Nombre del creador de la web',
  publisher: 'Nombre de quién lo publica',
  // formatDetection: {
  //   email: false,
  //   address: false,
  //   telephone: false,
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <html lang="es">
        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          <CookieConsent />
          <footer className="relative bottom-0 w-full text-white text-center p-6">
            Proyecto final de Ciclo
          </footer>
          </ThemeProvider>
        </body>
      </html>
  );
}
