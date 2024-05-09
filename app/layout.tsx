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

const { SITE_NAME } = process.env
// todo Completar los metadatos https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://Tienda.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  // openGraph: {
  //   title: 'Next.js',
  //   description: 'The React Framework for the Web',
  //   url: 'https://nextjs.org',
  //   siteName: 'Next.js',
  //   images: [
  //     {
  //       url: 'https://nextjs.org/og.png', // Must be an absolute URL
  //       width: 800,
  //       height: 600,
  //     },
  //     {
  //       url: 'https://nextjs.org/og-alt.png', // Must be an absolute URL
  //       width: 1800,
  //       height: 1600,
  //       alt: 'My custom alt',
  //     },
  //   ],
  //   locale: 'en_US',
  //   type: 'website',
  // },
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
    // absolute: '',
  },
  robots: {
    index: false,
    follow: true,
    // nocache: true,
    // googleBot: {
    //   index: true,
    //   follow: false,
    //   noimageindex: true,
    //   'max-video-preview': -1,
    //   'max-image-preview': 'large',
    //   'max-snippet': -1,
    // },
  },
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
        {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
            {children}
          <CookieConsent />
          <footer className="relative bottom-0 w-full text-white text-center p-6">
            Proyecto final de Ciclo
          </footer>
          {/* </ThemeProvider> */}
        </body>
      </html>
  );
}
