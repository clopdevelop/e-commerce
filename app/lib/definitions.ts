
  

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
  
  export type CartProps = {
    products: ProductDetail[];
  };

  export type Product = {
    id_product: number;
    code: string | null;
    name: string;
    description: string | null;
    id_brand: number | null;
    id_provider: number | null;
    id_category: number | null;
    thumbnail: string | null;
    price: number;
    discount: number | null;
    created_at: any;
    last_update: any;
  }
  
  export type Cart = {
    id_cart: number;
    id_user: number;
    last_update: Date;
  };
  
  export type CartDetail = {
    id_cart: number;
    id_product: number;
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
  
  enum InvoiceType {
    // Suponiendo que los tipos son "A" y "B"
    A = "A",
    B = "B",
  }
  
  export type UserOrder= { amount: number | undefined; id_order: number; id_user: number; id_delivery: number; status: string; paid: boolean; created_at: any;    orderDetails: OrderDetail[];
  }


  export type Order = {
    id_order: number;
    id_user: number;
    user: User;
    deliveryType: DeliveryType;
    id_delivery: number;
    status: OrderStatus; 
    paid: boolean;
    created_at: Date;
    orderDetails: OrderDetail[];
    invoice: Invoice[];
  }
  
  export type OrderDetail = {
    id_order: number;
    order: Order;
    product: Product;
    id_product: number;
    quantity: number;
    unit_price: number;
    discount: number;
  }
  
  export type DeliveryType = {
    id_delivery: number;
    delivery_type: string;
    Order: Order[];
  }
  
  export type Invoice = {
    id_invoice: number;
    invoice_n: string;
    type: InvoiceType; // Usando el enum aquí
    order: Order;
    id_order: number;
    created_at: Date;
    amount: number;
    paymentMethod: PaymentMethod;
    id_p_method: number;
  }
  
  export type PaymentMethod = {
    id_p_method: number;
    payment_method: string;
    Invoice: Invoice[];
  }
  
  
  export type Date = {
    id_date: number;
    date: Date; 
    d_number: number;
    d_name: string;
    m_number: number;
    m_name: string;
    trimester: number;
    year: number;
    holiday: boolean;
  };