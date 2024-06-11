"use client"

import { z } from "zod";
import { CartItem } from "./definitions";
import { addressFormschema } from "./schemas";

export function saveToLocalStorage(items: CartItem[]) {
    localStorage.setItem('shopping-cart', JSON.stringify(items));
  }
  
//   export function loadFromLocalStorage(): CartItem[] {
//     const savedCart = localStorage.getItem('shopping-cart');
//       return savedCart ? JSON.parse(savedCart) : [];
//   }
  
  
  
  
  export function loadFromLocalStorage(): CartItem[] {
    if (typeof localStorage !== 'undefined') {
      const savedCart = localStorage.getItem('shopping-cart') ?? "[]";
      // console.log("available");
      return JSON.parse(savedCart);
    } else {
      // console.log("not available");
      return [];
    }
  }





  export function saveAddressLocalStorage(items: z.infer<typeof addressFormschema>) {
    localStorage.setItem('address', JSON.stringify(items));
  }

  export function loadAddressLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      const savedAddress = localStorage.getItem('address') ?? "[]";
      // console.log("available");
      return JSON.parse(savedAddress);
    } else {
      // console.log("not available");
      return [];
    }
  }