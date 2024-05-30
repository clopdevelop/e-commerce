'use client'

import { Card } from "@/components/shadcn"

 
export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  return (
    <Card className="overflow-hidden w-8/12 mx-auto my-10 h-52 flex justify-center items-center">
      <div className="px-5">
      <h1 className="text-2xl font-bold">Algo ha ido mal, ¡tienes que iniciar sesión para comprar productos!</h1>
      </div>
    </Card>
  )
}