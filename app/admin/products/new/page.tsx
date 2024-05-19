import { fetchAllCategories } from "@/lib/data"
import  NewProductForm  from '@/components/admin/newProductForm'
export default async function NewProductPage() {

  const categories = await fetchAllCategories();
  
  return (
    <>
      <NewProductForm categories={categories}/>
    </>
  )
}

