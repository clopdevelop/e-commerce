// interface SeedProduct {
//   name: string;
//   description: string;
//   images: string[];
//   price: number;
//   stock: number;
//   sizes: ValidSizes[];
//   slug: string;
//   tags: string[];
//   type: ValidTypes;
//   gender: 'men' | 'women' | 'kid' | 'unisex';
// }

interface SeedProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  id_category: number;
}

export type SeedImage = {
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  }
  

interface SeedUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  postcode: string;
  role: string;
  // role: 'admin' | 'user'
}

interface SeedOrder {
  code: string;
  type: string;
  total: number;
  status: string;
  id_user: number;
  id_delivery_type: number;
}

interface SeedOrderItem {
  quantity: number;
  unit_price: number;
  id_order: number;
  id_product: number;
}

type ValidSizes = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
type ValidTypes = "shirts" | "pants" | "hoodies" | "hats";

interface SeedData {
  users: SeedUser[];
  categories: { name: string }[];
  products: SeedProduct[];
  productImages: SeedImage[];
  deliveryTypes: { name: string }[];
  paymentMethods: { name: string }[];
  orders: SeedOrder[];
  orderItems: SeedOrderItem[];
}

const products = [
  {
    name: "Zapatos Casuales",
    description: "Zapatos casuales cómodos y elegantes.",
    price: 60.0,
    stock: 20,
    id_category: 1,
  },
  {
    name: "Zapatos Deportivos",
    description: "Zapatos deportivos duraderos y de alto rendimiento.",
    price: 80.0,
    stock: 30,
    id_category: 2,
  },
  {
    name: "Zapatos Deportivos Rojos",
    description: "Zapatos deportivos rojos, perfectos para correr.",
    price: 80.0,
    stock: 30,
    id_category: 2,
  },
  {
    name: "Zapatos Deportivos Azules",
    description: "Zapatos deportivos azules, ideales para el gimnasio.",
    price: 85.0,
    stock: 20,
    id_category: 2,
  },
  {
    name: "Zapatos Deportivos Verdes",
    description: "Zapatos deportivos verdes, excelentes para actividades al aire libre.",
    price: 90.0,
    stock: 25,
    id_category: 2,
  },
  {
    name: "Zapatos Deportivos Negros",
    description: "Zapatos deportivos negros, versátiles para cualquier actividad deportiva.",
    price: 95.0,
    stock: 15,
    id_category: 2,
  },
  {
    name: "Botas",
    description: "Botas robustas y resistentes para el aire libre.",
    price: 100.0,
    stock: 15,
    id_category: 3,
  },
  {
    name: "Sandalias",
    description: "Sandalias ligeras y transpirables para el verano.",
    price: 40.0,
    stock: 25,
    id_category: 4,
  },
  {
    name: "Zapatillas",
    description: "Zapatillas suaves y cómodas para estar en casa.",
    price: 30.0,
    stock: 35,
    id_category: 5,
  },
  {
    name: "Mocasines",
    description: "Mocasines clásicos para un look sofisticado.",
    price: 70.0,
    stock: 20,
    id_category: 6,
  },
  {
    name: "Zapatos de Trabajo",
    description: "Zapatos de trabajo seguros y cómodos.",
    price: 90.0,
    stock: 10,
    id_category: 7,
  },
];

const categories = [
  {
    name: "Casuales",
  },
  {
    name: "Deportivos",
  },
  {
    name: "Botas",
  },
  {
    name: "Sandalias",
  },
  {
    name: "Zapatillas",
  },
  {
    name: "Mocasines",
  },
  {
    name: "Trabajo"
  }
]
const productimages = [
    {
      url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1713685197/cld-sample-5.jpg",
    },
    {
      url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1713685197/cld-sample-5.jpg",
    },
    {
      url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1713685197/cld-sample-5.jpg",
    },
    {
      url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1713685197/cld-sample-5.jpg",
    },
    {
      url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1713685197/cld-sample-5.jpg",
    },
    {
      url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1713685197/cld-sample-5.jpg",
    },
    {
      url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1713685197/cld-sample-5.jpg",
    },
    {
      url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1713685197/cld-sample-5.jpg",
    },
    {
      url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1713685197/cld-sample-5.jpg",
    },
];



const users = [
  {
    name: "Usuario",
    email: "usuario@gmail.com",
    phone: "1234567890",
    password: "usuario",
    postcode: "12345",
    role: "admin",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "0987654321",
    password: "anothersecurepassword",
    postcode: "54321",
    role: "user",
  },
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "5556667777",
    password: "verysecurepassword",
    postcode: "67890",
    role: "user",
  },
];

const deliveryTypes = [
  {
    name: "Standard",
  },
  {
    name: "Express",
  },
  {
    name: "Next Day",
  },
];

const orders = [
  {
    code: "#000001",
    type: "Envío",
    total: 1200.0,
    status: "Pendiente",
    id_user: 1,
    id_delivery_type: 1,
  },
  {
    code: "#000002",
    type: "Envío",
    total: 800.0,
    status: "Procesado",
    id_user: 2,
    id_delivery_type: 2,
  },
  {
    code: "#000003",
    type: "Recogida",
    total: 150.0,
    status: "Enviado",
    id_user: 3,
    id_delivery_type: 3,
  },
];

const orderItems = [
  {
    quantity: 2,
    unit_price: 1200.0,
    id_order: 1,
    id_product: 1,
  },
  {
    quantity: 1,
    unit_price: 800.0,
    id_order: 2,
    id_product: 2,
  },
  {
    quantity: 3,
    unit_price: 150.0,
    id_order: 3,
    id_product: 3,
  },
];

const paymentMethods = [
  {
    name: "Tarjeta de crédito",
  },
  {
    name: "PayPal",
  },
  {
    name: "Transferencia bancaria",
  },
];

const invoices = [
  {
    invoice_n: "INV-001",
    type: "Venta",
    orderId: 1,
    amount: 1200.0,
    state: "Pagado",
    paymentMethodId: 1,
  },
  {
    invoice_n: "INV-002",
    type: "Venta",
    orderId: 2,
    amount: 800.0,
    state: "Pagado",
    paymentMethodId: 2,
  },
  {
    invoice_n: "INV-003",
    type: "Venta",
    orderId: 3,
    amount: 150.0,
    state: "Pendiente",
    paymentMethodId: 3,
  },
];

export const initialData: SeedData = {
  users: users,
  categories: categories,
  products: products,
  productImages: productimages,
  deliveryTypes: deliveryTypes,
  paymentMethods: paymentMethods,
  orders: orders,
  orderItems: orderItems,
  // invoices: invoices,
};
