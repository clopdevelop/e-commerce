"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

import { auth, signIn } from "../auth";
import { AuthError } from "next-auth";
import Stripe from "stripe";
import { addProductSchema, addVariantProductSchema, editProductSchema } from "./schemas";
import { sleep } from "./utils";

// AUTHENTICATION
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
  console.log(formData)
  const email =  formData.get("email")
  const pass =  formData.get("password")
  const obj = {
    email: email,
    password: pass,
// Add other properties as needed
}
console.log(obj) //  { email: 'usuario@gmail.com', password: 'usuario' }

  try {
    await signIn("credentials", {
      ...obj,
      redirect: false,
    });
    
    return "Success";
  } catch (error) {
    console.log(error);
    
    return "CredentialsSignin";
  }
}

export async function signInGoogle() {
  await signIn("google");
}

export async function login() {
  const completeUser = await getUser();

  return completeUser;
}

export async function getUserID() {
  const completeUser = await getUser();
  const id = completeUser?.id;

  return id;
}

// USER
export async function getAddresByUserLog() {
  const userId = await getUserID();
  try {
    const user = await prisma.user.findUnique({
      where: { id: 1 },
      include: { address: true },
    });

    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    return user.address;
  } catch (error) {
    console.error("Error al añadir usuario:", error);
    throw error;
  }
}

export async function getPaymentMethodsByUser() {
  const userId = await getUserID();
  try {
    const user = await prisma.user.findUnique({
      where: { id: 1 },
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
        name: firstName,
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

export async function updateUserEmail(formData: FormData) {
  try {
    const email = formData.get("email");
    const id = await getUserID();

    if (typeof email !== "string") {
      throw new Error("Faltan datos obligatorios o son inválidos.");
    }

    const newUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: email,
      },
    });

    revalidatePath("/dashboard/profile");
    console.log(`USUARIO ACTUALIZADO : email -> ${email}`);
  } catch (error) {
    console.error("Error al añadir usuario:", error);
    throw error;
  }
}

import bcrypt from "bcrypt";

export default async function changePass(formData: FormData) {
  console.log("hola");
  const actualPass = formData.get("actual-pass")?.toString();
  const newPass = formData.get("new-pass")?.toString();
  const newPassRepeat = formData.get("new-pass-repeat")?.toString();

  if (newPass !== newPassRepeat) {
    throw new Error("Las contraseñas no coinciden");
  }

  const user = await login();

  if (!user) return 0;

  // const valid = await bcrypt.compare(actualPass, user.password);

  // if (!valid) {
  //   throw new Error("Contraseña actual incorrecta");
  // }

  // const hashedPassword = await bcrypt.hash(newPass, 10);

  const valid = actualPass == user.password ? true : false;

  if (!valid) {
    throw new Error("Contraseña actual incorrecta");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { password: newPass },
  });

  return "Contraseña actualizada con éxito";
}

// PROFILE
export async function updateProfile(formData: FormData) {
  try {
    const username = formData.get("username");
    const bio = formData.get("bio");
    const id = await getUserID();

    if (typeof username !== "string" || typeof bio !== "string") {
      throw new Error("Faltan datos obligatorios o son inválidos.");
    }

    const newUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username: username,
        bio: bio,
      },
    });

    revalidatePath("/dashboard/profile");
    console.log(
      `USUARIO ACTUALIZADO : username -> ${username} | bio -> ${bio}`
    );
  } catch (error) {
    console.error("Error al añadir usuario:", error);
    throw error;
  }
}

// async function updateUserAddress(
//   id_user: number,
//   newAddress: string,
//   id_city: number
// ): Promise<void> {
//   const user = await prisma.user.findUnique({
//     where: { id: id_user },
//     include: { address: true },
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

