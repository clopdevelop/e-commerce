import NextAuth from 'next-auth';
import { authConfig } from './app/auth.config';

// Metodo directo
 export default NextAuth(authConfig).auth;


export const config = {
  matcher: ['/about/:path*', '/dashboard/:path*'],

};

