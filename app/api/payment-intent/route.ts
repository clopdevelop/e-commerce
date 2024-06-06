import { addOrder } from "@/lib/actionscommands";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-04-10",
  typescript: true,
});

const calculateOrderAmount = (items: any) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1500;
};

export async function POST(req: Request) {
  const body = await req.json();
  const { items, customer } = body;

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "No items provided" }, { status: 400 });
  }
  if (!customer || !customer.email || !customer.name || !customer.address) {
    return NextResponse.json(
      { error: "Información del usuario incompleta" },
      { status: 400 }
    );
  }

  const amount = items.reduce((total: any, item: { price: any; id: any }) => {
    if (!item.price) {
      throw new Error(`Item ${item.id} is missing a price`);
    }
    return total + item.price;
  }, 0);

  console.log(items);
  // { items: [ { id: 'xl-tshirt' } ] }
  const itemdata = items.reduce(
    (
      acc: { [x: string]: any },
      item: { id: any; price: any },
      index: number
    ) => {
      acc[`item${index + 1}_id`] = item.id;
      acc[`item${index + 1}_price`] = item.price;
      return acc;
    },
    {}
  );

  const metadata = { ...itemdata, id: customer.id };

  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      // metadata: metadata,
      // description: "Product name",
      // // payment_method: ID DEL PAYMENTMETHOD FRONTEND,
      // receipt_email: customer.email, // Email del cliente para el recibo
      // shipping: {
      //   name: customer.name,
      //   address: {
      //     line1: customer.address.line1, //e.g., street, PO Box, or company name
      //     line2: customer.address.line2, // (e.g., apartment, suite, unit, or building).
      //     city: customer.address.city,
      //     state: customer.address.state, //State, county, province, or region.
      //     postal_code: customer.address.postal_code,
      //   },
      //   phone: "+34 123 123 123" //Recipient phone (including extension).
      // },
      // // CON ESTO SOLO SE ACTUALIZA EL ESTADO PARA PODER CONFIRMARLO
      // // PARA CONFIRMARLO ⬇
      // // confirmation_method: 'manual'
      // confirm: true,
    });
    console.log(paymentIntent);
   
    // addOrder(paymentIntent);

    // "PAGO SATISFACTORIO"
    const data ={
      clientSecret: paymentIntent.client_secret,
    };
    return NextResponse.json(data)
  } catch (error) {
    // return error.raw.message
    return NextResponse.json(error.raw.message)
  }
}

export async function GET(req: Request, res: any) {
    // const intent = Fetch or create the PaymentIntent
    // const paymentIntent = await stripe.paymentIntents.create({

    // res.render('checkout', { client_secret: intent.client_secret });

}