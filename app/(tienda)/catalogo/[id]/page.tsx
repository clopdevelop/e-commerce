import { Product } from "@/lib/definitions";
import { Metadata } from "next";
import { countProducts, fetchProduct } from "@/lib/data";
import ProductPage from "@/components/ui/ProductPage";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
  searchParams : { }
}

//! En tiempo de compilación
export async function generateStaticParams() {

  const totalProducts = await countProducts();

  const staticProductsIndexes = Array.from({ length: totalProducts }).map( (v, i) => `${i + 1}` );

  return staticProductsIndexes.map( id => ({
    id: id
  }));
}


// Metadata dinámica
export async function generateMetadata({params }: Props): Promise<Metadata> {
  try {
    const product: Product = await fetchProduct(Number(params.id));
  if (product === null) {
    throw new Error('Producto no encontrado');
  }
  return {
    title:`${product.name}`,
    description:`${product.description}`
  }   
  } catch (error) {
    return {
      title: 'Pagina de producto',
      description: 'Descripción del producto'
    }
  }
}


export default async function Page({ params }: Props) {

  try {
    const product : Product  = await fetchProduct(Number(params.id))
  
    return (
      <ProductPage product={product}></ProductPage>
    );
  } catch (error) {
    notFound();
  }
  
}

// export default function Page({ params }:{ params: { slug: string }}) {
//   return (
//     <>
//       <h1>Página detalles del producto</h1>
//     </>
//   );
// }

