"use server";
import prisma from "@/lib/prisma";
import { Category } from "./definitions";
import { sleep } from "./utils";
import { Address, Prisma, User } from "@prisma/client";
import { auth } from "@/auth";

// Gestión de usuarios

// function authenticateUser(token: string): User {
export async function getUserLogged(): Promise<User | null> {
  const authentication = await auth();
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: authentication?.user?.email ?? "",
      },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

// function checkPermissions(user: User, requiredPermission: string): void {

// USER
export async function getUserIDDB() {
  const authentication = await auth();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: authentication?.user?.email ?? "",
      },
      select: {
        id: true,
      },
    });
    return user?.id;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

// Define la función para recuperar un usuario por su email
export async function getUserByEmail(email: string) {
  try {
    // Utiliza el cliente de Prisma para encontrar el usuario por email
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // Retorna el usuario encontrado, o null si no existe
    return user;
  } catch (error) {
    // Manejo de errores
    console.error("Error al recuperar el usuario por email:", error);
    throw error;
  }
}

export async function getUserIDSession(): Promise<number> {
  const authentication = await auth();
  const id_user = Number(authentication?.user?.id);
  return id_user;
}

export async function getAddresByUserLog(): Promise<(Address & { cityName: string; provinceName: string; })[]> {
  const userId = await getUserIDDB();

    const usuarioConDirecciones = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      addresses: {
        include: {
          city: {
            include: {
              province: true,
            },
          },
        },
      },
    },
  });

  return usuarioConDirecciones?.addresses.map(address => ({
    ...address,
    cityName: address.city.name,
    provinceName: address.city.province.name,
  }));
}



export async function getPaymentMethodsByUser() {
  const userId = await getUserIDDB();
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { paymentMethods: true },
    });

    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    return user.paymentMethods;
  } catch (error) {
    console.error("Error al obtener métodos de pago del usuario:", error);
    throw error;
  }
}

//Gestión de Productos
// function viewCart(userId: string): Cart {

/**
 * Devuelve todos los Productos
 * @param query
 * @param currentPage
 * @returns
 */
export async function fetchAllProducts() {
  // await new Promise((resolve) => setTimeout(resolve,3000));

  const Products = await prisma.product.findMany({
    include: { ProductImage: true },
  });

  return Products;
}

export async function fetchProducts(currentPage: number = 1) {
  const productsOnPage = 1;
  const productsToSkip = (currentPage - 1) * productsOnPage;

  const Products = await prisma.product.findMany({
    take: productsOnPage,
    skip: productsToSkip,
  });

  return Products;
}

export async function countProducts(): Promise<number> {
  const productCount = await prisma.product.count();
  return productCount;
}

export async function fetchProduct(id: number) {
  const Product = await prisma.product.findFirst({
    where: {
      id: id,
    },
    include: {
      ProductImage: true,
      variants: true,
    },
  });

  if (Product == null) throw new Error();

  return Product;
}

export async function fetchProductbyName(name: string) {
  const Product = await prisma.product.findFirst({
    where: {
      name: name,
    },
    include: { ProductImage: true },
  });

  if (Product == null) throw new Error();

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
    include: {
      ProductImage: true
    }
  });
  return products;
}

//Filtrar productos por nombre, categoría y precio
export async function fetchfilteredProducts(
  query: string,
  currentPage: number,
  productsOnPage: number,
  category?: string,
  priceRange?: { min: number; max: number }
) {
  const productsToSkip = (currentPage - 1) * productsOnPage;

  // Define the base conditions for the query
  let conditions: Prisma.ProductWhereInput = {
    name: query ? { contains: query, mode: "insensitive" } : undefined,
    price: priceRange
      ? { gte: priceRange.min, lte: priceRange.max }
      : undefined,
    category: category
      ? { name: { contains: category, mode: "insensitive" } }
      : undefined,
  };

  const products = await prisma.product.findMany({
    where: conditions,
    include: { ProductImage: true, variants: true },
    take: productsOnPage,
    skip: productsToSkip,
  });

  return products;
}

