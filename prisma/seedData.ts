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
  type: string;
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
    name: "Laptop",
    description: "A high-performance laptop.",
    price: 1200.0,
    stock: 10,
    type: "shirts",
  },
  {
    name: "Smartphone",
    description: "A powerful smartphone with advanced features.",
    price: 800.0,
    stock: 20,
    type: "shirts",
  },
  {
    name: "T-shirt",
    description: "A comfortable cotton t-shirt.",
    price: 20.0,
    stock: 50,
    type: "shirts",
  },
  {
    name: "Bookshelf",
    description: "A sturdy wooden bookshelf for organizing your books.",
    price: 150.0,
    stock: 5,
    type: "shirts",
  },
  {
    name: "Running Shoes",
    description: "High-quality running shoes for athletes.",
    price: 100.0,
    stock: 30,
    type: "shirts",
  },
  {
    name: "Coffee Maker",
    description: "An automatic coffee maker for brewing delicious coffee.",
    price: 50.0,
    stock: 15,
    type: "shirts",
  },
  {
    name: "Garden Hose",
    description: "A durable garden hose for watering your plants.",
    price: 30.0,
    stock: 25,
    type: "shirts",
  },
  {
    name: "Dumbbells Set",
    description: "A set of adjustable dumbbells for strength training.",
    price: 200.0,
    stock: 8,
    type: "shirts",
  },
  {
    name: "Backpack",
    description: "A spacious backpack for carrying your essentials.",
    price: 40.0,
    stock: 40,
    type: "shirts",
  },
  {
    name: "Digital Camera",
    description: "A high-resolution digital camera for capturing memories.",
    price: 500.0,
    stock: 12,
    type: "shirts",
  },
];

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
