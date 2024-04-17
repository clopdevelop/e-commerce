'use client'

import { useSearchParams } from 'next/navigation';

export default function Home() { // Obtiene el parámetro `success` de la URL
  const searchParams = useSearchParams();
  const success = searchParams.get('success')

  return (
    <>
      {success ? (
        <>
          <h1>SUCCESS</h1>
        </>
      ): (
        <>
          <h1>WELCOME</h1>
        </>
      )}
    </>
  );
}
