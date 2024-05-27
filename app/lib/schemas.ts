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
  name: z.string(),
  description: z.string(),
  price: z.number(),
  material: z.string().optional(),
  stock: z.number().optional(),
  color: z.string().optional(),
  size: z.number().optional(),
  category: z.string(),
  state: z.string(),
  image: z.instanceof(File).optional(),
});

export const editProductSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  material: z.string().optional(),
  stock: z.number().optional(),
  color: z.string().optional(),
  size: z.number().optional(),
  category: z.string(),
  state: z.string(),
  image: z.instanceof(File).optional(),
});

export const addVariantProductSchema = z.object({
  id_product: z.number(),
  code: z.string(),
  stock: z.number(),
  id_color: z.number(),
  size: z.number(),
});
  
  export const cartDetailSchema = z.object({
    id_cart: z.number(),
    id_product: z.number(),
    quantity: z.number(),
  });

  export const UserLogInFormSchema = userSchema.pick({
    email: true,
    password: true,
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