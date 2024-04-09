
  

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
  

  export type Product = {
    id_product: number;
    code: string | null;
    name: string;
    description: string | null;
    state: string | null;
    id_brand: number | null;
    id_provider: number | null;
    id_category: number | null;
    price: number;
    discount: number | null;
    created_at: Date;
    last_update: Date | null; 
  };
  
  
  export type Cart = {
    id_cart: number;
    id_user: number;
    last_update: Date;
  };
  
  export type CartDetail = {
    id: number;
    id_product: number;
    name: string;
    unit_price: number;
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
    PENDING = "PENDING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
  }

  enum DeliveryTypes {
    Standard = 'Standard',
    Express = 'Express',
    Free = 'Free',
    InShop = 'InShop'
  }


  export type Order = {
    id_order: number;
    id_user: number;
    delivery_type: string;
    status: string;
    paid: boolean;
    created_at: Date;
    user?: string;
  };
  
  export type Invoice = {
    id_invoice: number;
    invoice_n: string;
    type: string;
    id_order: number;
    created_at: Date;
    amount: number;
    state: string;
    id_p_method: number;
    order: Order;
  };
  


  export type OrderDetail = {
    order: string;
    product: Product;
    id_product: number; 
    quantity: number;
    price: number;
    discount: number | null;
  };
  
  
  
  export type DeliveryType = {
    id_delivery: number;
    delivery_type: DeliveryTypes;
  }
  
  export type Category = {
    id_category: number;
    category: string;
    description?: string;
    state?: string;
    products: Product[];
  };

  export type PaymentMethod = {
    id_p_method: number;
    payment_method: string;
    Invoice: Invoice[];
  }
  