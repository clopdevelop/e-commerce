"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import AddCartButton from "@/components/cart/AddCartButton";

import PayButton from "../utils/PayButton";
import Link from "next/link";
import { Input } from "../shadcn/input";
import { Provider, Category, OrderItem } from "@/lib/definitions";
import { SetStateAction, useEffect, useState } from "react";
import { Heart, HeartIcon } from "lucide-react";
import { setCookie, getCookie } from "cookies-next";
import Image from "next/image";
import { Badge, Button } from "../shadcn";
import { Product } from "@prisma/client";
import PopoverSize from "./PopoverSize";
import PopoverColor from "./PopoverColor";

export default function ProductCard({
  product,
  id_user,
}: {
  product: Product;
  id_user: number;
}) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const favs = getCookie("favoritos");
    if (favs && favs.split(",").includes(String(product.id))) {
      setFav(true);
    }
  }, [product.id]);

  const toggleFav = () => {
    const favoritos = getCookie("favoritos") || "";
    const favoritosArray = favoritos.split(",");

    if (fav) {
      const updatedFavoritos = favoritosArray.filter(
        (id) => id !== String(product.id)
      );
      setCookie("favoritos", updatedFavoritos.join(","));
    } else {
      favoritosArray.push(String(product.id));
      setCookie("favoritos", favoritosArray.join(","));
    }
    setFav(!fav);
  };

  const [color, setColor] = useState('default');
  const [size, setSize] = useState('0');

  const handleColor = (newData: SetStateAction<string>) => {
    setColor(newData);
  };
  const handleSize = (newData: SetStateAction<string>) => {
    setSize(newData);
  };

  useEffect(()=>{
    console.log(size)
  },[size])

  useEffect(()=>{
    console.log(color)
  },[color])

  

  return (
    <Card className="relative border rounded-lg p-4 min-w-full  overflow-hidden hover:shadow-xl  duration-300 ease-in-out ">
      {/* // todo max-w-56 max-h-[500px] */}
      <CardHeader className="min-h-[180px]">
        <div className="flex justify-between">
          <div>
            <CardTitle className="h-15 leading-relaxed line-clamp-2 text-balance py-3">
              <Link
                href={`/catalogo/product/${product.id}`}
                className="text-2xl font-semibold mb-2"
              >
                {product.name}
              </Link>
            </CardTitle>
            <CardDescription className="h-8 text-lg">
              {product.description}
            </CardDescription>
          </div>
          <div>
            <HeartIcon
              className={`w-6 h-6 transition-colors duration-500 ease-in-out ${
                fav ? "fill-red-500" : "fill-white"
              } cursor-pointer`}
              onClick={() => toggleFav()}
            ></HeartIcon>
            <span className="sr-only">Add to favorites</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className=" min-h-[290px] flex flex-col py-2 gap-6">
        {product.ProductImage && product.ProductImage[0] && (
          <div className="relative item-detail flex justify-center items-center">
            <Image
              alt="Product image"
              className="aspect-square rounded-md object-cover"
              src={product.ProductImage[0].url ?? ""}
              width={150}
              height={150}
            />
          </div>
        )}
        <div className="flex gap-2 justify-center">
          <PopoverColor product={product} onSelection={handleColor}></PopoverColor>
          <PopoverSize product={product} onSelection={handleSize}></PopoverSize>
        </div>
      </CardContent>
      <CardFooter className="absolute bottom-0 w-full flex justify-between items-center">
        <p className="font-bold">{product.price}€</p>
        <div className="flex gap-2 mr-4">
          <AddCartButton product={product} color={color} size={size}></AddCartButton>
          <PayButton />
        </div>
      </CardFooter>
    </Card>
  );
}
