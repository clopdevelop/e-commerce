import NextAuth from 'next-auth';
import { authConfig } from './auth.config';


//  Inicializacion básica:
export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    ...authConfig
});
 