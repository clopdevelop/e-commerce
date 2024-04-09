import { CartDetail } from '@/lib/definitions';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type CartContextType = {
  items: CartDetail[];
  addItem: (item: CartDetail) => void;
  removeItem: (itemId: number) => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartDetail[]>([]);

  const addItem = (item: CartDetail) => {
    // todo Implementación para agregar un item al carrito
    setItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (itemId: number) => {
    // todo Implementación para remover un item del carrito
    setItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem }}>
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
