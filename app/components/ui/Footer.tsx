/**
 * v0 by Vercel.
 * @see https://v0.dev/t/AMMCQev2JCV
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative bottom-0 w-full text-white text-center p-6 border-t">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start">
            <Link className="flex items-center space-x-2 mb-4" href="#">
              <span className="text-lg font-bold">Éh, un Comercio</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              Acme Store is a leading e-commerce platform offering a wide range of high-quality products.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <h4 className="text-gray-900 font-semibold dark:text-gray-50">Quick Links</h4>
              <Link className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="#">
                Home
              </Link>
              <Link className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="#">
                About
              </Link>
              <Link className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="#">
                Contact
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-gray-900 font-semibold dark:text-gray-50">Follow Us</h4>
            <div className="flex space-x-4">
              <Link className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="#">
                <TwitterIcon className="h-6 w-6" />
              </Link>
              <Link className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="#">
                <FacebookIcon className="h-6 w-6" />
              </Link>
              <Link className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="#">
                <InstagramIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
