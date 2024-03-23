import NextAuth from 'next-auth';
import { authConfig } from './app/auth.config';

// Metodo directo
 export default NextAuth(authConfig).auth;

//  Más personalización
// export default auth((req) => {
//   // req.auth
// })

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  matcher: ['/about/:path*', '/dashboard/:path*'],

};

export const { auth: middleware } = NextAuth(authConfig)

