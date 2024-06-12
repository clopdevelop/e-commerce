// sessionStorage.ts

import { z } from "zod";
import { addressFormschema } from "./schemas";

// Función para establecer el rol del usuario
export function setUserRole(role: string): void {
    sessionStorage.setItem('userRole', role);
  }
  
  // Función para recuperar el rol del usuario
  export function getUserRole(): string | null {
    return sessionStorage.getItem('userRole');
  }
  
  // Función para comprobar si el usuario es administrador
  export function isAdmin(): boolean {
    return sessionStorage.getItem('userRole') === 'admin';
  }
  
  // Función para limpiar el rol del usuario al cerrar sesión
  export function clearUserRole(): void {
    sessionStorage.removeItem('userRole');
  }
  
  
  export function saveAddressSessionStorage(items: z.infer<typeof addressFormschema>) {
    sessionStorage.setItem('address', JSON.stringify(items));
  }

  export function getAddressSessionStorage() {
    if (typeof sessionStorage !== 'undefined') {
      const savedAddress = sessionStorage.getItem('address') ?? "[]";
      // console.log("available");
      return JSON.parse(savedAddress);
    } else {
      // console.log("not available");
      return [];
    }
  }