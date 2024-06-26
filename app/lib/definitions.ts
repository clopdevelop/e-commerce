// UTILS 
export type Connection<T> = {
  edges: Array<Edge<T>>;
}

export type Edge<T> = {
  node: T;
}

export enum ERROR_TYPES {
  NOT_FOUND,
  UNAUTHORIZED,
  FORBIDDEN
}

export const enum CATEGORIES {
  ELECTRONICS,
  CLOTHING,
  BOOKS,
  HOME,
  SPORTS,
  BEAUTY,
  TOYS,
  FOOD,
  HEALTH,
  AUTOMOTIVE
}

// USER
export type User = {
  id: number;
  name: string;
  username?: string;
  bio?: string;
  email: string;
  phone?: string | null;
  password?: string;
  address?: Address | null;
  id_address?: number | null;
  postcode?: string | null;
  created_at?: Date;
  Order?: Order[] | null;
}

export const enum PaymentMethodName {
  CARD,
  PAYPAL,
  APPLE
}

export type PaymentMethod = {
  id_p_method: number;
  payment_method: PaymentMethodName;
  Invoice: Invoice[];
}

export type Address = {
  // Assuming Address is another model not defined here. Properties would need to be filled in.
}

// PRODUCT
export type Product = {
  id: number;
  code?: string | null;
  name: string;
  description?: string | null;
  state?: string | null;
  price: number;
  created_at: Date;
  last_update?: Date | null;
  stock: number;
  provider?: Provider | null;
  id_provider?: number | null;
  category?: Category | null;
  id_category?: number | null;
  OrderItem?: OrderItem[];
  // images?: Connection<Image>;
  ProductImage?: Image[];
  thumbnail?: Image;
}
export type CartItem = {
  id: number;
  id_product: number;
  name: string;
  unit_price: number;
  quantity: number;
  thumbnail?: Image;
  color?: string;
  size?: number;
};
export type Image = {
  id: number;
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export type Category = {
  id_category: number;
  name: string;
  state?: string | null;
  Product: Product[];
}

export type Provider = {
  id_provider: number;
  cuit: string;
  name: string;
  address?: Address | null;
  id_address?: number | null;
  postcode: string;
  phone?: string | null;
  email: string;
  created_at: Date;
  products: Product[];
}

// CART


// ORDER
export type Order = {
  id: number;
  code?: string;
  type?: string;
  total: number;
  status: string;
  paid: boolean;
  created_at: Date;
  user?: User;
  id_user: number;
  // deliveryType: DeliveryType;
  delivery_type?: string;
  OrderItem?: OrderItem[];
  invoice?: Invoice[];
}

export type ShippingPrices = {
  standard: number;
  express: number;
  premium: number;
  international: number;
  subscribe: number;
};

export type DeliveryType = {
  id_delivery: number;
  delivery_type: string;
  Order: Order[];
}

const enum delivery_type {
  "Standar"
}

const enum Order_Type {
  "Subscripción",
  "Recogida",
  "Envío",
}

const enum Order_Status {
  "Pendiente",
  "Entregado",
  "Cancelado"
}

export type OrderItem = {
  id: number;
  quantity: number;
  unit_price: number;
  order: Order;
  id_order: number;
  product: Product;
  id_product: number;
}

// INVOICE
export type Invoice = {
  id_invoice: number;
  invoice_n: string;
  type: string;
  order: Order;
  id_order: number;
  created_at: Date;
  amount: number;
  state: string;
  paymentMethod: PaymentMethod;
  id_p_method: number;
}

