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

export default async function addOrder(session: Stripe.Checkout.Session,lineItems: Stripe.LineItem[]) {
  const { amount_total, status, metadata } = session;
  
  if (!status  || !amount_total || !metadata) {
    console.error("Sesión incompleta: falta status o line_items");
    return;
  }


  // Asume que siempre procesarás el primer line_item como el producto comprado
  const item = lineItems[0];
  const id_product = Number(metadata?.id_product); 
  const quantity = item.quantity ?? 1;
  const unit_price = item.price?.unit_amount ?? 0;

  //todo En produccion se creará una secuencia cuando se migre a Postgree para crear un codigo de factura
  const lastInvoice = await prisma.invoice.findFirst({
    orderBy: {
      id_invoice: 'desc',
    },
    select: {
      invoice_n: true,
    },
  });

  const nextInvoiceNumber = lastInvoice
    ? parseInt(lastInvoice.invoice_n.replace('INV', '')) + 1
    : 1;

  const formattedInvoiceNumber = `INV${nextInvoiceNumber.toString().padStart(4, '0')}`;

  // Crear la orden con detalles y factura en la base de datos.
  try {
    const newOrder = await prisma.order.create({
      data: {
        id_user: Number(metadata.id_user),
        id_delivery: 1, 
        status: status,
        orderDetails: {
          create: [{
            id_product: id_product,
            quantity: quantity,
            unit_price: unit_price,
            discount: 0, 
          }],
        },
        invoice: {
          create: [
            {
              invoice_n: formattedInvoiceNumber,
              type: "A",
              amount: amount_total,
              id_p_method: 1, 
            },
          ],
        },
      },
      include: {
        orderDetails: true,
        invoice: true,
      },
    });

    console.log("Orden guardada:", newOrder);
  } catch (error) {
    console.error("Error guardando la orden en la base de datos:", error);
  }
}