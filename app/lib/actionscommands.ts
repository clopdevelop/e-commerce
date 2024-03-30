"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import Stripe from "stripe";

/**
 * Añade un usuario
 * @param formData
 * @returns
 */
export async function addUser(formData: FormData) {
  try {
    const firstName = formData.get("first_name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (
      typeof firstName !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      throw new Error("Faltan datos obligatorios o son inválidos.");
    }

    const newUser = await prisma.user.create({
      data: {
        first_name: firstName,
        email: email,
        password: password,
      },
    });
    redirect("/");
  } catch (error) {
    console.error("Error al añadir usuario:", error);
    throw error;
  }
}
/**
 * Autenticar un usuario
 * @param prevState
 * @param formData
 * @returns
 */
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

/**
 * PERFIL
 */

// async function updateUserAddress(id_user: number, newAddress: string, id_city: number): Promise<void> {
//   const user = await prisma.user.findUnique({
//     where: { id_user },
//     include: { : true },
//   });

//   if (user && user.id_address) {
//     await prisma.address.update({
//       where: {
//         id_address: user.id_address,
//       },
//       data: {
//         address: newAddress,
//         id_city,
//       },
//     });
//   } else {
//     console.log("El usuario no tiene una dirección asociada.");
//   }
// }

/**
 * añadir un producto al carrito
 * @param id_product
 * @param name
 * @param description
 * @param price
 * @returns
 */
export async function addProductToCart(
  userId: number,
  id_product: number,
  quantity: number
) {
  let cart = await prisma.cart.findFirst({
    where: { id_user: userId },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        id_user: userId,
      },
    });
  }

  const cartDetail = await prisma.cartDetail.upsert({
    where: {
      id_cart_id_product: {
        id_cart: cart.id_cart,
        id_product: id_product,
      },
    },
    update: {
      quantity: { increment: quantity },
    },
    create: {
      id_cart: cart.id_cart,
      id_product: id_product,
      quantity: quantity,
    },
  });

  return cartDetail;
}

/**
 * eliminar un producto al carrito
 * @param id_product
 * @param name
 * @param description
 * @param price
 * @returns
 */
export async function deleteProductToCart(
  userId: number,
  id_product: number,
  quantity: number
) {
  let cart = await prisma.cart.findFirst({
    where: { id_user: userId },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        id_user: userId,
      },
    });
  }

  const cartDetail = await prisma.cartDetail.upsert({
    where: {
      id_cart_id_product: {
        id_cart: cart.id_cart,
        id_product: id_product,
      },
    },
    update: {
      quantity: { increment: quantity },
    },
    create: {
      id_cart: cart.id_cart,
      id_product: id_product,
      quantity: quantity,
    },
  });

  return cartDetail;
}
export default async function addOrder(session: Stripe.Checkout.Session) {
  // Extracción de datos de la sesión de Stripe aquí
  // Por ejemplo: const { amount_total, customer_details, line_items } = session;

  try {
    const newOrder = await prisma.order.create({
      data: {
        // Asume extracción de id_user basada en información de la sesión o algún mecanismo de autenticación
        id_user: 1, 
        id_delivery: 1, // Este valor debería ser determinado basado en la lógica de tu aplicación
        status: "pending",
        paid: false,
        orderDetails: {
          create: [
            // Suponiendo extracción de detalles de productos de la sesión de Stripe
          ],
        },
        invoice: {
          create: [
            {
              invoice_n: "INV0005", // Asegúrate de generar un valor único aquí
              type: "A",
              amount: 200.0, // Asume extracción del total de la sesión de Stripe
              // Ajusta la siguiente línea si es necesario para coincidir con tu esquema y tipos generados
              id_p_method:1,
            },
          ],
        }
      },
      include: {
        orderDetails: true,
        invoice: true,
      },
    });

    console.log("Order guardada:", newOrder);
  } catch (error) {
    console.error("Error guardando la orden en la base de datos:", error);
    // Ajusta el manejo de error según el contexto de tu aplicación
  }
}
