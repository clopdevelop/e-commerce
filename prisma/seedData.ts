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
  id: number;
  name: string;
  description?: string;
  state?: string;
  price: number;
  discount?: number;
  material?: string;
  created_at: Date;
  last_update?: Date;
  id_category?: number;
}

interface SeedColor {
  id: number;
  name: string;
  variants: SeedProductVariant[];
}

interface SeedSize {
  id: number;
  value: number;
  variants: SeedProductVariant[];
}

interface SeedProductVariant {
  id: number;
  code: string;
  stock: number;
  productId: number;
  colorId: number;
  sizeId: number;
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

  
const colors = [
  {
    "id": 1,
    "name": "azul"
  },
  {
    "id": 2,
    "name": "marrón"
  },
  {
    "id": 3,
    "name": "negro"
  }
];

const sizes = [
  {
    "id": 1,
    "value": 42
  },
  {
    "id": 2,
    "value": 44
  },
  {
    "id": 3,
    "value": 43
  }
];

const productVariants = [
  {
    "id": 1,
    "code": "SNDL-001",
    "stock": 100,
    "productId": 1,
    "colorId": 1,
    "sizeId": 1
  },
  {
    "id": 2,
    "code": "BOTA-001",
    "stock": 50,
    "productId": 2,
    "colorId": 2,
    "sizeId": 2
  },
  {
    "id": 3,
    "code": "ZPTA-001",
    "stock": 200,
    "productId": 3,
    "colorId": 3,
    "sizeId": 3
  }
];

const products = [
  {
    "id": 1,
    "name": "Sandalia de verano",
    "description": "Sandalia de cuero azul",
    "state": "nuevo",
    "price": 29.99,
    "discount": 0.1,
    "material": "cuero",
    "created_at": new Date("2024-05-21T00:00:00.000Z"),
    "last_update": new Date("2024-05-21T00:00:00.000Z"),
    "id_category": 1
  },
  {
    "id": 2,
    "name": "Bota de montaña",
    "description": "Bota de montaña resistente",
    "state": "nuevo",
    "price": 79.99,
    "material": "cuero",
    "created_at": new Date("2024-05-21T00:00:00.000Z"),
    "id_category": 2
  },
  {
    "id": 3,
    "name": "Zapatilla deportiva",
    "description": "Zapatilla deportiva ligera",
    "state": "nuevo",
    "price": 59.99,
    "material": "tela",
    "created_at": new Date("2024-05-21T00:00:00.000Z"),
    "id_category": 3
  }
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
