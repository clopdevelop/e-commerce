import EmptyInventory from "@/components/admin/emptyinventory"
import Inventory from "@/components/admin/inventory"
import { fetchAllProducts } from "@/lib/data"
import { Product } from "@/lib/definitions";


export default async function admin() {
  const Products: Product[] = await fetchAllProducts();


  return (
    // <EmptyInventory></EmptyInventory>
    <main className="p-24 border">
      <Inventory products={Products}></Inventory>
    </main>
  )
}