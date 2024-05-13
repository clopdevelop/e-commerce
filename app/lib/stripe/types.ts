export type StripePrice = {
    id: string;
    object: 'price';
    active: boolean;
    currency: string;
    metadata: object;
    unit_amount: number;
    product: string;
  };
  
  export type StripeProduct = {
    id: string;
    object: 'product';
    active: boolean;
    name: string;
    description: string;
    images: string[];
    metadata: object;
  };
  
  export type StripeCustomer = {
    id: string;
    object: 'customer';
    address: object;
    email: string;
    name: string;
  };
  
  export type StripePaymentIntent = {
    id: string;
    object: 'payment_intent';
    amount: number;
    currency: string;
    status: string;
    payment_method_types: string[];
  };
  
  export type StripeCharge = {
    id: string;
    object: 'charge';
    amount: number;
    currency: string;
    status: string;
    customer: string;
    payment_intent: string;
  };
  