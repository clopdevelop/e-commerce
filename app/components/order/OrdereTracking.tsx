/**
 * v0 by Vercel.
 * @see https://v0.dev/t/wVz32zukds8
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <PackageIcon className="h-6 w-6" />
          <div>
            <h2 className="text-lg font-medium">Order #12345</h2>
            <p className="text-gray-500 dark:text-gray-400">In Transit</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Track Order
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6 after:absolute after:inset-y-0 after:left-3 after:h-full after:w-px after:bg-gray-200 dark:after:bg-gray-700">
          <div className="grid gap-6">
            <div className="grid grid-cols-[40px_1fr] items-start gap-4">
              <div className="relative">
                <div className="aspect-square h-10 rounded-full bg-gray-900 text-white flex items-center justify-center dark:bg-gray-50 dark:text-gray-900">
                  <CalendarIcon className="h-5 w-5" />
                </div>
                <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  May 1, 2023
                </div>
              </div>
              <div>
                <h3 className="font-medium">Order Placed</h3>
                <p className="text-gray-500 dark:text-gray-400">Your order has been placed and is being processed.</p>
              </div>
            </div>
            <div className="grid grid-cols-[40px_1fr] items-start gap-4">
              <div className="relative">
                <div className="aspect-square h-10 rounded-full bg-gray-900 text-white flex items-center justify-center dark:bg-gray-50 dark:text-gray-900">
                  <TruckIcon className="h-5 w-5" />
                </div>
                <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  May 2, 2023
                </div>
              </div>
              <div>
                <h3 className="font-medium">Picked Up</h3>
                <p className="text-gray-500 dark:text-gray-400">Your order has been picked up by the courier.</p>
              </div>
            </div>
            <div className="grid grid-cols-[40px_1fr] items-start gap-4">
              <div className="relative">
                <div className="aspect-square h-10 rounded-full bg-gray-900 text-white flex items-center justify-center dark:bg-gray-50 dark:text-gray-900">
                  <TruckIcon className="h-5 w-5" />
                </div>
                <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  May 3, 2023
                </div>
              </div>
              <div>
                <h3 className="font-medium">In Transit</h3>
                <p className="text-gray-500 dark:text-gray-400">Your order is on its way to the delivery location.</p>
              </div>
            </div>
            <div className="grid grid-cols-[40px_1fr] items-start gap-4">
              <div className="relative">
                <div className="aspect-square h-10 rounded-full bg-gray-900 text-white flex items-center justify-center dark:bg-gray-50 dark:text-gray-900">
                  <HomeIcon className="h-5 w-5" />
                </div>
                <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  May 4, 2023
                </div>
              </div>
              <div>
                <h3 className="font-medium">Delivered</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Your order has been delivered to the specified address.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CalendarIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function HomeIcon(props) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function PackageIcon(props) {
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
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )
}


function TruckIcon(props) {
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
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  )
}