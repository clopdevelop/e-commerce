'use client'

import { CartProvider } from "./context/CartProvider";
import { useSearchParams } from 'next/navigation';

export default function Home() { // Obtiene el parámetro `success` de la URL
  const searchParams = useSearchParams();
  const success = searchParams.get('success')

  return (
    <CartProvider>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {success ? (
        <>
          <h1>SUCCESS</h1>
        </>
      ): (
        <>
          <h1>WELCOME</h1>
        </>
      )}
    </main>
    </CartProvider>
    
  );
}
