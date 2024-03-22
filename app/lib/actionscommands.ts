'use server'

import prisma from "@/lib/prisma"
import { redirect } from "next/navigation";

// import { signIn } from '@/auth';
import { auth } from '@/auth';
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

/**
 * Loguea a un usuario
 * @param formData 
 */
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

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await auth();
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