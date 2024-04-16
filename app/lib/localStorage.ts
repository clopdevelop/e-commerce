"use client"

import { CartItem } from "./definitions";

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
      console.log("available");
      return JSON.parse(savedCart);
    } else {
      console.log("not available");
      return [];
    }
  }