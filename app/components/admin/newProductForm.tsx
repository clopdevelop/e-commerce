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
import { addProductTEST } from "@/lib/actionscommands";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { string } from "zod";
import { ProductTags } from "./productsTagsInput";
import { FancyMultiSelect } from "./fancy-multi-select";
import {
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/shadcn/extensions/file-uploader";
import { DropzoneOptions } from "react-dropzone";
import { toast } from "sonner";
import {  Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/shadcn/aspect-ratio";

interface Props {
  categories: string[];
}

export default function NewProductForm({ categories }: Props) {

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
    addProductTEST(values);
  }

    const form = useForm();
   
    const dropzone = {
      multiple: true,
      maxFiles: 3,
      maxSize: 4 * 1024 * 1024,
    } satisfies DropzoneOptions;
   


  return (
    <>
      <Form {...form}>
        {/* <form action={addProductTEST} className="space-y-8"> */}
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
                                <TableHead className="w-[100px]">
                                  Size
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
                                          <Input
                                            {...field}
                                            id="price"
                                            type="number"
                                            className="w-full"
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
                                        {/* <Input
                                          {...field}
                                          type="number"
                                          className="w-full"
                                        /> */}
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
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      {/* <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                        <Upload className="h-4 w-4 text-muted-foreground" />
                                        <span className="sr-only">Upload</span>
                                      </button> */}
                                      {/* <Input
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
                                      /> */}
                                      <FileUploader
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        dropzoneOptions={dropzone}
                                        reSelect={true}
                                      >
                                        <FileInput
                                          className={cn(
                                            buttonVariants({
                                              size: "icon",
                                            }),
                                            "size-8"
                                          )}
                                        >
                                          <Paperclip className="size-4" />
                                          <span className="sr-only">
                                            Select your files
                                          </span>
                                        </FileInput>
                                        {field.value &&
                                          field.value.length > 0 && (
                                            <FileUploaderContent className="absolute bottom-8 p-2  w-full -ml-3 rounded-b-none rounded-t-md flex-row gap-2 ">
                                              {field.value.map((file:any,i:number) => (
                                                <FileUploaderItem
                                                  key={i}
                                                  index={i}
                                                  aria-roledescription={`file ${
                                                    i + 1
                                                  } containing ${file.name}`}
                                                  className="p-0 size-20"
                                                >
                                                  <AspectRatio className="size-full">
                                                    <Image
                                                      src={URL.createObjectURL(
                                                        file
                                                      )}
                                                      alt={file.name}
                                                      className="object-cover rounded-md"
                                                      fill
                                                    />
                                                  </AspectRatio>
                                                </FileUploaderItem>
                                              ))}
                                            </FileUploaderContent>
                                          )}
                                      </FileUploader>
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