export async function saveAddress(formData: FormData) {
  try {
    const id = await getUserID(); // Obtener el ID del usuario (supongo que tienes una función así)

    const address = formData.get("address")?.toString();
    // const number = parseInt(formData.get("number") || "0", 10);

    const numberString = formData.get("number")?.toString();
    if (numberString === undefined) return 0;
    const number = parseInt(numberString);
    const letter = formData.get("letter")?.toString();
    const block = formData.get("block")?.toString();
    const staircase = formData.get("staircase")?.toString();
    // const postalCode = formData.get("postalCode")?.toString();

    // Validar los datos obligatorios
    if (!address || isNaN(number)) {
      throw new Error("Faltan datos obligatorios o son inválidos.");
    }

    // Actualizar la dirección del usuario en la base de datos utilizando Prisma
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      include: {
        address: true,
      },
      data: {
        address: {
          upsert: {
            create: {
              name: address,
              number: number,
              letter: letter,
              block: block,
              staircase: staircase,
              // postalCode: postalCode,
            },
            update: {
              name: address,
              number: number,
              letter: letter,
              block: block,
              staircase: staircase,
              // postalCode: postalCode,
            },
            where: {
              id: id,
            },
          },
        },
      },
    });

    // Realizar cualquier otra acción necesaria, como revalidar la ruta
    revalidatePath("/dashboard/profile");

    console.log(
      `Dirección actualizada: ${address}, ${number}, ${letter}, ${block}, ${staircase}`
    );
  } catch (error) {
    console.error("Error al guardar la dirección:", error);
    throw error;
  }
}

export async function savePayMethod(formData: FormData) {
  try {
    const paymentMethod = formData.get("paymentMethod")?.toString();
    const cardHolderName = formData.get("cardHolderName")?.toString();
    const cardNumber = formData.get("cardNumber")?.toString();
    const month = formData.get("month")?.toString();
    const year = formData.get("year")?.toString();
    const cvc = formData.get("cvc")?.toString();
    const saveBillingInfo = formData.get("mobile")?.toString() === "on";

    if (
      typeof paymentMethod !== "string" ||
      typeof cardHolderName !== "string" ||
      typeof cardNumber !== "string" ||
      typeof month !== "string" ||
      typeof year !== "string" ||
      typeof cvc !== "string"
    ) {
      throw new Error("Faltan datos obligatorios o son inválidos.");
    }

    const result = await prisma.paymentMethod.create({
      data: {
        name: paymentMethod,
        cardHolderName: cardHolderName,
        cardNumber: cardNumber,
        expirationMonth: parseInt(month), // Convertimos a entero
        expirationYear: parseInt(year), // Convertimos a entero
        cvc: cvc,
        saveBillingInfo: saveBillingInfo,
      },
    });

    console.log(
      `Método de pago guardado: paymentMethod -> ${paymentMethod} | cardHolderName -> ${cardHolderName}`
    );

    // Puedes realizar alguna acción adicional después de guardar el método de pago si es necesario

    return result; // Devolvemos el resultado por si es útil para el frontend
  } catch (error) {
    console.error("Error al guardar el método de pago:", error);
    throw error;
  }
}

export async function eliminarDireccion(formData: {
  name: string;
  email: string;
  text: string;
}) {}

export async function guardarFacturación(formData: {
  name: string;
  email: string;
  text: string;
}) {}

export async function eliminarFacturación(formData: {
  name: string;
  email: string;
  text: string;
}) {}

// PRODUCT
import { v2 as cloudinary } from "cloudinary";
import { writeFile, unlink } from "fs";
import path from "path";

cloudinary.config({
  cloud_name: "denq9j9dq",
  api_key: "135212156196912",
  api_secret: process.env.CLOUDINARY_API_KEY,
});