/**
 * Calcula el total de páginas para una búsqueda
 * @param query
 * @param productsOnPage
 * @returns
 */
export async function fetchProductsPages(
  query: string,
  productsOnPage: number
) {
  const totalProducts = await prisma.product.count({
    where: {
      name: {
        contains: query,
      },
    },
  });

  if (totalProducts === 0) {
    return 1;
  }

  // para asegurarse de incluir todas las páginas, incluso si la última página no está completa.
  const totalPages = Math.ceil(totalProducts / productsOnPage);

  totalPages;

  return totalPages;
}

export async function countProductsCatalog(
  category: string,
  query: string,
  productsOnPage: number
) {
  const whereClause = {
    name: {
      contains: query,
    },
    ...(category && { category: { name: category } }),
  };
  const totalProducts = await prisma.product.count({
    where: whereClause,
  });

  if (totalProducts === 0) {
    return 1;
  }

  const totalPages = Math.ceil(totalProducts / productsOnPage);

  return totalPages;
}

//Gestión de Pedidos

export async function fetchAllOrders() {
  try {
    const orders = await prisma.order.findMany();
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function fetchOrder(id: number) {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: id,
      },
      include: {
        OrderItem: true,
      },
    });
    return order;
  } catch (error) {
    console.error("Error fetching orders by user ID:", error);
    throw error;
  }
}

export async function fetchOrderDetails(id_order: string) {
  const id = Number(id_order);
  const id_user = await getUserIDDB();
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: id,
        id_user: id_user,
      },
      include: {
        OrderItem: {
          include: {
            product: true
          }
        },
      },
    });
    return order;
  } catch (error) {
    console.error("Error fetching orders by user ID:", error);
    throw error;
  }
}


export async function fetchShippingAddressOrder(id_order: string) {
  const id = Number(id_order);
  const id_user = await getUserIDDB();
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: id,
        id_user: id_user,
      },
      include: {},
    });

    if (!order) {
      throw new Error("Order not found or does not belong to this user");
    }

    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchTotalPriceOrder(id_order: string) {
  const id = Number(id_order);
  const user = await getUserIDDB();
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: id,
        id_user: user,
      },
      select: {
        total: true,
      },
    });

    if (!order) {
      throw new Error("Order not found or does not belong to this user");
    }

    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchOrdersByUserId(userId: string | undefined) {
  if (userId == undefined) return [];
  try {
    const orders = await prisma.order.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      // include: {
      //   OrderItem : true
      // }
    });
    return orders;
  } catch (error) {
    console.error("Error fetching orders by user ID:", error);
    throw error;
  }
}

export async function fetchInvoicesByUserId(userId: string) {
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
          include: {
            product: true,
          },
        },
      },
    });
    return orders;
  } catch (error) {
    console.error("Error fetching orders by user ID:", error);
    throw error;
  }
}

export async function fetchAllCategories() {
  const categories = await prisma.category.findMany({
    select: {
      name: true,
    },
  });
  return categories.map((category) => category.name);
}

// todo
export async function fetchProvinces() {}

export async function fetchCitiesFromID({id_city}:{id_city:number}) {
    try {
      const city = await prisma.city.findUnique({
        where: {
          id: id_city,
        },
        include: {
          province: true,
        },
      });
  
      if (!city) {
        throw new Error('City not found');
      }
  
      return {
        cityName: city.name,
        provinceName: city.province.name,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error retrieving city and province');
    }
}


// Gestión Administrativa
export async function fetchTotalRevenues() {
  return await prisma.order.aggregate({
    _sum: {
      total: true,
    },
  });
}

export async function fetchTotalSales() {
  return await prisma.order.count();
}

export async function fetchTotalClients() {
  return await prisma.user.count({
    where: {
      role: "user",
    },
  });
}

//Gestión de Envíos
// function calculateShipping(address: Address): ShippingRates {

// // function trackShipment(trackingNumber: string): ShipmentStatus {

// //Utilidades
// function validateProduct(product: Product): void {

//   function isValidToken(token: string): boolean {

//     function isValidInput(input: any): boolean {
