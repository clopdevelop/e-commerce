"use client";
import { toast } from "sonner";
import { Button } from "../shadcn/button";
import { CartItem, Product } from "@/lib/definitions";
import React from "react";
import { useCart } from "@/context/CartProvider";

export default function AddCartButton({
  product,
  quantity
}: {
  product: Product;
  quantity: number;
}) {
  
  const cart = useCart();
  const {items, addItem } = cart || {};


  function addProduct(product: Product, quantity: number) {
    try {
      if (!addItem) {
        toast.error("addItem function is not available");
        throw new Error('addItem function is not available');
      }
      if (items==undefined){
        toast.error("items are undefined");
        
        throw new Error('items are undefined');
      }
      
      const newItem: CartItem = {
        id: items.length,
        id_product: product.id,
        name: product.name,
        unit_price: product.price,
        quantity: quantity,
        // image: product.ProductImage?.[0].url ?? ''
      };
      
      addItem(newItem, quantity);
      toast("Producto agregado al carrito!");
    } catch (error) {
      toast.error("No se pudo agregar el producto al carrito.");
    }
  }
  
  return (
  <>
    <Button onClick={() => addProduct(product, quantity)} className="text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 17h-11v-14h-2" />
        <path d="M6 5l14 1l-1 7h-13" />
      </svg>
      </Button>
  </>
    //     <Button
    //     disabled
    //     onClick={() => addProduct(product)}
    //     className="text-white"
    //   >
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="24"
    //       height="24"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth="2"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"
    //     >
    //       <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    //       <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    //       <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    //       <path d="M17 17h-11v-14h-2" />
    //       <path d="M6 5l14 1l-1 7h-13" />
    //     </svg>
    //   </Button>
  );
}
