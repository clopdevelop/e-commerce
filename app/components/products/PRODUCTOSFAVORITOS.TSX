/**
 * v0 by Vercel.
 * @see https://v0.dev/t/TOw5G0vCUxj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6">
     
      <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
        <Link className="absolute inset-0 z-10" href="#">
          <span className="sr-only">View</span>
        </Link>
        <img
          alt="Product 2"
          className="object-cover w-full h-64"
          height={400}
          src="/placeholder.svg"
          style={{
            aspectRatio: "500/400",
            objectFit: "cover",
          }}
          width={500}
        />
        <div className="bg-white p-4 dark:bg-gray-950 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-xl">Leather Backpack</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">$99.99</p>
          </div>
          <Button className="w-9 h-9" size="icon" variant="ghost">
            <HeartIcon className="w-6 h-6 fill-red-500" />
            <span className="sr-only">Add to favorites</span>
          </Button>
        </div>
      </div>
      <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
        <Link className="absolute inset-0 z-10" href="#">
          <span className="sr-only">View</span>
        </Link>
        <img
          alt="Product 3"
          className="object-cover w-full h-64"
          height={400}
          src="/placeholder.svg"
          style={{
            aspectRatio: "500/400",
            objectFit: "cover",
          }}
          width={500}
        />
        <div className="bg-white p-4 dark:bg-gray-950 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-xl">Minimalist Watch</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">$79.99</p>
          </div>
          <Button className="w-9 h-9" size="icon" variant="ghost">
            <HeartIcon className="w-6 h-6 fill-red-500" />
            <span className="sr-only">Add to favorites</span>
          </Button>
        </div>
      </div>
      <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
        <Link className="absolute inset-0 z-10" href="#">
          <span className="sr-only">View</span>
        </Link>
        <img
          alt="Product 4"
          className="object-cover w-full h-64"
          height={400}
          src="/placeholder.svg"
          style={{
            aspectRatio: "500/400",
            objectFit: "cover",
          }}
          width={500}
        />
        <div className="bg-white p-4 dark:bg-gray-950 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-xl">Ceramic Mug Set</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">$29.99</p>
          </div>
          <Button className="w-9 h-9" size="icon" variant="ghost">
            <HeartIcon className="w-6 h-6 fill-red-500" />
            <span className="sr-only">Add to favorites</span>
          </Button>
        </div>
      </div>
      <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
        <Link className="absolute inset-0 z-10" href="#">
          <span className="sr-only">View</span>
        </Link>
        <img
          alt="Product 5"
          className="object-cover w-full h-64"
          height={400}
          src="/placeholder.svg"
          style={{
            aspectRatio: "500/400",
            objectFit: "cover",
          }}
          width={500}
        />
        <div className="bg-white p-4 dark:bg-gray-950 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-xl">Linen Throw Pillow</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">$39.99</p>
          </div>
          <Button className="w-9 h-9" size="icon" variant="ghost">
            <HeartIcon className="w-6 h-6 fill-red-500" />
            <span className="sr-only">Add to favorites</span>
          </Button>
        </div>
      </div>
      <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
        <Link className="absolute inset-0 z-10" href="#">
          <span className="sr-only">View</span>
        </Link>
        <img
          alt="Product 6"
          className="object-cover w-full h-64"
          height={400}
          src="/placeholder.svg"
          style={{
            aspectRatio: "500/400",
            objectFit: "cover",
          }}
          width={500}
        />
        <div className="bg-white p-4 dark:bg-gray-950 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-xl">Wool Blend Scarf</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">$59.99</p>
          </div>
          <Button className="w-9 h-9" size="icon" variant="ghost">
            <HeartIcon className="w-6 h-6 fill-red-500" />
            <span className="sr-only">Add to favorites</span>
          </Button>
        </div>
      </div>
    </section>
  )
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}