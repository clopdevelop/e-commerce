import { addOrder } from "@/lib/actionscommands";
import { getUserLogged } from "@/lib/data";
import { getAddressSessionStorage } from "@/lib/sessionStorage";
import { Address } from "@prisma/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-04-10",
  typescript: true,
});


export async function POST(req: Request) {
  const customer = await getUserLogged();
  const address: Address = getAddressSessionStorage();
  console.log('a')
  const body = await req.json();

  const { items } = body;

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "No items provided" }, { status: 400 });
  }
  if (!customer || !customer.email || !customer.name) {
    return NextResponse.json(
      { error: "Información del usuario incompleta" },
      { status: 400 }
    );
  }
  console.log('a')

  
  const amount = items.reduce((acc: number, item: { unit_price: number; quantity: number; }) => acc + item.unit_price * item.quantity * 100, 0);
  console.log('a')

  console.log(items);
  // { items: [ { id: 'xl-tshirt' } ] }
  const itemdata = items.reduce((acc: { [x: string]: any; }, item: { id: any; unit_price: any; }, index: number) => {
    acc[`item${index + 1}_id`] = item.id;
    acc[`item${index + 1}_price`] = item.unit_price;
    return acc;
  }, {});

  const metadata = { ...itemdata, id: customer.id };
  console.log('a')
  // const metadata = { ...itemdata, id: customer.id };


  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      metadata: metadata,
      // description: "Product name",
      // // payment_method: ID DEL PAYMENTMETHOD FRONTEND,
      receipt_email: customer.email, // Email del cliente para el recibo
      shipping: {
        name: customer.name,
        address: {
          line1: address.name, //e.g., street, PO Box, or company name
          line2: String(address.number), // (e.g., apartment, suite, unit, or building).
          // city: address.,
          // state: address.state, //State, county, province, or region.
          postal_code: String(address.postalcode),
        },
        // phone: "+34 123 123 123" //Recipient phone (including extension).
      },
      // // CON ESTO SOLO SE ACTUALIZA EL ESTADO PARA PODER CONFIRMARLO
      // // PARA CONFIRMARLO ⬇
      // // confirmation_method: 'manual'
      // confirm: true,
      // return_url: "http://localhost:3000/catalogo", // Reemplaza con tu URL de retorno

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