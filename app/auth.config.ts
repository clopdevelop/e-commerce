import type { NextAuthConfig, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { z } from 'zod';

import { PrismaAdapter } from "@auth/prisma-adapter"
import { getUser } from './lib/data';
import prisma from './lib/prisma';



export const authConfig: NextAuthConfig = {
    pages: {
      signIn: '/entrada',
      // signOut: '/auth/signout',
      // error: '/auth/error',
      // verifyRequest: '/auth/verify-request',
      newUser: '/registro'
    },
    callbacks: {
      authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user;
        const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
        if (isOnDashboard) {
          if (isLoggedIn) return true;
          return false; // Redirect unauthenticated users to login page
        } else if (isLoggedIn) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
        return true;
      },
      // async signIn({ user, account, profile }) {
      //   return true
      // },
      // async redirect({ url, baseUrl }) {
      //   return baseUrl + '/dashboard';
      // },
      jwt({ token, user }) {
        if ( user ) {
          token.data = user;
        }
  
        return token;
      },
  
      session({ session, token, user }) {
        session.user = token.data as any;
        return session;
      },
  
    },
    providers: [
      Credentials({
        async authorize(credentials: Partial<Record<string, unknown>>): Promise<User | null> {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);
  
          if (!parsedCredentials.success) {
            console.log('Error en el correo electrónico o en la contraseña');
            return null;
          }

          const { email, password } = parsedCredentials.data;
          const user = await getUser();
          if (!user) return null;
          const passwordsMatch = (password == user.password) ? true : false;
          // todo const passwordsMatch = await bcrypt.compare(password, user.password);
          // if( !bcryptjs.compareSync( password, user.password ) ) return null;

          if (!passwordsMatch) return null;

          const { password: pass, ...rest } = user;


          return {
            id: String(user.id),
            name: user.name,
            email: user.email,
          };
          // return rest;

        },
      })
      ,
      GoogleProvider({
        clientId: process.env.AUTH_GOOGLE_ID as string,
        clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
      })
      ,],
      trustHost: true,
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