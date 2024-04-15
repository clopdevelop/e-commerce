import Link from 'next/link'
import { NavBar } from '@/components/ui'
import { Button } from '@/components/shadcn/button'

export default function NotFound() {
  return (
    <>
      <main className="flex flex-col items-center justify-between p-24">
        <div className='flex flex-col gap-5 items-center'>
          <h1>Error 404 - Producto no encontrado</h1>
          <Link href="/catalogo"><Button>Vuelve a la tienda</Button></Link>
        </div>
      </main>
    </>
  )
}