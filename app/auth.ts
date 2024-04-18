import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
// import bcrypt from 'bcrypt';

import type { User } from '@/lib/definitions';
import prisma from '@/lib/prisma';

// Inicialización diferida (avanzada)
// export const { handlers:  { GET, POST }, auth } = NextAuth(req => {
//   if (req) {
//    console.log(req) // do something with the request
//   }
//   return { ...authConfig }
//  })

export async function getUser(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

//  Inicializacion básica:
export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  ...authConfig,
});
 