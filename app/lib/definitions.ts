
export type User = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  password: string;
  address?: Address | null;
  id_address?: number | null;
  postcode?: string | null;
  created_at: Date;
  Order?: Order[] | null;
}

export type Product = {
  id: number;
  code?: string | null;
  name: string;
  description?: string | null;
  state?: string | null;
  price: number;
  discount?: number | null;
  created_at: Date;
  last_update?: Date | null;
  stock: number;
  provider?: Provider | null;
  id_provider?: number | null;
  category?: Category | null;
  id_category?: number | null;
  OrderItem?: OrderItem[];
  ProductImage?: ProductImage[];
}

export type ProductImage = {
  id: number;
  url: string;
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

export type Order = {
  id: number;
  code?: string;
  type?: string;
  total: number;
  status: string;
  paid: boolean;
  discount: number;
  created_at: Date;
  user?: User;
  id_user: number;
  // deliveryType: DeliveryType;
  delivery_type?: string;
  OrderItem?: OrderItem[];
  invoice?: Invoice[];
}

export type DeliveryType = {
  id_delivery: number;
  delivery_type: string;
  Order: Order[];
}

enum delivery_type {
  "Standar"
}

enum Order_Type {
  "Subscripción",
  "Recogida",
  "Envío",
}

enum Order_Status {
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

export type PaymentMethod = {
  id_p_method: number;
  payment_method: string;
  Invoice: Invoice[];
}

export type Address = {
  // Assuming Address is another model not defined here. Properties would need to be filled in.
}

export type CartItem = {
  id: number;
  id_product: number;
  name: string;
  unit_price: number;
  quantity: number;
  image: string;
};