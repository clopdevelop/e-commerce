import type { NextAuthConfig } from 'next-auth';
import { redirect } from 'next/navigation';
 
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
  },
  providers: [], 
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

