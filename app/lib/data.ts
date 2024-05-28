"use server";
import prisma from "@/lib/prisma";
import { Category } from "./definitions";
import { sleep } from "./utils";
import { User } from "@prisma/client";
import { auth } from "@/auth";

// USER
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

export async function login(): Promise<User | null> {
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

export async function getUserID(): Promise<number> {
  const authentication = await auth();
  const id_user = Number(authentication?.user?.id);
  return id_user;
}

// PRODUCTS
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
  });
  return products;
}

export async function fetchfilteredProductsperCategories(
  query: string,
  currentPage: number,
  productsOnPage: number,
  category?: string
) {
  const productsToSkip = (currentPage - 1) * productsOnPage;

  console.log(category);
  console.log(query);

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
      },
      category: {
        name: {
          contains: category ?? "",
        },
      },
    },
    include: { ProductImage: true, variants:true },
    take: productsOnPage,
    skip: productsToSkip,
  });

  console.log(products);

  return products;
}

/**
 * Filtrar Productos por nombre
 * @param query
 * @param currentPage
 * @returns
 */
export async function fetchFilteredProducts(
  query: string,
  currentPage: number,
  productsOnPage: number
) {
  // sleep(3)

  const productsToSkip = (currentPage - 1) * productsOnPage;

  const filteredProducts = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
      },
    },
    include: { ProductImage: true },
    take: productsOnPage,
    skip: productsToSkip,
  });

  return filteredProducts;
}

async function getFilteredProducts({ category, minPrice, maxPrice, brands }) {
  // (
  //   query: string,
  //   currentPage: number,
  //   productsOnPage: number,
  //   category?: string
  // ) 
  // Construye el objeto de condiciones de búsqueda
  let searchConditions = {};

  // Filtro por categoría
  if (category) {
    searchConditions.category = category;
  }

  // Filtro por rango de precios
  if (minPrice || maxPrice) {
    searchConditions.price = {};
    if (minPrice) {
      searchConditions.price.gte = minPrice; // Mayor o igual que
    }
    if (maxPrice) {
      searchConditions.price.lte = maxPrice; // Menor o igual que
    }
  }

  // Filtro por marcas
  if (brands && brands.length > 0) {
    searchConditions.brand = {
      in: brands, // La marca debe estar en el array de marcas seleccionadas
    };
  }

  // Realiza la consulta con los filtros aplicados
  const products = await prisma.product.findMany({
    where: searchConditions,
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

// ORDERS
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

export async function fetchOrdersByUserId(userId: number) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        user: {
          id: Number(userId),
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

export async function fetchCitiesFromProvinces() {}

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
