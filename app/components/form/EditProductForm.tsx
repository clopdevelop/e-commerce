"use client";
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
} from "lucide-react";

import { Badge } from "@/components/shadcn/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/breadcrumb";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { Textarea } from "@/components/shadcn/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/shadcn/toggle-group";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/shadcn/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { editProduct } from "@/lib/actionscommands";
import Image from "next/image";
import { Product } from "@/lib/definitions";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { FancyMultiSelect } from "../admin/fancy-multi-select";

interface Props {
  product: Product;
  categories: string[];
}

export default function EditProductForm({ product, categories }: Props) {

  const form = useForm();

  const states = ["Disponible", "Agotado"];
  const [selectedStatus, setSelectedStatus] = useState("Disponible");
  const handleStatusChange = (value: any) => {
    setSelectedStatus(value);
  };

  const { ProductImage } = product

  console.log(product)

  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <Form {...form}>
        <form action={editProduct} className="space-y-8">
          <div className="flex min-h-screen w-full flex-col">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
              <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                  <div className="flex items-center gap-4">
                    <input type="hidden" name="id_product" value={product.id} />
                    <Link href="/admin/products">
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
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                      Editar Producto
                    </h1>
                    <Badge variant="outline" className="ml-auto sm:ml-0">
                      {product.stock>0 ? 'In stock' : 'Out stock'}
                    </Badge>
                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                      <Button variant="outline" size="sm">
                        Cancelar
                      </Button>  
                      <SubmitButton/>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                      <Card x-chunk="dashboard-07-chunk-0">
                        <CardHeader>
                          <CardTitle>Detalles del producto</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-6">
                            <div className="grid gap-3">
                              <FormField
                                control={form.control}
                                defaultValue={product.name}
                                {...form.register("name")}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        id="name"
                                        type="text"
                                        className="w-full"
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="grid gap-3">
                              <FormField
                                control={form.control}
                                defaultValue={product.description ?? ""}
                                {...form.register("description")}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        {...field}
                                        id="description"
                                        className="min-h-32"
                                      />
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
                          <CardTitle>Variables</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[100px]">Código</TableHead>
                                <TableHead>Cantidad</TableHead>
                                <TableHead>Precio</TableHead>
                                <TableHead className="w-[100px]">
                                  Talla
                                </TableHead>
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
                                    {...form.register("stock")}
                                    render={({ field }) => (
                                      <FormItem>
                                        {/* <FormLabel>Name</FormLabel> */}
                                        <FormControl>
                                          <Input
                                            {...field}
                                            id="stock"
                                            type="number"
                                            className="w-full"
                                            defaultValue={product.stock}
                                          />
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
                                    {...form.register("price")}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            id="price"
                                            type="number"
                                            className="w-full"
                                            defaultValue={product.price}
                                          />
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
                                    <ToggleGroupItem value="s">
                                      S
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="m">
                                      M
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="l">
                                      L
                                    </ToggleGroupItem>
                                  </ToggleGroup>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                        <CardFooter className="justify-center border-t p-4">
                          // todo este botón deberá crear una fila para una variacion del producto
                          <Button size="sm" variant="ghost" className="gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            Añadir Variante
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
                            <FormField
                                control={form.control}
                                defaultValue=""
                                {...form.register("category")}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel htmlFor="category">
                                      Categoría
                                    </FormLabel>
                                    <Select
                                      {...field}
                                      defaultValue={field.value}
                                      value={field.value}
                                      onValueChange={field.onChange}
                                    >
                                      <FormControl>
                                        <SelectTrigger aria-label="Selecciona la categoría">
                                          <SelectValue placeholder="Selecciona la categoría" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {categories.map((category, i) => (
                                          <SelectItem
                                            key={i}
                                            value={String(i + 1)}
                                          >
                                            {category}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="grid gap-3 w-80">
                              <div className="grid gap-3">
                                <FormField
                                  control={form.control}
                                  defaultValue={[]}
                                  {...form.register("tags")}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Etiquetas</FormLabel>
                                      <FormControl>
                                        <FancyMultiSelect
                                          {...field}
                                          onChange={(values) => {
                                            field.onChange(
                                              values.map(({ value }) => value)
                                            );
                                          }}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                      {/* <ProductStatus state="Disponible"></ProductStatus> */}
                      <Card
                        x-chunk="dashboard-07-chunk-3"
                        className={
                          selectedStatus === "Disponible"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }
                      >
                        <CardHeader>
                          <CardTitle>Estado del Producto</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-6">
                            <div className="grid gap-3">
                              <FormField
                                control={form.control}
                                defaultValue={product.state}
                                {...form.register("status")}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Estado</FormLabel>
                                    <FormControl>
                                      <Select
                                        {...field}
                                        value={selectedStatus || ""}
                                        onValueChange={handleStatusChange}
                                      >
                                        <SelectTrigger
                                          className="bg-card"
                                          id="status"
                                          aria-label="Select status"
                                        >
                                          <SelectValue placeholder="Select status">
                                            {selectedStatus || "Select status"}
                                          </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                          {states.map((state) => (
                                            <SelectItem
                                              key={state}
                                              value={state}
                                            >
                                              {state}
                                            </SelectItem>
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
                      <Card x-chunk="dashboard-07-chunk-5">
                        <CardContent className="pt-5">
                          {ProductImage && (
                            <Image
                              alt=""
                              src={ProductImage[0].url}
                              width={100}
                              height={100}
                              className="w-full"
                            />
                          )}
                        </CardContent>
                      </Card>
                      <Card
                        className="overflow-hidden"
                        x-chunk="dashboard-07-chunk-4"
                      >
                        <CardHeader>
                          <CardTitle>Imágenes del</CardTitle>
                        </CardHeader>
                        <CardContent>
                              <FormField
                                control={form.control}
                                {...form.register("image")}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        id="image"
                                        type="file"
                                        className="w-auto max-w-52"
                                        accept="image/jpeg"
                                        src={
                                          file
                                            ? URL.createObjectURL(file)
                                            : undefined
                                        } // Verifica si file es null antes de llamar a createObjectURL
                                        onChange={(e) => {
                                          if (
                                            e.target.files &&
                                            e.target.files.length > 0
                                          ) {
                                            setFile(e.target.files[0]);
                                          }
                                        }}
                                      />
                                      {/* <ImageUploader /> */}
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            <div className="pt-5">
                              {file && (
                                <Image
                                  alt=""
                                  src={URL.createObjectURL(file)}
                                  width={100}
                                  height={100}
                                  className="w-full"
                                />
                              )}
                            </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  {/* Responsive Save */}
                  <div className="flex items-center justify-center gap-2 md:hidden">
                    <Button variant="outline" size="sm">
                      Cancelar
                    </Button>
                    <Button size="sm">Editar</Button>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </form>
      </Form>

      <div>{JSON.stringify(form.formState.errors)}</div>
    </>
  );
}

function SubmitButton(){
  const {pending}=useFormStatus()

  return(
    <Button type="submit" size="sm" disabled={pending}>
      Editar
    </Button>
  )
}