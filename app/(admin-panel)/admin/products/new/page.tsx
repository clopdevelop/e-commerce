"use client"
import Image from "next/image"
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
import { zodResolver } from "@hookform/resolvers/zod"
import { addProductSchema } from "@/lib/schemas"
import { addProduct } from "@/lib/actionscommands"
export default function EditPage() {
  const form = useForm()

  //TODO RECUPERAR LAS CATEGORIAS
  const categories = ["Electronics", "Clothes", "Food", "Books", "Others"]

  const states = ["Disponible", "Agotado"];
  const [selectedStatus, setSelectedStatus] = useState("Disponible");
  const handleStatusChange = (value: any) => {
    setSelectedStatus(value);
  };

  return (

    <>
      <Form {...form}>
        <form action={addProduct} className="space-y-8">
          <div className="flex min-h-screen w-full flex-col">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
              <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="h-7 w-7">
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Back</span>
                    </Button>
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                      Pro Controller
                    </h1>
                    <Badge variant="outline" className="ml-auto sm:ml-0">
                      In stock
                    </Badge>
                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                      <Button variant="outline" size="sm">
                        Discard
                      </Button>
                      <Button type="submit" size="sm">Save Product</Button>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                      <Card x-chunk="dashboard-07-chunk-0">
                        <CardHeader>
                          <CardTitle>Detalles del producto</CardTitle>
                          <CardDescription>
                            Lipsum dolor sit amet, consectetur adipiscing elit
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-6">
                            <div className="grid gap-3">
                              <FormField
                                control={form.control}
                                defaultValue=""
                                {...form.register("name")}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                      <Input
                                        id="name"
                                        type="text"
                                        className="w-full"
                                        {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="grid gap-3">
                              <FormField
                                control={form.control}
                                defaultValue=""
                                {...form.register("description")}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        id="description"
                                        className="min-h-32" 
                                        {...field}/>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card x-chunk="dashboard-07-chunk-1">
                        <CardHeader>
                          <CardTitle>Stock</CardTitle>
                          <CardDescription>
                            Lipsum dolor sit amet, consectetur adipiscing elit
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[100px]">SKU</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className="w-[100px]">Size</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-semibold">
                                  GGPC-001
                                </TableCell>
                                <TableCell>
                                  {/* <Label htmlFor="stock-1" className="sr-only">
                                    Stock
                                  </Label>
                                  <Input
                                    id="stock-1"
                                    type="number"
                                    defaultValue="" /> */}
                                  <FormField
                                    control={form.control}
                                    defaultValue=""
                                    {...form.register("stock")}
                                    render={({ field }) => (
                                      <FormItem>
                                        {/* <FormLabel>Name</FormLabel> */}
                                        <FormControl>
                                          <Input
                                            id="stock"
                                            type="number"
                                            className="w-full"
                                            {...field} />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>
                                <TableCell>
                                  {/* <Label htmlFor="price-1" className="sr-only">
                                    Price
                                  </Label>
                                  <Input
                                    id="price-1"
                                    type="number"
                                    defaultValue="" /> */}
                                  <FormField
                                    control={form.control}
                                    defaultValue=""
                                    {...form.register("price")}
                                    render={({ field }) => (
                                      <FormItem>
                                        {/* <FormLabel>Name</FormLabel> */}
                                        <FormControl>
                                          <Input
                                            id="price"
                                            type="number"
                                            className="w-full"
                                            {...field} />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>
                                <TableCell>
                                  <ToggleGroup
                                    type="single"
                                    defaultValue="s"
                                    variant="outline"
                                  >
                                    <ToggleGroupItem value="s">S</ToggleGroupItem>
                                    <ToggleGroupItem value="m">M</ToggleGroupItem>
                                    <ToggleGroupItem value="l">L</ToggleGroupItem>
                                  </ToggleGroup>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                        <CardFooter className="justify-center border-t p-4">
                          <Button size="sm" variant="ghost" className="gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            Add Variant
                          </Button>
                        </CardFooter>
                      </Card>
                      <Card x-chunk="dashboard-07-chunk-2">
                        <CardHeader>
                          <CardTitle>Categoría</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-6 sm:grid-cols-3">
                            <div className="grid gap-3">
                              <Label htmlFor="category">Category</Label>
                              <FormField
                                control={form.control}
                                {...form.register("category")}
                                defaultValue=""
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Select {...field}>
                                        <SelectTrigger
                                          id="category"
                                          aria-label="Select category"
                                        >
                                          <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {categories.map((category) => (
                                            <SelectItem key={category} value={category}>{category}</SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="grid gap-3">
                              <Label htmlFor="subcategory">
                                Subcategory (optional)
                              </Label>
                              <FormField
                                control={form.control}
                                {...form.register("subcategory")}
                                defaultValue=""
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Select {...field}>
                                        <SelectTrigger
                                          id="subcategory"
                                          aria-label="Select subcategory"
                                        >
                                          <SelectValue placeholder="Select subcategory" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {categories.map((category) => (
                                            <SelectItem key={category} value={category}>{category}</SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                      {/* <ProductStatus state="Disponible"></ProductStatus> */}
                      <Card x-chunk="dashboard-07-chunk-3" className={selectedStatus === "Disponible" ? "bg-green-600" : "bg-red-600"}>
                        <CardHeader>
                          <CardTitle>Estado  del Producto</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-6">
                            <div className="grid gap-3">
                              <FormField
                                control={form.control}
                                defaultValue=""
                                {...form.register("status")}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Estado</FormLabel>
                                    <FormControl>
                                      <Select {...field} value={selectedStatus || ""} onValueChange={handleStatusChange}>
                                        <SelectTrigger className='bg-card' id="status" aria-label="Select status">
                                          <SelectValue placeholder="Select status">{selectedStatus || "Select status"}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                          {states.map((state) => (
                                            <SelectItem key={state} value={state}>{state}</SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card
                        className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                      >
                        <CardHeader>
                          <CardTitle>Product Images</CardTitle>
                          <CardDescription>
                            Lipsum dolor sit amet, consectetur adipiscing elit
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-2">
                            {/* <Image
                              alt="Product image"
                              className="aspect-square w-full rounded-md object-cover"
                              height="300"
                              src="/placeholder.svg"
                              width="300" /> */}
                            <div className="grid grid-cols-3 gap-2">
                              {/* <button>
                                <Image
                                  alt="Product image"
                                  className="aspect-square w-full rounded-md object-cover"
                                  height="84"
                                  src="/placeholder.svg"
                                  width="84" />
                              </button>
                              <button>
                                <Image
                                  alt="Product image"
                                  className="aspect-square w-full rounded-md object-cover"
                                  height="84"
                                  src="/placeholder.svg"
                                  width="84" />
                              </button> */}
                              <FormField
                                control={form.control}
                                {...form.register("image")}
                                defaultValue=""
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      {/* <Input
                                        id="name"
                                        type="text"
                                        className="w-full"
                                        {...field} /> */}
                                      <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                        <Upload className="h-4 w-4 text-muted-foreground" />
                                        <span className="sr-only">Upload</span>
                                      </button>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      {/* <Card x-chunk="dashboard-07-chunk-5">
                        <CardHeader>
                          <CardTitle>Archive Product</CardTitle>
                          <CardDescription>
                            Lipsum dolor sit amet, consectetur adipiscing elit.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div></div>
                          <Button size="sm" variant="secondary">
                            Archive Product
                          </Button>
                        </CardContent>
                      </Card> */}
                    </div>
                  </div>
                  {/* Responsive Save */}
                  <div className="flex items-center justify-center gap-2 md:hidden">
                    <Button variant="outline" size="sm">
                      Discard
                    </Button>
                    <Button size="sm">Save Product</Button>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </form>
      </Form>

      <div>
        {JSON.stringify(form.formState.errors)}
      </div>
    </>
  )
}
