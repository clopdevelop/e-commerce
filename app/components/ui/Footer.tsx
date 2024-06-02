/**
 * v0 by Vercel.
 * @see https://v0.dev/t/AMMCQev2JCV
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { LucideGithub } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative w-full text-center p-6 border-t">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-start space-x-2 space-y-2 mb-4">
            <Link className=" " href="#">
              <h3 className="text-lg font-bold">Eh, un Comercio</h3>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
            Esta es una plataforma de comercio electrónico que ofrece productos de alta calidad.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <h4 className="text-gray-900 font-semibold dark:text-gray-50">Github</h4>
            <div className="flex space-x-4">
              <Link className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="#">
                <LucideGithub className="h-12 w-12" color="black" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
