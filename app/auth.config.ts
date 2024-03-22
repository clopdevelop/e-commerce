import type { NextAuthConfig } from 'next-auth';
 
import GoogleProvider from "next-auth/providers/google"

import Auth, { type AuthConfig } from "@auth/core"

export const authConfig: AuthConfig = {
  pages: {
    signIn: '/entrada',
    signOut: '/auth/signout',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    // newUser: '/auth/new-user'
  },  
  callbacks: {
    // authorized({ auth, request: { nextUrl } }) {
    //   console.log(auth)
    //   const isLoggedIn = !!auth?.user;
    //   const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
    //   if (isOnDashboard) {
    //     if (isLoggedIn) return true;
    //     return false; // Redirect unauthenticated users to login page
    //   } else if (isLoggedIn) {
    //     return Response.redirect(new URL('/dashboard', nextUrl));
    //   }
    //   return true;
    // },
  },
  providers: [ GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
  //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  }) ],
  // adapter: Adapter,
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


// const request = new Request("https://example.com")
// const response = await AuthHandler(request, authConfig)

// function AuthHandler(request: Request, authConfig: Auth.AuthConfig) {
//   throw new Error('Function not implemented.');
// }
