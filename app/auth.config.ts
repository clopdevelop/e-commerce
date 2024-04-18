import type { NextAuthConfig } from 'next-auth';

import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { z } from 'zod';

import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from '@prisma/client';
import { getUser } from './lib/data';
import prisma from './lib/prisma';



export const authConfig: NextAuthConfig = {
    pages: {
      signIn: '/entrada',
      // signOut: '/auth/signout',
      // error: '/auth/error',
      // verifyRequest: '/auth/verify-request',
      // newUser: '/auth/new-user'
    },
    callbacks: {
      authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user;
        const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
        if (isOnDashboard) {
          if (isLoggedIn) return true;
          return false;
        }
        return true;
      },
      async signIn({ user, account, profile }) {
        return true
      },
      async redirect({ url, baseUrl }) {
        return baseUrl + '/dashboard';
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        if (user) {
          token.id = user.id
        }
        return token
      },
      async session({ session, token, user }) {
        // Send properties to the client, like an access_token and user id from a provider.
        // session.accessToken = token.accessToken
        // session.user.id = token.id
  
        return session
      }
    },
    providers: [
      Credentials({
        async authorize(credentials,req) {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);
  
          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);
            if (!user) return null;
            const passwordsMatch = (password == user.password) ? true : false;
            // todo const passwordsMatch = await bcrypt.compare(password, user.password);
  
            if (passwordsMatch) {
              return user;
            }
          }
  
          console.log('Error en el correo electrónico o en la contraseña');
          return null;
        },
      })
      ,
      // Credentials({
      //   credentials: {
      //     username: { label: "Username" },
      //     password: { label: "Password", type: "password" },
      //   },
      //   async authorize({ request }) {
      //     const response = await fetch(request)
      //     if (!response.ok) return null
      //     return (await response.json()) ?? null
      //   },
      // }),
      GoogleProvider({
        clientId: process.env.AUTH_GOOGLE_ID as string,
        clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
      })
      ,],
    // adapter: PrismaAdapter(prisma),
    // basePath?: string, // La ruta base de los puntos de conexión de la API de Auth.js.
    // cookies?: Partial< CookiesOptions >,
    // events?: Partial< EventCallbacks >,
    // jwt?: Partial< JWTOptions >,
    // pages?: Partial< PagesOptions >, // si desea crear páginas personalizadas de inicio de sesión, cierre de sesión y error.
    // secret?: string | string[],
    // session?: {
    //   generateSessionToken: () => string,
    //   maxAge: number,
    //   strategy: "jwt" | "database",
    //   updateAge: number
    // };
  } satisfies NextAuthConfig;