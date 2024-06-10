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

export const addressFormschema = z.object({
  address: z.string({ required_error: 'La dirección no puede estar en blanco' })
    .min(1, { message: 'La dirección no puede estar en blanco' })
    .max(100, { message: 'La dirección no puede exceder los 100 caracteres' }),
  number: z.string({ required_error: 'El número no puede estar en blanco' })
    .min(1, { message: 'El número no puede estar en blanco' })
    .regex(/^\d+$/, { message: 'El número debe ser un número entero' }),
  letter: z.string()
  .max(1, { message: 'La letra debe ser un solo carácter' })
  .regex(/^[A-Za-z]$/, { message: 'La letra debe ser una sola letra' })
  .optional(),
  staircase: z.enum(['left', 'right', 'izquierda', 'derecha'])
    .optional(),
  block: z.union([
    z.string().regex(/^\d+$/, { message: 'El bloque debe ser un número positivo' }),
    z.number().int().positive({ message: 'El bloque debe ser un número positivo' })
  ]).optional(),
  postalCode: z.string({ required_error: 'El código postal no puede estar en blanco' })
    .regex(/^\d{5}$/, { message: 'El código postal debe tener exactamente 5 dígitos' }),
  shippingMethod: z.enum(["standard", "express", "premium"], { required_error: 'El método de envío es obligatorio' }),
  save: z.boolean()
    .optional()
});
  // number: z.number({ required_error: 'El número no puede estar en blanco' }).min(1, "El número debe ser mayor que 0"),
  // city: z.string({ required_error: 'La ciudad no puede estar en blanco' }),
  // province: z.string({ required_error: 'La provincia no puede estar en blanco' }),
// });

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



const ciudadesPorProvincia: { [key: string]: string[] } = {
  Alava: ["Vitoria-Gasteiz", "Llodio", "Amurrio"],
  Albacete: ["Albacete", "Hellín", "Villarrobledo"],
  Alicante: ["Alicante", "Elche", "Torrevieja"],
  Almeria: ["Almería", "Roquetas de Mar", "El Ejido"],
  Asturias: ["Oviedo", "Gijón", "Avilés"],
  Avila: ["Ávila", "Arévalo", "El Tiemblo"],
  Barcelona: ["Barcelona", "Hospitalet de Llobregat", "Badalona"],
  Burgos: ["Burgos", "Miranda de Ebro", "Aranda de Duero"],
  Cadiz: ["Cádiz", "Jerez de la Frontera", "Algeciras"],
  Cantabria: ["Santander", "Torrelavega", "Camargo"],
  Castellon: ["Castellón de la Plana", "Villarreal", "Benicàssim"],
  Ciudad_real: ["Ciudad Real", "Puertollano", "Tomelloso"],
  Cordoba: ["Córdoba", "Lucena", "Puente Genil"],
  Cuenca: ["Cuenca", "Tarancón", "San Clemente"],
  Girona: ["Gerona", "Lloret de Mar", "Figueras"],
  Granada: ["Granada", "Motril", "Almuñécar"],
  Guadalajara: ["Guadalajara", "Azuqueca de Henares", "Sigüenza"],
  Guipuzcoa: ["San Sebastián", "Irun", "Rentería"],
  Huelva: ["Huelva", "Isla Cristina", "Lepe"],
  Huesca: ["Huesca", "Monzón", "Fraga"],
  Islas_baleares: ["Palma de Mallorca", "Ibiza", "Manacor"],
  Jaen: ["Jaén", "Linares", "Úbeda"],
  La_coruna: ["La Coruña", "Santiago de Compostela", "Ferrol"],
  La_rioja: ["Logroño", "Calahorra", "Arnedo"],
  Las_palmas: ["Las Palmas de Gran Canaria", "Telde", "Santa Lucía de Tirajana"],
  Leon: ["León", "Ponferrada", "San Andrés del Rabanedo"],
  Lerida: ["Lérida", "Tárrega", "Balaguer"],
  Lugo: ["Lugo", "Villalba", "Monforte de Lemos"],
  Madrid: ["Madrid", "Móstoles", "Alcalá de Henares"],
  Malaga: ["Málaga", "Marbella", "Torremolinos"],
  Murcia: ["Murcia", "Cartagena", "Lorca"],
  Navarra: ["Pamplona", "Tudela", "Barañáin"],
  Ourense: ["Orense", "Pontevedra", "Vigo"],
  Palencia: ["Palencia", "Aguilar de Campoo", "Dueñas"],
  Pontevedra: ["Pontevedra", "Vigo", "Redondela"],
  Salamanca: ["Salamanca", "Béjar", "Ciudad Rodrigo"],
  Segovia: ["Segovia", "Cuéllar", "La Granja de San Ildefonso"],
  Sevilla: ["Sevilla", "Dos Hermanas", "Alcalá de Guadaíra"],
  Soria: ["Soria", "Almazán", "El Burgo de Osma"],
  Tarragona: ["Tarragona", "Reus", "El Vendrell"],
  Tenerife: ["Santa Cruz de Tenerife", "San Cristóbal de La Laguna", "Arona"],
  Teruel: ["Teruel", "Alcañiz", "Calamocha"],
  Toledo: ["Toledo", "Talavera de la Reina", "Illescas"],
  Valencia: ["Valencia", "Torrent", "Gandía"],
  Valladolid: ["Valladolid", "Medina del Campo", "Laguna de Duero"],
  Vizcaya: ["Bilbao", "Barakaldo", "Getxo"],
  Zamora: ["Zamora", "Benavente", "Toro"],
  Zaragoza: ["Zaragoza", "Calatayud", "Ejea de los Caballeros"]
};