export async function addProduct(formData: FormData) {
  // await sleep(3);
  try {
    // const rawFormData = Object.fromEntries(formData.entries());
    console.log(formData);

    const rawFormData = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      material: formData.get("material"),
      stock: Number(formData.get("stock")),
      color: formData.get("color"),
      size: Number(formData.get("size")),
      category: formData.get("category"),
      state: formData.get("state"),
      image: formData.get("image"),
    };
    
    // const { name, price, description, material, color, size, category,state, stock, image } =
    const { name, price, description, material,category, state } = addProductSchema.parse(rawFormData);
    
    console.log(formData);

    // console.log(image);

    // // const bytes = await image.arrayBuffer();
    // // const buffer = Buffer.from(bytes);

    // // const filePath = path.join(process.cwd(), "public", image.name);
    // // await writeFile(filePath, buffer, async (err) => {
    // //   if (err) {
    // //     console.error("Hubo un error al escribir el archivo:", err);
    // //   } else {
    // //     console.log("Archivo escrito con éxito");
    // //     const cloud = await cloudinary.uploader.upload(filePath);

    // //     await unlink(filePath, (err) => {
    // //       err ? console.log("Hubo un error al eliminar el archivo") : "";
    // //     });

    // //     if (cloud) {
    // //       await unlink(filePath, () => {
    // //         return 0;
    // //       });
    // //     }

    // //     const newProduct = await prisma.product.create({
    // //       data: {
    // //         name: name,
    // //         price: Number(price),
    // //         description: description,
    // //         ProductImage: {
    // //           create: {
    // //             url: cloud.url,
    // //           },
    // //         },
    // //       },
    // //     });
    // //   }
    // // });

    //  const newProduct = await prisma.product.create({
    //    data: {
    //      name: name,
    //      price: price,
    //      description: description,
    //      material: material,
    //    },
    //  });

    //  revalidatePath("/admin/products");
    //  redirect("/admin/products");
  } catch (err) {
    console.log(err);
  }
}

// export async function addProductTEST(formData: FormData) {
//   console.log(formData);

//   // const rawFormData = {
//   //   name: formData.get("name"),
//   //   price: Number(formData.get("price")),
//   //   description: formData.get("description"),
//   //   stock: Number(formData.get("stock")),
//   //   category: Number(formData.get("category")),
//   // };

//   // const { name, price, description, stock, category} = addProductSchema.parse(rawFormData)

//   //   const newProduct = await prisma.product.create({
//   //     data: {
//   //       name,
//   //       description,
//   //       price,
//   //       stock,
//   //       id_category: category,
//   //     },
//   //   });

//   // revalidatePath("/admin/products")
//   // redirect("/admin/products")
// }

export async function editProduct(formData: FormData) {
  try {
    // const rawFormData = Object.fromEntries(formData.entries());
    console.log(formData);

    const rawFormData = {
      id: Number(formData.get("id")),
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      material: formData.get("material"),
      stock: Number(formData.get("stock")),
      color: formData.get("color"),
      size: Number(formData.get("size")),
      category: formData.get("category"),
      state: formData.get("state"),
      image: formData.get("image"),
    };
    
    // const { name, price, description, material, color, size, category,state, stock, image } =
    const { id, name, price, description, material,category, state } = editProductSchema.parse(rawFormData);
    
    console.log(formData);

    // console.log(image);


    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        name: name,
        price: price,
        description: description,
      },
    });

    revalidatePath(`/admin/products/`);
  } catch (err) {
    console.log(err);
  }
}

export async function addVariantProduct(formData: FormData){
 
  try {
    console.log(formData);

    const rawFormData = {
      id_product: Number(formData.get("id_product")),
      code: formData.get("code"),
      stock: Number(formData.get("stock")),
      id_color: Number(formData.get("color")),
      size: Number(formData.get("size")),
    };
    
    const variant = addVariantProductSchema.parse(rawFormData);
    
    console.log(rawFormData);

    await prisma.productVariant.create({
      data: {
        code: variant.code,
        stock: variant.stock,
        product: {
          connect: {
            id: variant.id_product,
          },
        },
        color: {
          connect: {
            id: variant.id_color,
          },
        },
        size: {
          connect: {
            id: variant.stock,
          },
        },
      },
    });
     revalidatePath("/admin/products");
  } catch (err) {
    console.log(err);
  }

}

