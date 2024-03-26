'use server'

import prisma from "@/lib/prisma"
import { redirect } from "next/navigation";

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';



/**
 * Añade un usuario
 * @param formData 
 * @returns 
 */
export async function addUser(formData : FormData){
    try {
        const firstName = formData.get('first_name');
        const email = formData.get('email');
        const password = formData.get('password');

        if (typeof firstName !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            throw new Error('Faltan datos obligatorios o son inválidos.');
        }

        const newUser = await prisma.user.create({
            data: {
                first_name: firstName,
                email: email,
                password: password,
                
            },
        });
        redirect('/')
    } catch (error) {
        console.error('Error al añadir usuario:', error);
        throw error;
    }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
    
  try {
    await signIn('credentials', formData);    
    
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

// export async function authenticate(
//     prevState: string | undefined,
//     formData: FormData,
//   ) {
//     try {
//       await signIn('credentials', formData);
//     } catch (error) {
//       if (error instanceof AuthError) {
//         switch (error.type) {
//           case 'CredentialsSignin':
//             return 'Invalid credentials.';
//           default:
//             return 'Something went wrong.';
//         }
//       }
//       throw error;
//     }
//   }
  
/**
 * añadir un producto al carrito
 * @param id_product 
 * @param name 
 * @param description 
 * @param price 
 * @returns 
 */
export async function addProductToCart(userId: number, id_product: number, quantity: number) {
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
export async function deleteProductToCart(userId: number, id_product: number, quantity: number) {
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
