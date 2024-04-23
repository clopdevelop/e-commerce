"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import Stripe from "stripe";
import { addProductSchema, editProductSchema } from "./schemas";
import { sleep } from "./utils";

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
/**
 * Autenticar un usuario
 * @param prevState
 * @param formData
 * @returns
 */
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {

    await sleep(2);
    
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Success';


  } catch (error) {
    console.log(error);

    return 'CredentialsSignin'


  }
}

export async function signInGoogle(){
  await signIn("google");
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

import {v2 as cloudinary} from 'cloudinary';
import { writeFile, unlink } from "fs";
import path from "path";
          
cloudinary.config({ 
  cloud_name: 'denq9j9dq', 
  api_key: '135212156196912', 
  api_secret: process.env.CLOUDINARY_API_KEY
});

export async function addProduct(formData: FormData) {
  await sleep(3)
  try {
    // const rawFormData = Object.fromEntries(formData.entries());

    const rawFormData = {
      name: formData.get("name"),
      price: Number(formData.get("price")),
      description: formData.get("description"),
      stock: Number(formData.get("stock")),
      image: formData.get("image")
    };
    
    
    const { name, price, description, stock, image } = addProductSchema.parse(rawFormData)

    console.log(image);
    

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const filePath = path.join(process.cwd(), 'public', image.name)
    await writeFile(filePath, buffer, async (err) => {
      if (err) {
        console.error('Hubo un error al escribir el archivo:', err);
      } else {
        console.log('Archivo escrito con éxito');
      const cloud = await cloudinary.uploader.upload(filePath)

      await unlink(filePath,(err)=>{err ? console.log('Hubo un error al eliminar el archivo'):'';
      })

      if(cloud){
        await unlink(filePath,() => {return 0})
      }
  
      const newProduct = await prisma.product.create({
        data: {
          name: name,
          price: Number(price),
          description: description,
          stock: Number(stock),
          ProductImage: {
            create: {
              url: cloud.url
            }
          }
        },
      });
      }
    });
    
  } catch (err) {
    console.log(err);
  }
}

//todo Revalidar los datos
export async function editProduct(formData: FormData) {
  await sleep(3)
  try {
    const rawFormData = {
      id_product: Number(formData.get("id_product")),
      name: formData.get("name"),
      price: Number(formData.get("price")),
      description: formData.get("description"),
      stock: Number(formData.get("stock")),
    };

    const { id_product, name, price, description, stock } = editProductSchema.parse(rawFormData)

        const updatedProduct = await prisma.product.update({
          where: { id: id_product },
          data: {
            name: name,
            price: Number(price),
            description: description,
            stock: Number(stock),
          },
        });
      }catch(err){
        console.log(err);
      }
    }


// export async function addOrder(session: Stripe.Checkout.Session, lineItems: Stripe.LineItem[]) {
//   const { amount_total, status, metadata } = session;

//   if (!status || !amount_total || !metadata) {
//     console.error("Sesión incompleta: falta status o line_items");
//     return;
//   }


//   // Asume que siempre procesarás el primer line_item como el producto comprado
//   const item = lineItems[0];
//   console.log(metadata);

//   const id_product = Number(metadata?.product);
//   const quantity = item.quantity ?? 1;
//   const unit_price = item.price?.unit_amount ?? 0;


//   //todo En produccion se creará una secuencia cuando se migre a Postgree para crear un codigo de factura
//   const lastInvoice = await prisma.invoice.findFirst({
//     orderBy: {
//       id_invoice: 'desc',
//     },
//     select: {
//       invoice_n: true,
//     },
//   });

//   const nextInvoiceNumber = lastInvoice
//     ? parseInt(lastInvoice.invoice_n.replace('INV', '')) + 1
//     : 1;

//   const formattedInvoiceNumber = `INV${nextInvoiceNumber.toString().padStart(4, '0')}`;

//   // Crear la orden con detalles y factura en la base de datos.
//   try {
//     // const newOrder = await prisma.order.create({
//     //   data: {
//     //     id_user: Number(metadata.id_user),
//     //     delivery_type: "Standar",
//     //     status: status,
//     //     total: amount_total,
//     //     OrderItem: {
//     //       create: [{
//     //         id_product: 1,
//     //         quantity: quantity,
//     //         unit_price: unit_price,
//     //         // discount: 0,
//     //       }],
//     //     },
//     //     invoice: {
//     //       create: [
//     //         {
//     //           invoice_n: formattedInvoiceNumber,
//     //           type: "A",
//     //           amount: amount_total,
//     //           id_p_method: 1,
//     //           state: 'ok'
//     //         },
//     //       ],
//     //     },
//     //   },
//     //   include: {
//     //     OrderItem: true,
//     //     invoice: true,
//     //   },
//     // });
//     //TEST
//     const newOrder = await prisma.order.create({
//       data: {
//         total: 100.0, // Asume un total arbitrario
//         status: "Processing", // Estado inicial del pedido
//         paid: false, // Asume que el pedido inicialmente no está pagado
//         discount: 0, // Sin descuento inicialmente
//         // Asume que ya tienes un usuario con id 1
//         id_user: 1,
//         // Asume que ya tienes un tipo de entrega con id 1
//         delivery_type: "Standard",
//         OrderItem: {
//           create: [{
//             // Asume que ya tienes un producto con id 1
//             id_product: 1,
//             quantity: 2,
//             unit_price: 50.0,
//           }],
//         },
//         invoice: {
//           create: {
//             // Genera un número de factura único. Este es un ejemplo simple.
//             invoice_n: "INV-001",
//             type: "A",
//             amount: 100.0,
//             // Asume que ya tienes un método de pago con id 1
//             id_p_method: 1,
//             state: 'ok'
//           },
//         },
//       },
//       include: {
//         OrderItem: true,
//         invoice: true,
//       },
//     });

//     console.log("Orden guardada:", newOrder);

//     return newOrder;
//   } catch (error) {
//     console.error("Error guardando la orden en la base de datos:", error);
//   }
// }
// Todo despues de ejecutarse esta funcion se debe redireccionar
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
      where: { id:id_product },
    });
    return deletedProduct;
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
}

export async function deleteProductonClick(product:{id_product: number}) {
  const { id_product } = product;
  try {
    const deletedProduct = await prisma.product.delete({
      where: { id:id_product },
    });
    return deletedProduct;
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
}

import { EmailTemplate } from '@/components/contact/email-template';
import { Resend } from 'resend';


export async function enviarEmail(formData: { name: string; email: string; text: string; }) {
const resend = new Resend(process.env.RESEND_API_KEY);

  const firstName = formData.name ?? '';
  const email = formData.email ?? '';
  const text = formData.text ?? '';
  
  try {
    const emailContent = EmailTemplate({ firstName: firstName, email: text, text: text });
    
    const formDataToSend = new FormData();
    formDataToSend.append('name', firstName);
    formDataToSend.append('email', email);
    formDataToSend.append('text', text);
    
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ["yakiiloop@gmail.com"],
      subject: text,
      react: emailContent,
      text: ''
    });

    return { message: "Email enviado" };
  } catch (error) {
    return { mensaje: "Error al enviar: ", error };
  }
}