// Definir el esquema de provincias y ciudades de manera explícita
const provinciaSchema = z.enum([
  "Alava", "Albacete", "Alicante", "Almeria", "Asturias", "Avila", "Barcelona",
  "Burgos", "Cadiz", "Cantabria", "Castellon", "Ciudad_real", "Cordoba", "Cuenca",
  "Girona", "Granada", "Guadalajara", "Guipuzcoa", "Huelva", "Huesca", "Islas_baleares",
  "Jaen", "La_coruna", "La_rioja", "Las_palmas", "Leon", "Lerida", "Lugo", "Madrid",
  "Malaga", "Murcia", "Navarra", "Ourense", "Palencia", "Pontevedra", "Salamanca",
  "Segovia", "Sevilla", "Soria", "Tarragona", "Tenerife", "Teruel", "Toledo", "Valencia",
  "Valladolid", "Vizcaya", "Zamora", "Zaragoza"
]);

const ciudadSchemaMap = {
  Alava: z.enum(["Vitoria-Gasteiz", "Llodio", "Amurrio"]),
  Albacete: z.enum(["Albacete", "Hellín", "Villarrobledo"]),
  Alicante: z.enum(["Alicante", "Elche", "Torrevieja"]),
  Almeria: z.enum(["Almería", "Roquetas de Mar", "El Ejido"]),
  Asturias: z.enum(["Oviedo", "Gijón", "Avilés"]),
  Avila: z.enum(["Ávila", "Arévalo", "El Tiemblo"]),
  Barcelona: z.enum(["Barcelona", "Hospitalet de Llobregat", "Badalona"]),
  Burgos: z.enum(["Burgos", "Miranda de Ebro", "Aranda de Duero"]),
  Cadiz: z.enum(["Cádiz", "Jerez de la Frontera", "Algeciras"]),
  Cantabria: z.enum(["Santander", "Torrelavega", "Camargo"]),
  Castellon: z.enum(["Castellón de la Plana", "Villarreal", "Benicàssim"]),
  Ciudad_real: z.enum(["Ciudad Real", "Puertollano", "Tomelloso"]),
  Cordoba: z.enum(["Córdoba", "Lucena", "Puente Genil"]),
  Cuenca: z.enum(["Cuenca", "Tarancón", "San Clemente"]),
  Girona: z.enum(["Gerona", "Lloret de Mar", "Figueras"]),
  Granada: z.enum(["Granada", "Motril", "Almuñécar"]),
  Guadalajara: z.enum(["Guadalajara", "Azuqueca de Henares", "Sigüenza"]),
  Guipuzcoa: z.enum(["San Sebastián", "Irun", "Rentería"]),
  Huelva: z.enum(["Huelva", "Isla Cristina", "Lepe"]),
  Huesca: z.enum(["Huesca", "Monzón", "Fraga"]),
  Islas_baleares: z.enum(["Palma de Mallorca", "Ibiza", "Manacor"]),
  Jaen: z.enum(["Jaén", "Linares", "Úbeda"]),
  La_coruna: z.enum(["La Coruña", "Santiago de Compostela", "Ferrol"]),
  La_rioja: z.enum(["Logroño", "Calahorra", "Arnedo"]),
  Las_palmas: z.enum(["Las Palmas de Gran Canaria", "Telde", "Santa Lucía de Tirajana"]),
  Leon: z.enum(["León", "Ponferrada", "San Andrés del Rabanedo"]),
  Lerida: z.enum(["Lérida", "Tárrega", "Balaguer"]),
  Lugo: z.enum(["Lugo", "Villalba", "Monforte de Lemos"]),
  Madrid: z.enum(["Madrid", "Móstoles", "Alcalá de Henares"]),
  Malaga: z.enum(["Málaga", "Marbella", "Torremolinos"]),
  Murcia: z.enum(["Murcia", "Cartagena", "Lorca"]),
  Navarra: z.enum(["Pamplona", "Tudela", "Barañáin"]),
  Ourense: z.enum(["Orense", "Pontevedra", "Vigo"]),
  Palencia: z.enum(["Palencia", "Aguilar de Campoo", "Dueñas"]),
  Pontevedra: z.enum(["Pontevedra", "Vigo", "Redondela"]),
  Salamanca: z.enum(["Salamanca", "Béjar", "Ciudad Rodrigo"]),
  Segovia: z.enum(["Segovia", "Cuéllar", "La Granja de San Ildefonso"]),
  Sevilla: z.enum(["Sevilla", "Dos Hermanas", "Alcalá de Guadaíra"]),
  Soria: z.enum(["Soria", "Almazán", "El Burgo de Osma"]),
  Tarragona: z.enum(["Tarragona", "Reus", "El Vendrell"]),
  Tenerife: z.enum(["Santa Cruz de Tenerife", "San Cristóbal de La Laguna", "Arona"]),
  Teruel: z.enum(["Teruel", "Alcañiz", "Calamocha"]),
  Toledo: z.enum(["Toledo", "Talavera de la Reina", "Illescas"]),
  Valencia: z.enum(["Valencia", "Torrent", "Gandía"]),
  Valladolid: z.enum(["Valladolid", "Medina del Campo", "Laguna de Duero"]),
  Vizcaya: z.enum(["Bilbao", "Barakaldo", "Getxo"]),
  Zamora: z.enum(["Zamora", "Benavente", "Toro"]),
  Zaragoza: z.enum(["Zaragoza", "Calatayud", "Ejea de los Caballeros"]),
};


