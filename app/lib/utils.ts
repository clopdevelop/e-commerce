import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { CartItem } from "./definitions";
import ms from 'ms'

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return 'never'
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? '' : ' ago'
  }`
}

import { User } from "@/lib/definitions";
import { User as NextAuthUser } from 'next-auth';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const sleep = (seconds: number = 1) => {

  return new Promise( resolve => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000 );
  })


}

export function convertNextAuthUserToMyUser(nextAuthUser: NextAuthUser): User {
  return {
    id: parseInt(nextAuthUser.id || '0'),
    name: nextAuthUser.name || '',
    email: nextAuthUser.email || '',
    // Ajusta los demás campos según tus necesidades, o deja algunos como nulos si no están disponibles en nextAuth
    phone: null,
    password: 'null',
    address: null,
    id_address: null,
    postcode: null,
    created_at: new Date,
    Order: null,
  };
}