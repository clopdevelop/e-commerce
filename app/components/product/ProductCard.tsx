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
import { Product } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { Heart, HeartIcon } from "lucide-react";
import { setCookie, getCookie } from "cookies-next";
import Image from "next/image";
import { Badge, Button } from "../shadcn";

export default function ProductCard({
  product,
  id_user,
}: {
  product: Product;
  id_user: number;
}) {
console.log(product)
    const [quantity, setQuantity] = useState(1);

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

  return (
    <Card className="relative border rounded-lg p-4 min-w-full  overflow-hidden hover:shadow-xl  duration-300 ease-in-out">
      <CardHeader className="min-h-[180px]" >
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
            <Heart
              className={`transition-colors duration-500 ease-in-out ${
                fav ? "text-red-500" : "text-white"
              } cursor-pointer`}
              strokeWidth={fav ? 3 : 1}
              onClick={() => toggleFav()}
            ></Heart>
            <Button className="w-9 h-9" size="icon" variant="ghost">
              <HeartIcon className="w-6 h-6 fill-red-500" />
              <span className="sr-only">Add to favorites</span>
            </Button>
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
        <div className="flex gap-2 ">
          <Badge className="w-20 flex flex-col"><div>Stock:</div> <div>{product?.variants[0]?.stock ?? ''}</div></Badge>
          <Badge className="w-20 flex flex-col"><div>Color: </div><div>{product?.variants[0]?.colorId ?? ''}</div></Badge>
          <Badge className="w-20 flex flex-col"><div>Size: </div><div>{product?.variants[0]?.sizeId ?? ''}</div></Badge>
        </div>
      </CardContent>
      <CardFooter className="absolute bottom-0 w-full flex justify-between items-center ">
        <p className="font-bold">{product.price}€</p>
        <div className="flex gap-2">
          {id_user != null ? (
            <>
              <AddCartButton
                product={product}
                quantity={quantity}
              ></AddCartButton>
              <PayButton />
            </>
          ) : (
            <>
              <AddCartButton
                product={product}
                quantity={quantity}
              ></AddCartButton>
              <PayButton />
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
