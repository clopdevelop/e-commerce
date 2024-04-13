/**
 * v0 by Vercel.
 * @see https://v0.dev/t/exd1nbZuFYC
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/shadcn/card"
import { Input } from "@/components/shadcn/input"
import { Button } from "@/components/shadcn/button"

export default function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping address</CardTitle>
        <CardDescription>Enter the shipping address for the customer.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Input placeholder="Street" type="text" />
        <Input placeholder="Apt, suite, etc." type="text" />
        <div className="grid gap-4 md:grid-cols-2">
          <Input placeholder="City" type="text" />
          <Input placeholder="Country" type="text" />
        </div>
        <Input placeholder="Postal code" type="text" />
      </CardContent>
      <CardFooter>
        <Button className="ml-auto">Save</Button>
      </CardFooter>
    </Card>
  )
}