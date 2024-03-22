import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
// import bcrypt from 'bcrypt';

import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/lib/definitions';
import prisma from '@/lib/prisma';

// Inicialización básica
// export const { handlers: { GET, POST } , auth } = NextAuth({...authConfig})

// Inicialización diferida (avanzada)
// export const { handlers:  { GET, POST }, auth } = NextAuth(req => {
//   if (req) {
//    console.log(req) // do something with the request
//   }
//   return { ...authConfig }
//  })

async function getUser(email: string): Promise<User | null> {
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
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [ 
    Credentials({
    async authorize(credentials) {
      const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string().min(6) })
        .safeParse(credentials);

      if (parsedCredentials.success) {
        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);
        if (!user) return null;
        const passwordsMatch = (password == user.password) ? true : false;
        // todo const passwordsMatch = await bcrypt.compare(password, user.password);
        
        if (passwordsMatch){
          console.log(user);
          return user;
        } 
      }

      console.log('Invalid credentials');
      return null;
    },
  })
  // ,
  // GoogleProvider({
  //   //   clientId: process.env.GOOGLE_CLIENT_ID as string,
  // //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  // })
  , ],
});
 