"use server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

import { auth, signIn } from "../auth";
import { AuthError } from "next-auth";
import Stripe from "stripe";
import {
  UserRegisterFormSchema,
  addProductSchema,
  addVariantProductSchema,
  addressFormschema,
  addressSchema,
  editProductSchema,
  profileFormSchema,
} from "./schemas";
import { sleep } from "./utils";

// Gestión de usuarios

//Autenticación y Autorización

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
  const email = formData.get("email");
  const pass = formData.get("password");
  const obj = {
    email: email,
    password: pass,
    // Add other properties as needed
  };
  console.log(obj); //  { email: 'usuario@gmail.com', password: 'usuario' }

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

/**
 * Autenticar un usuario con Google
 * @param prevState
 * @param formData
 * @returns
 */
export async function signInGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}

/**
 * Registrar un usuario
 * @param formData
 * @returns
 */
export async function registerUser(
  values: z.infer<typeof UserRegisterFormSchema>
) {
  try {
    console.log(values);

    const newUser = await prisma.user.create({
      data: {
        name: values.first_name,
        email: values.email,
        password: values.password,
      },
    });
  } catch (error) {
    console.error("Error al añadir usuario:", error);
    throw error;
  }
  const obj = {
    email: values.email,
    password: values.password,
  };
  console.log(obj); //  { email: 'usuario@gmail.com', password: 'usuario' }

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

export async function createAddress(
  formData: z.infer<typeof addressFormschema>
) {
  try {
    const id_user = await getUserIDDB();
    if (!id_user) return;

    // const address = formData.get("address")?.toString();
    // const numberString = formData.get("number")?.toString();
    // if (numberString === undefined) return 0;
    // const number = parseInt(numberString);
    // const letter = formData.get("letter")?.toString();
    // const block = formData.get("block")?.toString();
    // const staircase = formData.get("staircase")?.toString();
    // const postalCode = formData.get("postalCode")?.toString();
    // const city = formData.get("city")?.toString();
    // const province = formData.get("province")?.toString();

    const {
      id,
      address,
      number,
      letter,
      block,
      staircase,
      postalCode,
      city,
      province,
    } = formData;

    try {
      addressSchema.parse(formData);
      console.log("Validación exitosa:", formData);
    } catch (e) {
      if (e instanceof z.ZodError) {
        console.error("Validación fallida:", e.errors);
      } else {
        console.error("Error Inesperado:", e);
      }
    }
    const count = await prisma.address.count({
      where: {
        users: {
          some: {
            id: id_user
          }
        }
      }
    });
    
    if(count >=5)
      throw Error('El usuario no puede tener más de 5 direcciónes guardadas')
    

    const provincias: { [nombre: string]: number } = {
      'Alava': 1,
      'Albacete': 2,
      'Alicante': 3,
      'Almeria': 4,
      'Asturias': 5,
      'Avila': 6,
      'Barcelona': 7,
      'Burgos': 8,
      'Cadiz': 9,
      'Cantabria': 10,
      'Castellon': 11,
      'Ciudad_real': 12,
      'Cordoba': 13,
      'Cuenca': 14,
      'Girona': 15,
      'Granada': 16,
      'Guadalajara': 17,
      'Guipuzcoa': 18,
      'Huelva': 19,
      'Huesca': 20,
      'Islas_baleares': 21,
      'Jaen': 22,
      'La_coruna': 23,
      'La_rioja': 24,
      'Las_palmas': 25,
      'Leon': 26,
      'Lerida': 27,
      'Lugo': 28,
      'Madrid': 29,
      'Malaga': 30,
      'Murcia': 31,
      'Navarra': 32,
      'Ourense': 33,
      'Palencia': 34,
      'Pontevedra': 35,
      'Salamanca': 36,
      'Segovia': 37,
      'Sevilla': 38,
      'Soria': 39,
      'Tarragona': 40,
      'Tenerife': 41,
      'Teruel': 42,
      'Toledo': 43,
      'Valencia': 44,
      'Valladolid': 45,
      'Vizcaya': 46,
      'Zamora': 47,
      'Zaragoza': 48
    };
    
    // Find or create the province
    let provinceRecord = await prisma.province.findUnique({
      where: {
        name: province,
      },
    });
    if (!provinceRecord) {
      provinceRecord = await prisma.province.create({
        data: {
          name: province,
          iso_code: String(provincias[province]), // Asegúrate de proporcionar el código ISO de la provincia
        },
      });
    }

    // Find or create the city
    let cityRecord = await prisma.city.findUnique({
      where: {
        name_id_province: {
          name: city,
          id_province: provinceRecord.id_province,
        },
      },
    });
    if (!cityRecord) {
      cityRecord = await prisma.city.create({
        data: {
          name: city,
          province: {
            connect: { id_province: provinceRecord.id_province },
          },
        },
      });
    }
    let newAddress
    if ((id === '0' || id==='')) {
//Crear
      // Create the address
      newAddress = await prisma.address.create({
        data: {
          name: address!,
          number: Number(number),
          letter: letter || undefined,
          block: Number(block) || undefined,
          staircase: staircase || undefined,
          city: {
            connect: { id: cityRecord.id },
          },
          postalcode: Number(postalCode)
        },
      });

      // Associate the address with the user
      await prisma.user.update({
        where: { id: id_user },
        data: {
          addresses: {
            connect: { id: newAddress.id },
          },
        },
      });
    } else {
      //Actualizar existente
      // newAddress = updateUserAddress();
    }

    console.log(
      `Dirección actualizada: ${address}, ${number}, ${letter},${staircase}, ${block},
      ${postalCode}, ${city}, ${province}
      `
    );
console.log(Number(number))
    revalidatePath("/dashboard/profile/dir");

    return newAddress;
  } catch (error) {
    console.error("Error al guardar la dirección:", error);
    console.log("Faltan datos obligatorios o son inválidos.");
  }
}

export async function deleteAddress(formData: FormData) {
  const id_address = formData.get('id')
  console.log(id_address)
  const deletedAddress = await prisma.address.delete({
    where: {
      id: Number(id_address)
    }
  });

  revalidatePath("/dashboard/profile/dir");

}

// todo revisar
export async function updateUserAddress(
  id_user: string,
  newAddress: string,
  id_city: number
): Promise<void> {
  const addresses = await prisma.user.findUnique({
    where: { id: id_user },
    include: { addresses: true },
  });

  if (addresses) {
    await prisma.address.update({
      where: {
        id_address: user.id_address,
      },
      data: {
        address: newAddress,
        id_city,
      },
    });
  } else {
    console.log("El usuario no tiene una dirección asociada.");
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

export async function guardarFacturación(formData: {
  name: string;
  email: string;
  text: string;
}) {}

// function updateUser(userId: string, updates: Partial<User>): User {

// function deleteUser(userId: string): void {

export async function updateUserEmail(formData: FormData) {
  try {
    const email = formData.get("email");
    const id = await getUserIDDB();

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
export async function updatePass(prevState: any, formData: FormData) {
  const actualPass = formData.get("actual-pass")?.toString();
  const newPass = formData.get("new-pass")?.toString();
  const newPassRepeat = formData.get("new-pass-repeat")?.toString();

  if (newPass !== newPassRepeat) {
    return { error: true, message: "Las contraseñas no coinciden" };
  }

  const user = await getUserLogged();

  if (!user) return { error: true, message: "No estás logueado" };

  // const valid = await bcrypt.compare(actualPass, user.password);

  // if (!valid) {
  //   throw new Error("Contraseña actual incorrecta");
  // }

  // const hashedPassword = await bcrypt.hash(newPass, 10);

  const valid = actualPass == user.password ? true : false;

  if (!valid) {
    return { error: true, message: "Contraseña incorrecta" };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { password: newPass },
  });

  return { error: false, message: "Contraseña actualizada con éxito" };
}

export async function updateProfile(prevState: any, formData: FormData) {
  try {
    const username = formData.get("username");
    const bio = formData.get("bio");

    // Transformamos los datos para asegurarnos de que sean cadenas
    const data = {
      username: username ? String(username) : undefined,
      bio: bio ? String(bio) : undefined,
    };
    console.log(data);

    const validatedData = profileFormSchema.parse({
      ...data,
    });

    console.log("Datos validados correctamente:", validatedData);

    const id = await getUserIDDB();
    const prevusername = await prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        username: true,
      },
    });
    if (prevusername?.username === validatedData.username)
      throw Error("Ya tienes este nombre de perfil");

    // Preparar los datos para la actualización
    const updateData = {
      username: validatedData.username,
      ...(validatedData.bio !== undefined && { bio: validatedData.bio }),
    };

    // Actualizamos el perfil del usuario en la base de datos
    const newUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: updateData,
    });

    revalidatePath("/dashboard");
    return { error: false, message: "Perfil Actualizado" };
  } catch (error) {
    console.log(error);
    if (error.message == "Ya tienes este nombre de perfil")
      return { error: true, message: error.message };

    return { error: true, message: "Error al actualizar el Perfil" };
  }
}

