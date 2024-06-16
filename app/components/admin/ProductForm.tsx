"use client";
import { ChevronLeft } from "lucide-react";
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
import { Textarea } from "@/components/shadcn/textarea";
import { Key, SetStateAction, useEffect, useState } from "react";
import { addProduct, editProduct } from "@/lib/actionscommands";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import ProductState from "../form/admin/productState";
import VariantForm from "./VariantForm";
import { Product, ProductImage } from "@prisma/client";

interface Props {
  product?: Product;
  categories: string[];
}

export default function ProductForm({ product, categories }: Props) {
  const isEdditing = product ? true : false;
  const productImageURL = product?.ProductImage[0]?.url;
  const [file, setFile] = useState(productImageURL ? productImageURL : null);
  const imageUrl = typeof file === "string" ? file : URL.createObjectURL(file);

  console.log(JSON.stringify(product));
  console.log(product?.id_category ? product?.id_category : "");
  console.log(productImageURL);

  // addProduct(values);

  // --------------------------------------------
  const [rows, setRows] = useState([
    { id: "001", stock: "", price: "", size: "s" },
    // ... tus otras filas aquí
  ]);

  const addRow = () => {
    setRows([...rows, { id: "", stock: "", price: "", size: "s" }]);
  };

  const [category, setCategory] = useState(
    product?.id_category ? product?.id_category : ""
  );
  const [valorInput, setValorInput] = useState("Disponible");

  const handleCategoryChange = (value: string) => {
    setCategory(Number(value));
    console.log(value);
  };
  console.log(product);
  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <form
              action={product ? editProduct : addProduct}
              className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4"
            >
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
                  {product ? "Editar Producto" : "Nuevo Producto"}
                </h1>

                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <LoginButton isEdditing={isEdditing}></LoginButton>
                </div>
              </div>
              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                      <CardHeader>
                        <CardTitle>Detalles del producto</CardTitle>
                        <Input
                          type="hidden"
                          name="id"
                          value={product?.id}
                        ></Input>
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
                              defaultValue={product?.name}
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label>Descripción</Label>
                            <Textarea
                              id="description"
                              name="description"
                              defaultValue={product?.description ?? ""}
                            />
                          </div>
                          <div className="flex gap-10">
                            <div className="flex items-center gap-4">
                              <Label>Precio</Label>
                              <Input
                                id="price"
                                name="price"
                                type="number"
                                step={0.01}
                                min={0}
                                className="w-20"
                                defaultValue={String(product?.price)}
                              ></Input>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-07-chunk-2">
                      <CardHeader>
                        <CardTitle>Clasificación</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-10 sm:grid-cols-2">
                          <div className="grid gap-2 w-full">
                            <Input
                              id="category"
                              name="category"
                              type="hidden"
                              value={category}
                            ></Input>
                            <Label htmlFor="category">Categoría</Label>
                            <Select onValueChange={handleCategoryChange}>
                              <SelectTrigger
                                aria-label={
                                  product?.id_category
                                    ? categories[product?.id_category - 1]
                                    : ""
                                }
                              >
                                <SelectValue
                                  placeholder={
                                    product?.id_category
                                      ? categories[product?.id_category - 1]
                                      : ""
                                  }
                                />
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
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Input
                      id="state"
                      name="state"
                      type="hidden"
                      value={valorInput}
                    ></Input>
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
                          <div className="grid grid-cols-3 gap-2">
                            <Input
                              id="image"
                              name="image"
                              type="file"
                              className="w-52"
                              accept="image/jpeg"
                              src={imageUrl}
                              onChange={(e) => {
                                if (
                                  e.target.files &&
                                  e.target.files.length > 0
                                ) {
                                  setFile(e.target.files[0]);
                                }
                              }}
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
                            src={imageUrl}
                            width={100}
                            height={100}
                            className="w-full"
                          />
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
                {/* Responsive Save */}
                <div className="flex items-center justify-center pt-8 pb-4 md:hidden">
                  <LoginButton isEdditing={isEdditing}></LoginButton>
                </div>
              </div>
            </form>
            <div className="mx-auto grid w-full max-w-[59rem] flex-1 auto-rows-max gap-4">
              {product && (
                <VariantForm
                  product_id={product.id}
                  variants={product.variants}
                ></VariantForm>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* <div>{JSON.stringify(form.formState.errors)}</div> */}
    </>
  );
}

function LoginButton(isEdditing: { isEdditing: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="sm" disabled={pending}>
      {isEdditing.isEdditing
        ? pending
          ? "Editando Producto..."
          : "Editar Producto"
        : pending
        ? "Creando Producto..."
        : "Crear Producto"}
    </Button>
  );
}
