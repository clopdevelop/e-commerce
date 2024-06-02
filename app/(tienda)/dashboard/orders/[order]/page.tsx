import { fetchOrder } from "@/lib/data";

import Link from "next/link";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from "@/components/shadcn/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/shadcn/table";
import { Separator } from "@/components/shadcn/separator";
import { JSX, SVGProps } from "react";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/shadcn";
import { OrderDetails } from "@/components/order/OrderDetails";
import { ShippingAddressCard } from "@/components/order/ShippingAddressCard";
import { Total } from "@/components/order/TotalCard";
import { OrderDetailsSkeleton } from "@/components/skeletons/OrderDetailsSkeletonCard";
import { ShippingAddressSkeleton } from "@/components/skeletons/ShippingAddressSkeleton";
import { TotalSkeleton } from "@/components/skeletons/TotalSkeleton";

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  unit_price: number;
}

interface Order {
  code: string;
  paid: boolean;
  status: string;
  type: string;
  id_delivery_type: string;
  total: number;
  created_at: Date;
  OrderItem: OrderItem[];
}

export default async function OrderPage({
  params,
}: {
  params: { order: string };
}) {
  // const order: Order = await fetchOrder(Number(params.order));
  // const order = await fetchOrder(order);

  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/orders">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-7 w-7"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Pedido #{params.order} </h1>
      </div>
      <Separator className="my-4"></Separator>
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="md:col-span-2 lg:col-span-2">
              <OrderDetails id_order={params.order}></OrderDetails>
              {/* <OrderDetailsSkeleton ></OrderDetailsSkeleton> */}
            </div>
            <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-6">
              {/* <ShippingAddressCard id_order={params.order}></ShippingAddressCard> */}
              <ShippingAddressSkeleton ></ShippingAddressSkeleton>
              <Total id_order={params.order}></Total>
              {/* <TotalSkeleton></TotalSkeleton> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
