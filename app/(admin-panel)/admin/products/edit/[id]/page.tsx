
import { Product } from "@/lib/definitions"
import EditProductForm from "@/components/form/EditProductForm"
import { fetchAllCategories, fetchProduct } from "@/lib/data"

interface Props {
  params: { id: string };
}

  export default async function EditPage({ params }: Props) {
  const product: Product | null = await fetchProduct(Number(params.id))
  const categories = await fetchAllCategories();
  
  return (
    <EditProductForm product={product} categories={categories}></EditProductForm>
  )
}
