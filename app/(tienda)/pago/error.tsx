'use client'

import { Card } from "@/components/shadcn"
import Link from "next/link"

 
export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  return (
    <Card className="overflow-hidden w-8/12 mx-auto my-5 h-52 flex justify-center items-center">
      <div className="p-2">
      <h1 className="text-2xl font-bold py-4">¡Algo ha ido mal!</h1>
       <Link className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 font-bold" href='/entrada'>Haz click aqui para Iniciar Sesión</Link>
      </div>
     
    </Card>
  )
}