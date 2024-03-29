import { z } from "zod";
  
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

  export const addressSchema = z.object({
    id_address: z.number(),
    address: z.string(),
    id_city: z.number(),
    last_update: z.date(),
  });
  
  export const citySchema = z.object({
    id_city: z.number(),
    city: z.string(),
    id_province: z.number(),
  });
  
  export const provinceSchema = z.object({
    id_province: z.number(),
    iso_code: z.string().max(2, "ISO code must be 2 characters."),
    province: z.string(),
    id_country: z.number(),
  });
  
  export const countrySchema = z.object({
    id_country: z.number(),
    iso_code: z.string().max(2, "ISO code must be 2 characters."),
    country: z.string(),
  });
  
  export const productSchema = z.object({
    id_product: z.number(),
    name: z.string(),
    description: z.string().optional().nullable(),
    price: z.number(),
  });
  
  export const cartDetailSchema = z.object({
    id_cart: z.number(),
    id_product: z.number(),
    quantity: z.number(),
  });
  

  export type User = {
    id_user: number;
    first_name: string;
    id_address?: number | null;
    postcode?: string | null;
    phone?: string | null;
    email: string;
    password: string;
    created_at: Date;
  };

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
    code: string | null;
    name: string;
    description: string | null;
    id_brand: number | null;
    id_provider: number | null;
    id_category: number | null;
    thumbnail: string | null;
    price: number;
    discount: number | null;
    created_at: any;
    last_update: any;
  }
  
  export type Cart = {
    id_cart: number;
    id_user: number;
    last_update: Date;
  };
  
  export type CartDetail = {
    id_cart: number;
    id_product: number;
    quantity: number;
  };
  

  export type Address = {
    id_address: number;
    address: string;
    id_city: number;
    last_update: Date;
  };
  
  export type City = {
    id_city: number;
    city: string;
    id_province: number;
  };
  
  export type Province = {
    id_province: number;
    iso_code: string;
    province: string;
    id_country: number;
  };
  
  export type Country = {
    id_country: number;
    iso_code: string;
    country: string;
  };
  
  export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
  }
  
