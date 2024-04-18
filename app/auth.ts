import NextAuth from 'next-auth';
// import bcrypt from 'bcrypt';

import type { User } from '@/lib/definitions';
import { authConfig } from './auth.config';

// Inicialización diferida (avanzada)
// export const { handlers:  { GET, POST }, auth } = NextAuth(req => {
//   if (req) {
//    console.log(req) // do something with the request
//   }
//   return { ...authConfig }
//  })



//  Inicializacion básica:
export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  ...authConfig,
});
 