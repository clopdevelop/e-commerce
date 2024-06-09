import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/shadcn";
import StripeProvider from "../StripeProvider";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";



export default function StripePayPage() {
  return (
    <Card className="overflow-hidden w-9/12 mx-auto">
        <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            <Button size="icon" variant="outline" className="h-6 w-6 mr-3 my-3">
              <Link href={'/pago'}><ChevronLeft className="h-4 w-4" /></Link>
              <span className="sr-only">Volver</span>
            </Button>
            Finalizar Compra
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 gap-10">
      <StripeProvider></StripeProvider>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">2/2</div>
      </CardFooter>
      </Card>
  );
}