"use client"
import { CartProvider } from "@/context"



export default function Provider({children
}: { children: React.ReactNode
}) {

  return  <CartProvider>{children}</CartProvider>
}
