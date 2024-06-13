"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem } from '@/lib/definitions';
import { loadFromLocalStorage, saveToLocalStorage } from '@/lib/localStorage';

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem, quantity: number) => void;
  removeItem: (itemId: number) => void;
  updateItemColor: (itemId: number, color: string) => void;
  updateItemSize: (itemId: number, size: number) => void;
  updateItemQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>(loadFromLocalStorage());

  useEffect(() => {
    saveToLocalStorage(items);
  }, [items]);
  
  const addItem = (item: CartItem, quantity: number) => {
    // Verificar si el ítem ya existe en el carrito
    const existingItemIndex = items.findIndex(
      (existingItem) =>
        existingItem.id_product === item.id_product &&
        existingItem.color === item.color &&
        existingItem.size === item.size
    );
      
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

  const updateItemColor = (itemId: number, color: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, color: color };
        }
        return item;
      })
    );
  };

  const updateItemSize = (itemId: number, size: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, size: size };
        }
        return item;
      })
    );
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

  const clearCart = () => {
    console.log('a')
    setItems([]);
    localStorage.removeItem('shopping-cart');
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateItemColor, updateItemSize, updateItemQuantity ,  clearCart}}>
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
