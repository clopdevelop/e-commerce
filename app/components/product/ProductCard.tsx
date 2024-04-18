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

import PayBotton from "../utils/PayBotton";
import Link from "next/link";
import { Input } from "../shadcn/input";
import { Provider, Category, OrderItem } from "@/lib/definitions";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { BookmarkIcon } from "lucide-react"
import { setCookie, getCookie } from "cookies-next";

export default function ProductCard({ product, id_user }: { product: Product, id_user: number}) {

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
            className="m-2 max-w-72 max-h-80"
            key={product.id}
        >
            <CardHeader>
                <div className="flex justify-between">
                    <div>
                        <CardTitle className="h-10 leading-relaxed line-clamp-2 text-balance">
                            <Link href={`catalogo/${product.id}`}>{product.name}</Link>
                        </CardTitle>
                        <CardDescription className="h-10">
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
            <CardContent className="h-24">
                Imagen {/* TODO Añadir imagenes */}
                <Input type="number" defaultValue={1} min={1} max={99} onChange={(e) => setQuantity(Number(e.target.value))}></Input>
            </CardContent>
            <CardFooter className="flex justify-between ">
                <p className="p-2 mr-2">{product.price}€</p>
                <div className="flex gap-2 ">
                    {/* todo arreglar: como no existe el id user con el google auth no funciona con este */}
                    <>
                        {id_user != null ? (
                            <>
                                <AddCartButton product={product} quantity={quantity} ></AddCartButton>
                                <PayBotton id_user={id_user} product={product} />
                            </>
                        ) : (
                            <>
                                <AddCartButton product={product} quantity={quantity}></AddCartButton>
                                <PayBotton id_user={id_user} product={product} />
                            </>
                        )}
                    </>
                </div>
            </CardFooter>
        </Card>
    );
}