import { z } from "zod";

// Esquema para campos opcionales y nulos
const optionalNullableString = z.string().nullable().optional();
const optionalNullableNumber = z.number().nullable().optional();

// Esquema para el código ISO
const isoCodeSchema = z.string()
  .length(2, "El código ISO debe tener 2 caracteres.")
  .refine(code => /^[A-Z]{2}$/.test(code), "El código ISO debe estar en mayúsculas.");

  
export const userSchema = z.object({
  id: z.number(),
  first_name: z.string({ required_error: 'Ingrese su nombre' } ).min(2, {
    message: "El nombre de usuario debe ser más largo",
  }),
  id_address: z.number(),
  postcode: z.string(),
  phone: z.string(),
  email: z.string({ required_error: 'Ingrese su email' }).email("Introduce un email válido"),
  password: z.string({ required_error: 'Ingrese su contraseña' }).min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string({ required_error: 'Repita su contraseña' }).min(1, "La confirmación de la contraseña es obligatoria"),
  created_at: z.date(),
});

export const addressSchema = z.object({
  id_address: z.number().positive().refine(id => Number.isInteger(id), "El ID debe ser un número entero."),
  id_city: z.number().positive().refine(id => Number.isInteger(id), "El ID debe ser un número entero."),
  last_update: z.date(),
  address: z.string().nonempty({ message: "La dirección es obligatoria" }),
  number: z
    .number({ invalid_type_error: "El número debe ser un valor numérico" })
    .int()
    .positive({ message: "El número debe ser mayor que cero" })
    .optional(), // No es obligatorio en el formulario
  letter: z.string().optional(),
  staircase: z.enum(['left', 'right']).optional(),
  block: z.string().optional(),
  postalCode: z.string().regex(/^\d{5}$/, { message: "Código postal inválido" }), // Código postal de 5 dígitos
  city: z.string().nonempty({ message: "La ciudad es obligatoria" }),
  province: z.string().nonempty({ message: "La provincia es obligatoria" })
});

export const addressFormschema = z.object({
  address: z.string({ required_error: 'La dirección no puede estar en blanco' }),
  // number: z.number({ required_error: 'El número no puede estar en blanco' }).min(1, "El número debe ser mayor que 0"),
  number: z.string({ required_error: 'El número no puede estar en blanco' }),
  letter: z.string().optional(),
  staircase: z.enum(['left', 'right']).optional(),
  block: z.number().min(1, "El bloque debe ser mayor que 0").optional(),
  // city: z.string({ required_error: 'La ciudad no puede estar en blanco' }),
  // province: z.string({ required_error: 'La provincia no puede estar en blanco' }),
  postalCode: z.string({ required_error: 'La código postal no puede estar en blanco' }),
  shippingMethod: z.enum(["standard", "express", "premium"]),
  save: z.boolean().optional()
});

export const citySchema = z.object({
  id_city: z.number().positive().refine(id => Number.isInteger(id), "El ID debe ser un número entero."),
  city: z.string().nonempty("El nombre de la ciudad no puede estar vacío."),
  id_province: z.number().positive().refine(id => Number.isInteger(id), "El ID debe ser un número entero."),
});

export const provinceSchema = z.object({
  id_province: z.number().positive().refine(id => Number.isInteger(id), "El ID debe ser un número entero."),
  iso_code: isoCodeSchema,
  province: z.string().nonempty("El nombre de la provincia no puede estar vacío."),
  id_country: z.number().positive().refine(id => Number.isInteger(id), "El ID debe ser un número entero."),
});

export const countrySchema = z.object({
  id_country: z.number().positive().refine(id => Number.isInteger(id), "El ID debe ser un número entero."),
  iso_code: isoCodeSchema,
  country: z.string().nonempty("El nombre del país no puede estar vacío."),
});

