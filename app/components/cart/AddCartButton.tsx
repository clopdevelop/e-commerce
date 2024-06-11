"use client";
import { toast } from "sonner";
import { Button } from "../shadcn/button";
import { CartItem } from "@/lib/definitions";
import React from "react";
import { useCart } from "@/context/CartProvider";
import { ShoppingCartIcon } from 'lucide-react'
import { Product } from "@prisma/client";

const coloresANumeros = {
  default: 0,
  blue:1,
  green: 2,
  red: 3,
  yellow:4,
};

export default function AddCartButton({
  product,
  color,
  size
}: {
  product: Product;
  color: string;
  size: number;
}) {
  
  const cart = useCart();
  const {items, addItem } = cart || {};

  function addProduct(product: Product, color: string,size: number) {
    try {
      if (!addItem) {
        toast.error("addItem function is not available");
        throw new Error('addItem function is not available');
      }
      if (items==undefined){
        toast.error("items are undefined");
        
        throw new Error('items are undefined');
      }
      if(size==0)
        throw Error("Escoge la talla");
      const num = coloresANumeros[color]

      const newItem: CartItem = {
        id: items.length,
        id_product: product.id,
        name: product.name,
        unit_price: product.price,
        quantity: 1,
        thumbnail: product.ProductImage[num],
        color: color,
        size: size
      };
      
      addItem(newItem, 1);
      toast.success("Producto agregado al carrito!");
    } catch (error) {
      if(error!=="")
      toast.error("Escoge la talla.");
    else
      toast.error("No se pudo agregar el producto al carrito.");
    }
  }
  
  return (
  <>
    <Button onClick={() => addProduct(product, color, size)} className="text-white" size='lg'>
      <ShoppingCartIcon/>
      </Button>
  </>
  );
}
