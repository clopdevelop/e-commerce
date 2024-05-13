"use client";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreVertical,
  Truck,
} from "lucide-react";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/shadcn/pagination";
import { Separator } from "@/components/shadcn/separator";
import { useCart } from "@/context/CartProvider";
import { useEffect, useState } from "react";
import { CartItem, Order, ShippingPrices, User } from "@/lib/definitions";
import { Apple, EuroIcon, Link } from "lucide-react";
import {
  Input,
  Select,
  Label,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Form,
  RadioGroup,
  RadioGroupItem,
} from "@/components/shadcn";
import UserAddress from "@/components/client/AddressConfig";
import { Checkbox } from "@/components/shadcn/checkbox";
import { useForm } from "react-hook-form";
import { CityAndProvinceSelector } from "@/components/form/data-client/CityAndProvinceSelector";
import { Address, PaymentMethod } from "@prisma/client";
import { BuyProduct } from "@/lib/payFunctions";
import { loadFromLocalStorage } from "@/lib/localStorage";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ClientPay from "@/components/form/data-client/ClientPay";

interface Props {
  user: User;
  address: Address | null;
  payment: PaymentMethod[] | null;
  // user: any;
  // address: any;
  // payment: any;
}
const stripePromise = loadStripe("pk_test_51OxXxKRxuIsR3WCzXgi3vVpqg78fTrX5zAO846IeyfGWRNcE37lljo7FSs6jGlGIsQkYVbBISeNjxS4L8DeM9Vuj00hcGpjRXR");
export default function Acomponenr({ user, address, payment }: Props) {
  //Recu
  const order: Order = {
    id: 0,
    total: 0,
    status: "",
    paid: false,
    discount: 0,
    created_at: new Date(),
    id_user: 0,
  };
  // console.log(user)
  // console.log(address)
  // console.log(payment)
 


  return (
    <Elements stripe={stripePromise}>
      <ClientPay user={user} address={address} payment={payment}></ClientPay>
    </Elements>
  );
}