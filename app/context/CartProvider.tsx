"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem } from '@/lib/definitions';
import { loadFromLocalStorage, saveToLocalStorage } from '@/lib/utils';

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem, quantity: number) => void;
  removeItem: (itemId: number) => void;
  updateItemQuantity: (itemId: number, quantity: number) => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

let  cartItem : CartItem[];

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>(cartItem);
  // const [items, setItems] = useState<CartItem[]>(loadFromLocalStorage());

  useEffect(() => {
    saveToLocalStorage(items);
  }, [items]);
  
  const addItem = (item: CartItem, quantity: number) => {
    // Verificar si el ítem ya existe en el carrito
    const existingItemIndex = items.findIndex((existingItem) => existingItem.id_product === item.id_product);

    if (existingItemIndex !== -1) {
      // Si el ítem ya está en el carrito, actualizar la cantidad
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += quantity;
      setItems(updatedItems);
    } else {
      // Si el ítem no está en el carrito, agregarlo con la cantidad especificada
      const newItem = { ...item, quantity };
      setItems((prevItems) => [...prevItems, newItem]);
    }
  };

  const removeItem = (itemId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateItemQuantity = (itemId: number, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: quantity };
        }
        return item;
      })
    );
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
