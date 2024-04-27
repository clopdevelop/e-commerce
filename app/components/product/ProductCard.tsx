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
import { BookmarkIcon } from "lucide-react"
import { setCookie, getCookie } from "cookies-next";
import Image from 'next/image';

export default function ProductCard({ product, id_user }: { product: Product, id_user: number }) {

    const [quantity, setQuantity] = useState(1);

    const [fav, setFav] = useState(false)

    useEffect(() => {
        const favs = getCookie("favoritos");
        if (favs && favs.split(',').includes(String(product.id))) {
            setFav(true);
        }
    }, []);

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
            className="border rounded-lg p-4"
            key={product.id}
        >
            <CardHeader>
                <div className="flex justify-between">
                    <div>
                        <CardTitle className="h-10 leading-relaxed line-clamp-2 text-balance py-3">
                            <Link href={`catalogo/${product.id}`} className="text-lg font-semibold mb-2">{product.name}</Link>
                        </CardTitle>
                        <CardDescription className="h-3 ">
                            {product.description}
                        </CardDescription>
                    </div>
                    <div>
                        <BookmarkIcon className={`transition-colors duration-500 ease-in-out ${fav ? 'text-red-500' : 'text-white'} cursor-pointer`}
                            strokeWidth={fav ? 3 : 1}
                            onClick={() => toggleFav()}>
                        </BookmarkIcon>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="h-52">
                {product.ProductImage && product.ProductImage[0] && (

                    <div className="relative item-detail w-58 h-40" >
                        <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            src={product.ProductImage[0].url ?? ''}
                            layout="fill" 
                            objectFit="cover"                         />
                    </div>
                )}
                <Input className='my-3' type="number" defaultValue={1} min={1} max={99} onChange={(e) => setQuantity(Number(e.target.value))}></Input>
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