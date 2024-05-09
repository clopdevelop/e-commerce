'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/shadcn/card";
import AddCartButton from "@/components/utils/AddCartButton";

import PayButton from "../utils/PayButton";
import Link from "next/link";
import { Input } from "../shadcn/input";
import { Provider, Category, OrderItem } from "@/lib/definitions";
import { Product } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react"
import { setCookie, getCookie } from "cookies-next";
import Image from 'next/image';
import { Badge } from "../shadcn";

export default function ProductCard({ product, id_user }: { product: Product, id_user: number }) {

    const [quantity, setQuantity] = useState(1);

    const [fav, setFav] = useState(false)

    useEffect(() => {
        const favs = getCookie("favoritos");
        if (favs && favs.split(',').includes(String(product.id))) {
            setFav(true);
        }
    }, [product.id]);

    const toggleFav = () => {
        const favoritos = getCookie("favoritos") || '';
        const favoritosArray = favoritos.split(',');

        if (fav) {
            const updatedFavoritos = favoritosArray.filter(id => id !== String(product.id));
            setCookie("favoritos", updatedFavoritos.join(','));
        } else {
            favoritosArray.push(String(product.id));
            setCookie("favoritos", favoritosArray.join(','));
        }
        setFav(!fav);
    };

    return (
        <Card
            className="border rounded-lg p-4 min-w-full"
        >
            <CardHeader>
                <div className="flex justify-between">
                    <div>
                        <CardTitle className="h-15 leading-relaxed line-clamp-2 text-balance py-3">
                            <Link href={`/catalogo/product/${product.id}`} className="text-2xl font-semibold mb-2">{product.name}</Link>
                        </CardTitle>
                        <CardDescription className="h-16 text-lg">
                            {product.description}
                        </CardDescription>
                    </div>
                    <div>
                        <Heart className={`transition-colors duration-500 ease-in-out ${fav ? 'text-red-500' : 'text-white'} cursor-pointer`}
                            strokeWidth={fav ? 3 : 1}
                            onClick={() => toggleFav()}>
                        </Heart>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="h-47">
                {product.ProductImage && product.ProductImage[0] && (

                    <div className="relative item-detail w-58 h-40" >
                        <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            src={product.ProductImage[0].url ?? ''}  
                            width={100}
                            height={100}
                        />
                    </div>
                )}
                <div className="flex flex-col gap-2">
                <Badge className="w-20">Stock: {product?.stock}</Badge>
                <Input  type="number" defaultValue={1} min={1} max={product?.stock} onChange={(e) => setQuantity(Number(e.target.value))}></Input>
                </div>
            </CardContent>
            <CardFooter className="p-0 flex justify-between items-center h-auto md:h-24">
          <p className="font-bold">{product.price}€</p>
          <div className="flex gap-2">
            {id_user != null ? (
              <>
                <AddCartButton product={product} quantity={quantity}></AddCartButton>
                <PayButton />
              </>
            ) : (
              <>
                <AddCartButton product={product} quantity={quantity}></AddCartButton>
                <PayButton />
              </>
            )}
          </div>
        </CardFooter>
        </Card>
    );
}