"use server"
import prisma from "@/lib/prisma";


  
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
  