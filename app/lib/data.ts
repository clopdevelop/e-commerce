"use server"
import prisma from "@/lib/prisma";

/**
 * Devuelve todos los Productos
 * @param query 
 * @param currentPage 
 * @returns 
 */
export async function fetchAllProducts() {
  // await new Promise((resolve) => setTimeout(resolve,3000));

  const Products = await prisma.product.findMany({
  });

  return Products;
}

export async function fetchProducts(currentPage: number = 1) {
  // await new Promise((resolve) => setTimeout(resolve,3000));

  const productsOnPage = 1; 
  const productsToSkip = (currentPage - 1) * productsOnPage;

  const Products = await prisma.product.findMany({
    take: productsOnPage,
    skip: productsToSkip, 
  });

  return Products;
}
  
/**
 * Filtrar Productos por nombre
 * @param query 
 * @param currentPage 
 * @returns 
 */
export async function fetchFilteredProducts(query: string, currentPage: number) {
    const productsOnPage = 1; 
    const productsToSkip = (currentPage - 1) * productsOnPage;
  
    const filteredProducts = await prisma.product.findMany({
      where: {
        name: {
          contains: query, 
        },
      },
      take: productsOnPage,
      skip: productsToSkip, 
    });
  
    return filteredProducts;
}

export async function countProducts(): Promise<number> {
  const productCount = await prisma.product.count();
  return productCount;
}

export async function fetchProduct(id: number) {
  const Product = await prisma.product.findFirst({
    where: {
      id : id
    }
  }
  );

  if (Product==null)
    throw new Error;

  return Product;
}
  
// Recuperar los productos con los IDs proporcionados
export async function fetchProductsbyIDs(products_ids: Array<number> = [1]) {
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: products_ids,
        },
      },
    });
    return products;
}


/**
 * Calcula el total de páginas para una búsqueda
 * @param query 
 * @param productsOnPage 
 * @returns 
 */
export async function fetchProductsPages(query : string, productsOnPage = 1) {
  
  const totalProducts = await prisma.product.count({
    where: {
      name: {
        contains: query,
      },
    },
  });

  // para asegurarse de incluir todas las páginas, incluso si la última página no está completa.
  const totalPages = Math.ceil(totalProducts / productsOnPage);

  return totalPages;
}




export async function fetchOrdersByUserId(userId: number) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        user: {
           id : userId,
        }
      },
    });
    return orders;
  } catch (error) {
    console.error('Error fetching orders by user ID:', error);
    throw error;
  }
}

export async function fetchInvoicesByUserId(userId: number) {
  return await prisma.invoice.findMany({
    where: {
      Order: {
        user: {
          id: userId,
        },
      },
    },
    include: {
      Order: true, 
    },
  });
}


export async function fetchProductsByOrder(orderId: number) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        id: orderId,
      },
      include: {
        OrderItem: {
          include:{
            product:true,
          }
        }
      }
    });
    return orders;
  } catch (error) {
    console.error('Error fetching orders by user ID:', error);
    throw error;
  }
}


export async function consolelog() {
  console.log("Hola");
}