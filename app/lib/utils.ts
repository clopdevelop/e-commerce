import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { CartItem } from "./definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function saveToLocalStorage(items: CartItem[]) {
  localStorage.setItem('cart', JSON.stringify(items));
}

export function loadFromLocalStorage(): CartItem[] {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
}
