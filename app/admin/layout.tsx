import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/globals.css";
import Header from "@/components/admin/Header";
import { getUserLogged } from "@/lib/data"
import { redirect } from "next/navigation"

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
  referrer: 'origin-when-cross-origin',
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



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

const user = await getUserLogged()
if(user?.role!=='admin')
  redirect('/entrada')

  return (
    <>
    <Header></Header>
      {children}
    </>
  );
}