export async function eliminarDireccion(formData: {
  name: string;
  email: string;
  text: string;
}) {}

export async function eliminarFacturación(formData: {
  name: string;
  email: string;
  text: string;
}) {}

//Gestión de Productos

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
    const { name, price, description, material, category, state } =
      addProductSchema.parse(rawFormData);

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

export async function addVariantProduct(formData: FormData) {
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
            id: variant.size,
          },
        },
      },
    });

    revalidatePath("/admin/products");
    redirect(`/admin/products/edit/${rawFormData.id_product}`);
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

//updateProduct

/**
 * Actualizar un producto
 * @param prevState
 * @param formData
 * @returns
 */
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
    const { id, name, price, description, material, category, state } =
      editProductSchema.parse(rawFormData);

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

export async function editVariantProduct(formData: FormData) {
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

//Gestión de Carrito de Compras
//HOOK USECART
// function addToCart(userId: string, productId: string, quantity: number): void {

// function removeFromCart(userId: string, productId: string): void {

// function checkout(userId: string): Order {

//Gestión de Cupones y Descuentos
// function createCoupon(code: string, discount: number, expiryDate: Date): void {

// function applyCoupon(userId: string, couponCode: string): void {

// function removeCoupon(userId: string): void {

//Gestión de Pedidos
// ! Esto se debe ejecutar en el webHook una vez que el pago está completado

export async function addOrder(payment: Stripe.PaymentIntent) {
  console.log(payment);

  const amount = payment.amount;
  const metadata = payment.metadata;
  const paid = payment.status;

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

  console.log(formattedOrder);

  // DATOS DEL PRODUCTO
  const productData = [
    {
      id_product: 1,
      name: "Sandalia de verano",
      quantity: 1,
      unit_price: 40,
    },
    {
      id_product: 2,
      name: "Bota de montaña",
      quantity: 1,
      unit_price: 1000,
    },
    {
      id_product: 3,
      name: "Zapatilla deportiva",
      quantity: 26,
      unit_price: 3333,
    },
  ];

  // Crear la orden con detalles y factura en la base de datos.
  try {
    const newOrder = await prisma.order.create({
      data: {
        code: formattedOrder,
        total: amount,
        status: 'Procesando',  //paid, // Sería comprobar si se setá procesando, enviando o llegando o completado// 
        paid: false, // Asume que el pedido inicialmente no está pagado
        id_user: metadata.id,
        id_delivery_type: 1, // habría que ver como se determina cual es el 1
        OrderItem: {
          createMany: {
            data: productData,
          },
        },
        deliveryType: "EXPRESS",
        order_type: 'Compra',  // "Compra" "Devolución" "Subscripción"
        
      },
      include: {
        OrderItem: true,
      },
    });

    console.log("Orden guardada:", newOrder);

    return newOrder;
  } catch (error) {
    console.error("Error guardando la orden en la base de datos:", error);
  }

  //   id: 'pi_3PRJhFRxuIsR3WCz0iR6iGKf',
  //   object: 'payment_intent',
  //   amount: 2999,
  //   amount_capturable: 0,
  //   amount_details: { tip: {} },
  //   amount_received: 2999,
  //   application: null,
  //   application_fee_amount: null,
  //   automatic_payment_methods: { allow_redirects: 'always', enabled: true },
  //   canceled_at: null,
  //   cancellation_reason: null,
  //   capture_method: 'automatic_async',
  //   client_secret: 'pi_3PRJhFRxuIsR3WCz0iR6iGKf_secret_wJ5fUJhXJLAiurUwWjjLgBqIE',
  //   confirmation_method: 'automatic',
  //   created: 1718308353,
  //   currency: 'eur',
  //   customer: null,
  //   description: null,
  //   invoice: null,
  //   last_payment_error: null,
  //   latest_charge: 'ch_3PRJhFRxuIsR3WCz0ZEx48F5',
  //   livemode: false,
  //   metadata: {
  //     item1_price: '29.99',
  //     id: 'clxdjvfnu000013l603jqjyzb',
  //     item1_id: '0'
  //   },
  //   next_action: null,
  //   on_behalf_of: null,
  //   payment_method: 'pm_1PRJhPRxuIsR3WCzJFNaHcGy',
  //   payment_method_configuration_details: { id: 'pmc_1PI6fARxuIsR3WCz6oQtY9yE', parent: null },
  //   payment_method_options: {
  //     card: {
  //       installments: null,
  //       mandate_options: null,
  //       network: null,
  //       request_three_d_secure: 'automatic'
  //     },
  //     link: { persistent_token: null }
  //   },
  //   payment_method_types: [ 'card', 'link' ],
  //   processing: null,
  //   receipt_email: 'usuario@gmail.com',
  //   review: null,
  //   setup_future_usage: null,
  //   shipping: {
  //     address: {
  //       city: null,
  //       country: null,
  //       line1: null,
  //       line2: 'undefined',
  //       postal_code: 'undefined',
  //       state: null
  //     },
  //     carrier: null,
  //     name: 'Usuario',
  //     phone: null,
  //     tracking_number: null
  //   },
  //   source: null,
  //   statement_descriptor: null,
  //   statement_descriptor_suffix: null,
  //   status: 'succeeded',
  //   transfer_data: null,
  //   transfer_group: null
  // }
}


// function updateOrderStatus(orderId: string, status: OrderStatus): void {

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
//         description: ,
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
//           address: `${address.name} ${address.number} ${address.letter ? letra:  + address.letter : ''} ${address.staircase ? ', escalera: ' + address.staircase : ''} ${address.block ? ', bloque: ' + address.block : ''}`,
//           shippingPrice,
//           paymentMethod: payment[0].name,
//           cardLastFourDigits: payment[0].cardNumber.substring(payment[0].cardNumber.length - 4)
//       },
//   });

//   return paymentIntent;
// }

//Gestión de Envíos
// function scheduleDelivery(orderId: string): void {

// EMAIL
import { EmailTemplate } from "@/components/contact/email-template";
import { Resend } from "resend";
import { revalidatePath } from "next/cache";
import { Address, CartItem } from "./definitions";
import { getUserByEmail, getUserIDDB, getUserLogged } from "./data";
import { z } from "zod";
import { User } from "@prisma/client";

const EmailDataSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  text: z.string(),
});

export async function enviarEmail(prevState: any, formData: FormData) {
  const user = await getUserLogged()


  const resend = new Resend(process.env.RESEND_API_KEY);
  

  try {
    const { name, email, text } = EmailDataSchema.parse({
      name: user?.name,
      email: user?.email,
      text: formData.get("text"),
    });

    const emailContent = EmailTemplate({
      firstName: name,
      email: email,
      text: text,
    });

    await resend.emails.send({
      from: "Eh, un Comercio <onboarding@resend.dev>",
      to: ["yakiiloop@gmail.com"],
      subject: 'Atención al Cliente',
      react: emailContent,
      text: text,
    });

    await prisma.user.update({
      where: { id: user?.id },
      data: { ticket_send: true },
    });

    return { error: false, message: "Mensaje enviado con éxito" };
  } catch (error) {
    return { mensaje: "Error al enviar: ", error };
  }
}
