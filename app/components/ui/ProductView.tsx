import ProductInfo from "@/components/ui/ProductInfo";
import { fetchProduct } from "@/lib/data";
import { Product } from "@prisma/client";

export default async function ProductView({ id }: { id: string }) {
  const product: Product = await fetchProduct(Number(id));

  return ( <ProductInfo product={product}></ProductInfo> );
}
