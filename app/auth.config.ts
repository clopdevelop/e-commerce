import type { NextAuthConfig } from 'next-auth';

import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { z } from 'zod';
import { getUser } from './auth';

import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()


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
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        // token.id = profile.id;
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
    // Credentials({
    //   async authorize(credentials) {
    //     const parsedCredentials = z
    //       .object({ email: z.string().email(), password: z.string().min(6) })
    //       .safeParse(credentials);

    //     if (parsedCredentials.success) {
    //       const { email, password } = parsedCredentials.data;
    //       const user = await getUser(email);
    //       if (!user) return null;
    //       const passwordsMatch = (password == user.password) ? true : false;
    //       // todo const passwordsMatch = await bcrypt.compare(password, user.password);

    //       if (passwordsMatch) {
    //         return user;
    //       }
    //     }

    //     console.log('Invalid credentials');
    //     return null;
    //   },
    // })
    // ,
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    })
    ,],
  adapter: PrismaAdapter(prisma),
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

