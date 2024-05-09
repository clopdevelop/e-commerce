"use client";
import { toast } from "sonner";
import { Button } from "../shadcn/button";
import { CartItem, Product } from "@/lib/definitions";
import React from "react";
import { useCart } from "@/context/CartProvider";
import { ShoppingCartIcon } from 'lucide-react'

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
      if(!product.ProductImage)
        return 0;
      
      const newItem: CartItem = {
        id: items.length,
        id_product: product.id,
        name: product.name,
        unit_price: product.price,
        quantity: quantity,
        thumbnail: product.ProductImage[0]
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
      <ShoppingCartIcon/>
      </Button>
  </>
  );
}
