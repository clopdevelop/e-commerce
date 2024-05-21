"use client";
import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Paperclip,
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
import { Button, buttonVariants } from "@/components/shadcn/button";
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
import { Key, useState } from "react";
import { addProduct } from "@/lib/actionscommands";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { string } from "zod";
import { ProductTags } from "./productsTagsInput";
import { FancyMultiSelect } from "./fancy-multi-select";
import { ImageUploader } from "@/components/file-uploader";

interface Props {
  categories: string[];
}

export default function NewProductForm({ categories }: Props) {
  const form = useForm();

  const states = ["Disponible", "Agotado"];
  const [selectedStatus, setSelectedStatus] = useState("Disponible");
  const handleStatusChange = (value: any) => {
    setSelectedStatus(value);
  };

  const [file, setFile] = useState<File | null>(null);

  // todo PROBLEMA AL ENVIAR LOS TAGS
  async function onSubmit(values: any) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    addProduct(values);
  }

  // --------------------------------------------
  const [rows, setRows] = useState([
    { id: "001", stock: "", price: "", size: "s" },
    // ... tus otras filas aquí
  ]);

  const addRow = () => {
    setRows([...rows, { id: "", stock: "", price: "", size: "s" }]);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex min-h-screen w-full flex-col">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
              <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                  <div className="flex items-center gap-4">
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
                      Nuevo Producto
                    </h1>
                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                      <Button variant="outline" size="sm">
                        Cancelar
                      </Button>
                      <LoginButton></LoginButton>
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
                                defaultValue=""
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
                                defaultValue=""
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
                                <TableHead className="w-[100px]">
                                  Código
                                </TableHead>
                                <TableHead>Cantidad</TableHead>
                                <TableHead>Color</TableHead>
                                <TableHead className="w-[100px]">
                                  Talla
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {/* {rows.map((row, index) => (
                                <TableRow key={index}>
                                  <TableCell className="font-semibold">
                                    {row.id}
                                  </TableCell>
                                  <TableCell>
                                    <FormField
                                      control={form.control}
                                      defaultValue={row.stock}
                                      {...form.register(`stock${index}`)}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <Input
                                              {...field}
                                              id={`stock${index}`}
                                              type="number"
                                              className="w-full"
                                            />
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <FormField
                                      control={form.control}
                                      defaultValue={row.price}
                                      {...form.register(`price${index}`)}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <Input
                                              {...field}
                                              id={`price${index}`}
                                              type="number"
                                              className="w-full"
                                            />
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <FormField
                                      control={form.control}
                                      defaultValue={row.size}
                                      {...form.register(`size${index}`)}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <Select>
                                              <SelectTrigger
                                                {...field}
                                                id={`size${index}`}
                                                className="w-full"
                                              >
                                                <SelectValue/>
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="36">
                                                  36
                                                </SelectItem>
                                                <SelectItem value="37">
                                                  37
                                                </SelectItem>
                                                <SelectItem value="38">
                                                  38
                                                </SelectItem>
                                                <SelectItem value="39">
                                                  39
                                                </SelectItem>
                                                <SelectItem value="40">
                                                  40
                                                </SelectItem>
                                                <SelectItem value="41">
                                                  41
                                                </SelectItem>
                                                <SelectItem value="42">
                                                  42
                                                </SelectItem>
                                                <SelectItem value="43">
                                                  43
                                                </SelectItem>
                                                <SelectItem value="44">
                                                  44
                                                </SelectItem>
                                                <SelectItem value="45">
                                                  45
                                                </SelectItem>
                                                <SelectItem value="46">
                                                  46
                                                </SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                  </TableCell>
                                </TableRow>
                              ))} */}
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
                                            {...field}
                                            id="stock"
                                            type="number"
                                            className="w-full"
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
                                    defaultValue=""
                                    {...form.register("price")}
                                    render={({ field }) => (
                                      <FormItem>
                                        {/* <FormLabel>Name</FormLabel> */}
                                        <FormControl>
                                          <Select>
                                            <SelectTrigger
                                              {...field}
                                              id="price"
                                              className="w-full"
                                            >
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="36">36</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Select>
                                    <SelectTrigger className="w-full">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="36">36</SelectItem>
                                      <SelectItem value="37">37</SelectItem>
                                      <SelectItem value="38">38</SelectItem>
                                      <SelectItem value="39">39</SelectItem>
                                      <SelectItem value="40">40</SelectItem>
                                      <SelectItem value="41">41</SelectItem>
                                      <SelectItem value="42">42</SelectItem>
                                      <SelectItem value="43">43</SelectItem>
                                      <SelectItem value="44">44</SelectItem>
                                      <SelectItem value="45">45</SelectItem>
                                      <SelectItem value="46">46</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                        {/* <CardFooter className="justify-center border-t p-4">
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="gap-1"
                            onClick={addRow}
                          >
                            <PlusCircle className="h-3.5 w-3.5" />
                            Añadir Variante
                          </Button>
                        </CardFooter> */}
                      </Card>
                      <Card x-chunk="dashboard-07-chunk-2">
                        <CardHeader>
                          <CardTitle>Categoría</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-20 sm:grid-cols-3">
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
                                defaultValue=""
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
                                          aria-label="Selecciona el estado"
                                        >
                                          <SelectValue placeholder="Selecciona el estado">
                                            {selectedStatus ||
                                              "Selecciona el estado"}
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
                      <Card
                        className="overflow-hidden"
                        x-chunk="dashboard-07-chunk-4"
                      >
                        <CardHeader>
                          <CardTitle>Imágenes del producto</CardTitle>
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
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      {/* <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                        <Upload className="h-4 w-4 text-muted-foreground" />
                                        <span className="sr-only">Upload</span>
                                      </button>  */}
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
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card x-chunk="dashboard-07-chunk-5">
                        <CardContent className="pt-5">
                          {file && (
                            <Image
                              alt=""
                              src={URL.createObjectURL(file)}
                              width={100}
                              height={100}
                              className="w-full"
                            />
                          )}
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
                    <LoginButton></LoginButton>{" "}
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

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? "Creando Producto..." : "Crear Producto"}
    </Button>
  );
}
