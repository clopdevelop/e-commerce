import { fetchAllCategories } from "@/lib/data"
import  NewProductForm  from '@/components/admin/ProductForm'
export default async function NewProductPage() {

  const categories = await fetchAllCategories();
  
  return (
    <>
      <NewProductForm categories={categories}/>
    </>
  )
}

