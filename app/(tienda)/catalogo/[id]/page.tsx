import { Product } from "@/lib/definitions";
import { Metadata } from "next";
import { countProducts, fetchProduct } from "@/lib/data";
import ProductPage from "@/components/ui/ProductPage";

interface Props {
  params: { id: string };
  searchParams : { }
}

//! En tiempo de compilación
export async function generateStaticParams() {

  const totalProducts = await countProducts();

  const staticProducts = Array.from({ length: totalProducts }).map( (v, i) => `${i + 1}` );

  return staticProducts.map( id => ({
    id: id
  }));
}


// Metadata dinámica
export async function generateMetadata({params }: Props): Promise<Metadata> {
  const product: Product | null = await fetchProduct(Number(params.id));
  if (product === null) {
    throw new Error('Producto no encontrado');
  }
  return {
    title:`${product.name}`,
    description:`${product.description}`
  }
}


export default async function Page({ params }: Props) {

  const product : Product | null  = await fetchProduct(Number(params.id))

  return (
    <ProductPage product={product}></ProductPage>
  );
}

// export default function Page({ params }:{ params: { slug: string }}) {
//   return (
//     <>
//       <h1>Página detalles del producto</h1>
//     </>
//   );
// }

