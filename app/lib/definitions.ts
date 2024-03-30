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
  code: z.string().nullable().optional(),
  name: z.string(),
  description: z.string().nullable().optional(),
  marca: z.number().nullable().optional(),
  provider: z.number().nullable().optional(),
  category: z.number().nullable().optional(),
  thumbnail: z.string().nullable().optional(),
  price: z.number(),
  discount: z.number().nullable().optional(),
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
  
  enum OrderStatus {
    // Define aquí tus estados posibles, por ejemplo:
    PENDING = "PENDING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
  }
  
  enum InvoiceType {
    // Suponiendo que los tipos son "A" y "B"
    A = "A",
    B = "B",
  }
  
  export type Order = {
    id_order: number;
    id_user: number;
    user: User;
    deliveryType: DeliveryType;
    id_delivery: number;
    status: OrderStatus; // Usando el enum aquí
    paid: boolean;
    created_at: Date;
    orderDetails: OrderDetail[];
    invoice: Invoice[];
  }
  
  export type OrderDetail = {
    id_order: number;
    order: Order;
    product: Product;
    id_product: number;
    quantity: number;
    unit_price: number;
    discount: number;
  }
  
  export type DeliveryType = {
    id_delivery: number;
    delivery_type: string;
    Order: Order[];
  }
  
  export type Invoice = {
    id_invoice: number;
    invoice_n: string;
    type: InvoiceType; // Usando el enum aquí
    order: Order;
    id_order: number;
    created_at: Date;
    amount: number;
    paymentMethod: PaymentMethod;
    id_p_method: number;
  }
  
  export type PaymentMethod = {
    id_p_method: number;
    payment_method: string;
    Invoice: Invoice[];
  }
  
  
  export type Date = {
    id_date: number;
    date: Date; 
    d_number: number;
    d_name: string;
    m_number: number;
    m_name: string;
    trimester: number;
    year: number;
    holiday: boolean;
  };