export async function editVariantProduct(formData: FormData){
 
  try {
    console.log(formData);

    const rawFormData = {
      id_product: Number(formData.get("id_product")),
      code: formData.get("code"),
      stock: Number(formData.get("stock")),
      id_color: Number(formData.get("color")),
      size: Number(formData.get("size")),
    };
    
    const variant = addVariantProductSchema.parse(rawFormData);
    
    console.log(rawFormData);

    await prisma.productVariant.create({
      data: {
        code: variant.code,
        stock: variant.stock,
        product: {
          connect: {
            id: variant.id_product,
          },
        },
        color: {
          connect: {
            id: variant.id_color,
          },
        },
        size: {
          connect: {
            id: variant.stock,
          },
        },
      },
    });
     revalidatePath("/admin/products");
  } catch (err) {
    console.log(err);
  }

}

export async function deleteProduct(formData: FormData) {
  const data = formData.get("id_product");
  const id_product = Number(data);
  try {
    const deletedProductImages = await prisma.productImage.deleteMany({
      where: { id_product: id_product },
    });

    const deletedOrderItems = await prisma.orderItem.deleteMany({
      where: { id_product: id_product },
    });

    const deletedProduct = await prisma.product.delete({
      where: { id: id_product },
    });
    revalidatePath("/admin/products/");
    return deletedProduct;
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
}

export async function deleteProductonClick(product: { id_product: number }) {
  const { id_product } = product;
  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: id_product },
    });
    return deletedProduct;
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
}

// ORDERS
// ! Esto se debe ejecutar en el webHook una vez que el pago está completado

export async function addOrder(payment: Stripe.PaymentIntent) {
  console.log(payment);

  const amount = payment.amount;

  const metadata = payment.metadata;

  const paid = payment.status;

  //todo En produccion se creará una secuencia cuando se migre a Postgree para crear un codigo de factura
  const lastInvoice = await prisma.invoice.findFirst({
    orderBy: {
      id: "desc",
    },
    select: {
      invoice_n: true,
    },
  });

  const nextInvoiceNumber = lastInvoice
    ? parseInt(lastInvoice.invoice_n.replace("INV-", ""), 10) + 1
    : 1;

  const formattedInvoiceNumber = `INV-${nextInvoiceNumber.toString().padStart(3, "0")}`;

  const lastOrder = await prisma.order.findFirst({
    orderBy: {
      id: "desc",
    },
    select: {
      code: true,
    },
  });

  // Verificamos si existe una última orden
  const nextOrderNumber = lastOrder
    ? parseInt(lastOrder.code.replace("INV-", ""), 10) + 1
    : 1;

  // Formateamos el número con ceros a la izquierda
  const formattedOrder = `INV-${nextOrderNumber.toString().padStart(3, "0")}`;

  console.log(formattedOrder); // Para verificar el resultado

  console.log(formattedInvoiceNumber);
  console.log(formattedOrder);

  // DATOS DEL PRODUCTO
  const productData = [
    {
      id_product: 1,
      name: "Backpack",
      quantity: 1,
      unit_price: 40,
    },
    {
      id_product: 2,
      name: "Pintura famosa",
      quantity: 1,
      unit_price: 1000,
    },
    {
      id_product: 3,
      name: "Laptopos",
      quantity: 26,
      unit_price: 3333,
    },
  ];

  // Crear la orden con detalles y factura en la base de datos.
  try {
    const newOrder = await prisma.order.create({
      data: {
        code: formattedOrder,
        type: "BUY", // SUBCRIPTION, BUY, REGRET
        total: amount,
        status: paid, // Sería comprobar si se setá procesando, enviando o llegando o completado
        paid: false, // Asume que el pedido inicialmente no está pagado
        id_user: Number(metadata.id),
        id_delivery_type: 1, // habría que ver como se determina cual es el 1
        discount: 0, // Sin descuento inicialmente
        OrderItem: {
          createMany: {
            data: productData,
          },
        },
        invoice: {
          create: [
            {
              invoice_n: formattedInvoiceNumber, //"INV-001"
              type: "A",
              amount: amount,
              id_payment_method: 1,
              state: "ok",
            },
          ],
        },
      },
      include: {
        OrderItem: true,
        invoice: true,
      },
    });

    console.log("Orden guardada:", newOrder);

    return newOrder;
  } catch (error) {
    console.error("Error guardando la orden en la base de datos:", error);
  }
}

