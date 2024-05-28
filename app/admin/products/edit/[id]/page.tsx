
import  EditProductForm  from '@/components/admin/ProductForm'
import { fetchAllCategories, fetchProduct } from "@/lib/data"
import { Product } from '@prisma/client';

interface Props {
  params: { id: string };
}

  export default async function EditPage({ params }: Props) {
  const product: Product = await fetchProduct(Number(params.id))
  const categories = await fetchAllCategories();

  return (
    <EditProductForm product={product} categories={categories}></EditProductForm>
  )
}
