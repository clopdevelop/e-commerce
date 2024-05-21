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

import { useForm } from "react-hook-form";
import { Key, useEffect, useState } from "react";
import { addProduct } from "@/lib/actionscommands";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { string } from "zod";
import { ProductTags } from "./productsTagsInput";
import { FancyMultiSelect } from "./fancy-multi-select";
import { ImageUploader } from "@/components/file-uploader";
import { InputColor } from "../form/admin/inputColor";
import { InputMaterial } from "../form/admin/inputMaterial";
import ProductState from "../form/admin/productState";

interface Props {
  categories: string[];
}

export default function NewProductForm({ categories }: Props) {
  const [file, setFile] = useState<File | null>(null);

  // todo PROBLEMA AL ENVIAR LOS TAGS

  // addProduct(values);

  // --------------------------------------------
  const [rows, setRows] = useState([
    { id: "001", stock: "", price: "", size: "s" },
    // ... tus otras filas aquí
  ]);

  const addRow = () => {
    setRows([...rows, { id: "", stock: "", price: "", size: "s" }]);
  };
  const [valorInput, setValorInput] = useState("");

  useEffect(() => {
    console.log(valorInput);
  }, [valorInput]);

  return (
    <>
      <form action={addProduct} className="space-y-8">
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
                            <Label>Nombre</Label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              className="w-full"
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label>Descripción</Label>
                            <Textarea id="description" name="description" />
                          </div>
                          <div className="flex gap-10">
                            <Label>Precio</Label>
                            {/* <Textarea {...field} id="description" /> */}
                            <Input
                              id="price"
                              name="price"
                              type="number"
                              step={0.01}
                              min={0}
                            ></Input>

                            <Label className="pt-1">Material</Label>

                            <InputMaterial></InputMaterial>
                            <Input
                              id="material"
                              name="material"
                              type="hidden"
                            ></Input>
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
                              <TableHead className="w-[100px]">Talla</TableHead>
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
                                        
                                          <FormControl>
                                            <Input
                                              {...field}
                                              id={`stock${index}`}
                                              type="number"
                                              className="w-full"
                                            />
                                          </FormControl>
                                        
                                      )}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <FormField
                                      control={form.control}
                                      defaultValue={row.price}
                                      {...form.register(`price${index}`)}
                                      render={({ field }) => (
                                        
                                          <FormControl>
                                            <Input
                                              {...field}
                                              id={`price${index}`}
                                              type="number"
                                              className="w-full"
                                            />
                                          </FormControl>
                                        
                                      )}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <FormField
                                      control={form.control}
                                      defaultValue={row.size}
                                      {...form.register(`size${index}`)}
                                      render={({ field }) => (
                                        
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
                                              </SelectContent>
                                            </Select>
                                          </FormControl>
                                        
                                      )}
                                    />
                                  </TableCell>
                                </TableRow>
                              ))} */}
                            <TableRow>
                              <TableCell className="font-semibold">
                                001
                              </TableCell>
                              <TableCell>
                                <Input
                                  id="stock"
                                  name="stock"
                                  type="number"
                                  className="w-full"
                                  min={0}
                                />
                              </TableCell>
                              <Input
                                id="color"
                                name="color"
                                type="hidden"
                              ></Input>
                              <TableCell>
                                {/* <> */}
                                {/* <div
                                              {...field}
                                              id="price"
                                              className="w-full"
                                            > */}
                                <InputColor></InputColor>
                                {/* </div> */}
                                {/* </> */}
                              </TableCell>
                              <Input
                                id="size"
                                name="size"
                                type="hidden"
                              ></Input>
                              <TableCell>
                                <Select>
                                  <SelectTrigger>
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
                            <Input
                              id="category"
                              name="category"
                              type="hidden"
                            ></Input>
                            <Label htmlFor="category">Categoría</Label>
                            <Select>
                              <SelectTrigger aria-label="Selecciona la categoría">
                                <SelectValue placeholder="Selecciona la categoría" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category, i) => (
                                  <SelectItem key={i} value={String(i + 1)}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-3 w-80">
                            <div className="grid gap-3">
                              <Label>Etiquetas</Label>
                              <FancyMultiSelect />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    {/* <ProductStatus state="Disponible"></ProductStatus> */}
                    <Input id="state" name="state" type="hidden"></Input>
                    <ProductState onInputChange={setValorInput}></ProductState>
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

                            {/* <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                        <Upload className="h-4 w-4 text-muted-foreground" />
                                        <span className="sr-only">Upload</span>
                                      </button>  */}
                            <Input
                              id="image"
                              name="image"
                              type="file"
                              className="w-auto max-w-52"
                              accept="image/jpeg"
                              src={file ? URL.createObjectURL(file) : undefined} // Verifica si file es null antes de llamar a createObjectURL
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

      {/* <div>{JSON.stringify(form.formState.errors)}</div> */}
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
