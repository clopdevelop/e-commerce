import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/shadcn/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/breadcrumb"
import { Button } from "@/components/shadcn/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card"

import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table"
import { Textarea } from "@/components/shadcn/textarea"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/shadcn/toggle-group"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField } from "@/components/shadcn/form"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { addProduct } from "@/lib/actionscommands"
import Image from "next/image"
import { Product } from "@/lib/definitions"
import EditProductForm from "@/components/form/EditProductForm"
import { fetchProduct } from "@/lib/data"
import NotFound from "./not-found"

interface Props {
  params: { id: string };
}

  export default async function EditPage({ params }: Props) {
  const product: Product | null = await fetchProduct(Number(params.id))

  return (
    <EditProductForm product={product}></EditProductForm>
  )
}
