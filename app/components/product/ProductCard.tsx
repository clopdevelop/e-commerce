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

const coloresANumeros = {
  default: 0,
  blue:1,
  green: 2,
  red: 3,
  yellow:4,
};

function asignarNumero(color: string) {
  return coloresANumeros[color] || null; // Devuelve null si el color no está definido
}


export default function ProductCard({
  product,
}: {
  product: Product;
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
    const num = coloresANumeros[newData]
    setColorImage(num)
  };
  const handleSize = (newData: SetStateAction<string>) => {
    setSize(newData);
  };


  const [colorImage, setColorImage] = useState(0)
  
  return (
    <Card className="relative border rounded-lg p-4 min-w-full  overflow-hidden hover:shadow-xl  duration-300 ease-in-out ">
      <CardHeader className="min-h-[160px]">
        <div className="flex justify-between">
          <div>
            <CardTitle className="h-12 leading-relaxed line-clamp-1 text-balance py-3">
              <Link
                href={`/catalogo/product/${product.id}`}
                className="text-2xl font-semibold mb-2"
              >
                {product.name}
              </Link>
            </CardTitle>
            <CardDescription className="text-lg leading-relaxed line-clamp-2 text-balance">
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
      <CardContent className=" min-h-[305px] flex flex-col gap-6">
        {product.ProductImage && product.ProductImage[0] && (
          <div className="relative item-detail flex justify-center items-center">
            <Image
              alt="Product image"
              // className="aspect-square rounded-md object-cover"
              className="w-full sm:w-auto rounded-lg object-cover"
              src={product.ProductImage[colorImage].url ?? ""}
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
        </div>
      </CardFooter>
    </Card>
  );
}