export const productSchema = z.object({
  id_product: z.number().positive().refine(id => Number.isInteger(id), "El ID debe ser un número entero."),
  code: optionalNullableString,
  name: z.string().nonempty("El nombre del producto no puede estar vacío."),
  description: optionalNullableString,
  marca: optionalNullableNumber,
  provider: optionalNullableNumber,
  category: optionalNullableNumber,
  thumbnail: optionalNullableString,
  price: z.number().nonnegative(),
  discount: optionalNullableNumber,
});

export const addProductSchema = z.object({
  name: z.string().nonempty("El nombre del producto no puede estar vacío."),
  description: z.string().nonempty("La descripción del producto no puede estar vacía."),
  price: z.number().nonnegative(),
  material: optionalNullableString,
  stock: optionalNullableNumber,
  color: optionalNullableString,
  size: optionalNullableNumber,
  category: z.string().nonempty("La categoría del producto no puede estar vacía."),
  state: z.string().nonempty("El estado del producto no puede estar vacío."),
  image: z.instanceof(File).optional(),
});

export const editProductSchema = addProductSchema.extend({
  id: optionalNullableNumber,
});

export const addVariantProductSchema = z.object({
  id_product: z.number().positive().refine(id => Number.isInteger(id), "El ID debe ser un número entero."),
  code: z.string().nonempty("El código del producto no puede estar vacío."),
  stock: z.number().nonnegative(),
  id_color: z.number().positive().refine(id => Number.isInteger(id), "El ID debe ser un número entero."),
  size: z.number().positive(),
});

export const cartDetailSchema = z.object({
  id_cart: z.number().positive().refine(id => Number.isInteger(id), "El ID debe ser un número entero."),
  id_product: z.number().positive().refine(id => Number.isInteger(id), "El ID debe ser un número entero."),
  quantity: z.number().positive(),
});

export const UserLogInFormSchema = userSchema.pick({
  email: true,
  password: true,
});

export const UserRegisterFormSchema = userSchema
  .pick({
    first_name: true,
    email: true,
    password: true,
    confirmPassword: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas deben coincidir",
    path: ["confirmPassword"],
  });

  // SETTING
export const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      }),
    )
    .optional(),
});
  
export const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  language: z.string({
    required_error: "Please select a language.",
  }),
  email: z.string({
    required_error: "Please select a language.",
  })
});

export const displayFormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark"], {
    required_error: "Please select a theme.",
  }),
  font: z.enum(["inter", "manrope", "system"], {
    invalid_type_error: "Select a font",
    required_error: "Please select a font.",
  }),
});

export const notificationsFormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
  mobile: z.boolean().default(false).optional(),
  communication_emails: z.boolean().default(false).optional(),
  social_emails: z.boolean().default(false).optional(),
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
});


export const formSchema = z.object({
  username: z
    .string({
      required_error: "Username is required.",
    })
    // You can use zod's built-in validation as normal
    .min(2, {
      message: "Username must be at least 2 characters.",
    }),

  password: z
    .string({
      required_error: "Password is required.",
    })
    // Use the "describe" method to set the label
    // If no label is set, the field name will be used
    // and un-camel-cased
    .describe("Your secure password")
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),

  favouriteNumber: z.coerce // When using numbers and dates, you must use coerce
    .number({
      invalid_type_error: "Favourite number must be a number.",
    })
    .min(1, {
      message: "Favourite number must be at least 1.",
    })
    .max(10, {
      message: "Favourite number must be at most 10.",
    })
    .default(5) // You can set a default value
    .optional(),

  acceptTerms: z
    .boolean()
    .describe("Accept terms and conditions.")
    .refine((value) => value, {
      message: "You must accept the terms and conditions.",
      path: ["acceptTerms"],
    }),

  // Date will show a date picker
  birthday: z.coerce.date().optional(),

  sendMeMails: z.boolean().optional(),

  // Enum will show a select
  color: z.enum(["red", "green", "blue"]),

  // Create sub-objects to create accordion sections
  address: z.object({
    street: z.string(),
    city: z.string(),
    zip: z.string(),
  }),
});