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
  
/**
 * Obtener productos del carrito por id usuario
 * @param userId 
 * @returns 
 */
export async function getCartDetailsByUserId(userId: number ) {
  const cart = await prisma.cart.findFirst({
    where: {
      id_user: userId,
    },
    select: {
      cartDetails: {
        select: {
          id_product: true,
          quantity: true,
          product: {
            select: {
              name: true,
              price: true,
              description: true,
              // Agrega aquí más campos según sea necesario
            },
          },
        },
      },
    },
  });

  // Si no se encuentra el carrito o no hay detalles, devuelve un array vacío
  if (!cart || !cart.cartDetails) {
    return [];
  }

  // De lo contrario, devuelve los detalles del carrito
  return cart.cartDetails;
}

export async function getCartDetailsByEmail(email: string) {
  const cart = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      Cart: {
        select: {
          cartDetails: {
            select: {
              id_product: true,
              quantity: true,
              product: {
                select: {
                  name: true,
                  price: true,
                  description: true,
                  // Agrega aquí más campos según sea necesario
                },
              },
            },
          },
        },
      },
    },
  });

  // Si no se encuentra el usuario, su carrito o no hay detalles, devuelve un array vacío
  if (!cart || cart.Cart.length === 0 || !cart.Cart[0].cartDetails) {
    return [];
  }

  // De lo contrario, devuelve los detalles del primer carrito encontrado
  return cart.Cart[0].cartDetails;
}

export async function fetchOrdersByUserId(userId: number) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        id_user: userId,
      },
    });
    return orders;
  } catch (error) {
    console.error('Error fetching orders by user ID:', error);
    throw error;
  }
}

export async function fetchInvoicesByUserId(userId: number) {
  // Utiliza el cliente Prisma para realizar la consulta a la base de datos.
  // Asumiendo que hay una relación entre el User y sus Invoices
  // a través de Orders (User -> Order -> Invoice).
  return await prisma.invoice.findMany({
    where: {
      order: {
        user: {
          id_user: userId,
        },
      },
    },
    include: {
      order: true, // Incluye detalles del pedido asociado a la factura
    },
  });
}