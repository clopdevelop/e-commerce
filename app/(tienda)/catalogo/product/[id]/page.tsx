import { Product } from "@/lib/definitions";
import { Metadata } from "next";
import { countProducts, fetchProduct } from "@/lib/data";
import ProductPage from "@/components/ui/ProductPage";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
  searchParams: {};
}

export const dynamicParams = false;

//! En tiempo de compilación
export async function generateStaticParams() {
  const totalProducts = await countProducts();

  const staticProductsIndexes = Array.from({ length: totalProducts }).map(
    (v, i) => `${i + 1}`
  );

  return staticProductsIndexes.map((id) => ({
    id: id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product: Product = await fetchProduct(Number(params.id));

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.thumbnail || {};

  return {
    title: `${product.name}`,
    description: `${product.description}`,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: false,
      },
    },
    openGraph: url ? { images: [{ url, width, height, alt }] } : null,
    
  };
}

export default async function Page({ params }: Props) {
  try {
    const product: Product = await fetchProduct(Number(params.id));

    return <ProductPage product={product}></ProductPage>;
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