// STRIPE
const stripe = new Stripe(
  "sk_test_51OxXxKRxuIsR3WCz8Ztm83HlPvRBwH4SqObd6cumXxEStd6ATzFwoxJ6bJPLoFkMQrHvuE9jFNE424RQ1TAfi8u100OvxLfAUr",
  {}
);
export async function stripePay(formdata: FormData) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "eur",
    description: "",

    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" },
  });

  return paymentIntent;
}

// export async function stripePay(formdata: FormData){
//     // Aquí se deben extraer los datos del formulario y asignarlos a las variables correspondientes
//     const {
//         cardHolderName,
//         cardNumber,
//         expirationMonth,
//         expirationYear,
//         cvc,
//         shippingMethod,
//         saveShippingInfo,
//         saveBillingInfo
//     } = formdata;

//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: 1099,
//         currency: "eur",
//         description: '',
//         // Aquí se pueden agregar los datos del formulario al objeto metadata
//         metadata: {
//             integration_check: "accept_a_payment",
//             cardHolderName,
//             cardNumber,
//             expirationMonth,
//             expirationYear,
//             cvc,
//             shippingMethod,
//             saveShippingInfo,
//             saveBillingInfo
//         },
//     });

//     return paymentIntent;
// }

// export async function stripePay(formdata: FormData){
//   // Aquí se deben extraer los datos del formulario y asignarlos a las variables correspondientes
//   const {
//       items,
//       user,
//       address,
//       shippingPrice,
//       payment
//   } = formdata;

//   const paymentIntent = await stripe.paymentIntents.create({
//       amount: items.reduce((acumulador, item) => {
//           return acumulador + item.unit_price * item.quantity;
//       }, 0) * 1.21 * 100, // Stripe requiere el monto en centavos
//       currency: "eur",
//       description: `Pedido de ${user.name}`,
//       // Aquí se pueden agregar los datos del formulario al objeto metadata
//       metadata: {
//           integration_check: "accept_a_payment",
//           email: user.email,
//           phone: user.phone,
//           address: `${address.name} ${address.number} ${address.letter ? 'letra: ' + address.letter : ''} ${address.staircase ? ', escalera: ' + address.staircase : ''} ${address.block ? ', bloque: ' + address.block : ''}`,
//           shippingPrice,
//           paymentMethod: payment[0].name,
//           cardLastFourDigits: payment[0].cardNumber.substring(payment[0].cardNumber.length - 4)
//       },
//   });

//   return paymentIntent;
// }

// EMAIL

import { EmailTemplate } from "@/components/contact/email-template";
import { Resend } from "resend";
import { revalidatePath } from "next/cache";
import { Address, CartItem } from "./definitions";
import { getUser } from "./data";

// export async function enviarEmail(formData: FormData) {
// const resend = new Resend(process.env.RESEND_API_KEY);

//   const firstName = formData.name ?? '';
//   const email = formData.email ?? '';
//   const text = formData.text ?? '';

//   try {
//     const emailContent = EmailTemplate({ firstName: firstName, email: text, text: text });

//     const formDataToSend = new FormData();
//     formDataToSend.append('name', firstName);
//     formDataToSend.append('email', email);
//     formDataToSend.append('text', text);

//     const data = await resend.emails.send({
//       from: 'Acme <onboarding@resend.dev>',
//       to: ["yakiiloop@gmail.com"],
//       subject: text,
//       react: emailContent,
//       text: ''
//     });

//     return { message: "Email enviado" };
//   } catch (error) {
//     return { mensaje: "Error al enviar: ", error };
//   }
// }
