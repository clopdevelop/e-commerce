import { z } from "zod";


export type User = {
    id_user: number;
    first_name: string;
    id_address?: number | null;
    postcode?: string | null;
    phone?: string | null;
    email: string;
    password: string;
    created_at: Date;
  }
  

  
  export const userSchema = z.object({
    id: z.number(),
    first_name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    id_address: z.number(),
    postcode: z.string(),
    phone: z.string(),
    email: z.string().email("Must be a valid email."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(1, "La confirmación de la contraseña es obligatoria"),
    created_at: z.date(),
  });



  export type ProductDetail = {
    id_product: number;
    quantity: number;
    product: {
      name: string;
      description: string | null;
      price: number;
    };
  };
  
  export type CartProps = {
    products: ProductDetail[];
  };

  export type Product = {
    id_product: number;
    name: string;
    description: string | null;
    price: number;
  }