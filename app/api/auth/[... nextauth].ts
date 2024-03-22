// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import { authConfig } from "@/auth.config"


// export default NextAuth({ providers: [ GoogleProvider({...authConfig
//     //   clientId: process.env.GOOGLE_CLIENT_ID as string,
//   //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//   }) ] })
  
  import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from '@/auth.config';
import { z } from 'zod';
import type { User } from '@/lib/definitions';
// import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { PrismaAdapter } from "@auth/prisma-adapter";

 
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
 
export const { auth, signIn, signOut  } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
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
          // const passwordsMatch = await bcrypt.compare(password, user.password);
          
          if (passwordsMatch){
            console.log(user);
            return user;
          } 
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});

// export const { auth,signIn, signOut } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   session: { strategy: "jwt" },
//   ...authConfig,
// })