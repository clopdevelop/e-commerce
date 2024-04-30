import { Product } from "@/lib/definitions";
import { Metadata } from "next";
import { countProducts, fetchAllProducts, fetchProductbyName } from "@/lib/data";
import ProductPage from "@/components/ui/ProductPage";
import { notFound } from "next/navigation";

interface Props {
  params: { name: string };
  searchParams : { }
}

export const dynamicParams = false

//! En tiempo de compilación
// todo Consideración importante: En el slog hay que utilizar el nombre del producto para que las arañas de google entiendan las urls
export async function generateStaticParams() {

 const products = await fetchAllProducts()

  return products.map( product => ({
    name: product.name
  }));
}


// Metadata dinámica
export async function generateMetadata({params }: Props): Promise<Metadata> {
  try {
    const product: Product = await fetchProductbyName(params.name);
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
    const product : Product  = await fetchProductbyName(params.name)
  
    return (
      <ProductPage product={product}></ProductPage>
    );
  } catch (error) {
    notFound();
    // throw new Error('Producto no encontrado');
  }
  
}

// export default function Page({ params }:{ params: { slug: string }}) {
//   return (
//     <>
//       <h1>Página detalles del producto</h1>
//     </>
//   );
// }

