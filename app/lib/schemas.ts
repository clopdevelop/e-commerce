import { z } from "zod";
  
  export const userSchema = z.object({
    id: z.number(),
    first_name: z.string().min(2, {
      message: "El nombre de usuario debe ser más largo",
    }),
    id_address: z.number(),
    postcode: z.string(),
    phone: z.string(),
    email: z.string().email("Introduce un email válido"),
    password: z.string().min(6, "La contraseña debe ser más larga"),
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

export const addProductSchema = z.object({
  code: z.string().nullable().optional(),
  name: z.string(),
  description: z.string().nullable().optional(),
  marca: z.number().nullable().optional(),
  provider: z.number().nullable().optional(),
  category: z.number().nullable().optional(),
  thumbnail: z.string().nullable().optional(),
  image: z.any(),
  price: z.number(),
  discount: z.number().nullable().optional(),
  stock: z.number(),
});
export const editProductSchema = z.object({
  id_product: z.number().optional(),
  code: z.string().nullable().optional(),
  name: z.string(),
  description: z.string().nullable().optional(),
  marca: z.number().nullable().optional(),
  provider: z.number().nullable().optional(),
  category: z.number().nullable().optional(),
  thumbnail: z.string().nullable().optional(),
  image: z.any(),
  price: z.number(),
  discount: z.number().nullable().optional(),
  stock: z.number(),
});
  
  export const cartDetailSchema = z.object({
    id_cart: z.number(),
    id_product: z.number(),
    quantity: z.number(),
  });

  export const responseSchema = z.object({
    //todo añadir los datos y sus tipos esperados
  })

  export const UserLogInFormSchema = userSchema.pick({
    email: true,
    password: true,
  });