export const addressSchema = z.object({
  address: z.string().nonempty(),
  number: z.number().int().positive(),
  letter: z.string().optional(),
  block: z.string().optional(),
  staircase: z.string().optional(),
  postalCode: z.string().nonempty(),
  city: z.string().nonempty(),
  province: provinciaSchema,
}).refine((data) => {
  const citySchema = ciudadSchemaMap[data.province];
  try {
    citySchema.parse(data.city);
    return true;
  } catch {
    return false;
  }
}, {
  message: "La ciudad no corresponde a la provincia indicada",
  path: ['city'],
});

// ! Deprecated addressschema
// export const addressSchema = z.object({
//   id_address: z.number().positive().refine(id => Number.isInteger(id), "El ID debe ser un número entero."),
//   id_city: z.number().positive().refine(id => Number.isInteger(id), "El ID debe ser un número entero."),
//   last_update: z.date(),
//   address: z.string().nonempty({ message: "La dirección es obligatoria" }),
//   number: z
//     .number({ invalid_type_error: "El número debe ser un valor numérico" })
//     .int()
//     .positive({ message: "El número debe ser mayor que cero" })
//     .optional(), // No es obligatorio en el formulario
//   letter: z.string().optional(),
//   staircase: z.enum(['left', 'right']).optional(),
//   block: z.string().optional(),
//   postalCode: z.string().regex(/^\d{5}$/, { message: "Código postal inválido" }), // Código postal de 5 dígitos
//   city: z.string().nonempty({ message: "La ciudad es obligatoria" }),
//   province: z.string().nonempty({ message: "La provincia es obligatoria" })
// });
