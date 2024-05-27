import NextAuth from "next-auth";
import type { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { z } from "zod";
import { getUser, getUserByEmail } from "./lib/data";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/prisma";


const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/entrada",
    // signOut: '/auth/signout',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    newUser: "/registro",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
    // async signIn({ user, account, profile }) {
    //   return true
    // },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl + '/dashboard';
    // },
    jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name;
      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token };
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  experimental: {
    enableWebAuthn: true,
  },
  providers: [
    Credentials({
      async authorize(
        credentials: Partial<Record<string, unknown>>
      ): Promise<User | null> {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

          console.log(parsedCredentials)
        if (!parsedCredentials.success) {
          console.log("Error en el correo electrónico o en la contraseña");
          return null;
        }

        const { email, password } = parsedCredentials.data;
        const user = await getUserByEmail(email);
        if (!user) return null;
        const passwordsMatch = password == user.password ? true : false;
        // todo const passwordsMatch = await bcrypt.compare(password, user.password);
        // if( !bcryptjs.compareSync( password, user.password ) ) return null;

        console.log(passwordsMatch)
        if (!passwordsMatch) return null;

        const { password: pass, ...rest } = user;

        // console.log(user)
        // return {
        //   id: String(user.id),
        //   name: user.name,
        //   email: user.email,
        // };
        return rest;
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
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
  debug: process.env.NODE_ENV !== "production" ? true : false,
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
