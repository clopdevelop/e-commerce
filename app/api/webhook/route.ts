import addOrder from '@/lib/actionscommands';
import { headers } from 'next/headers';
import Stripe from 'stripe'

const stripeSecretKey: string = process.env.STRIPE_SECRET_KEY ?? '';

const stripe = new Stripe(stripeSecretKey) ?? ''

const endpointSecret = "whsec_qA8l7RPVLD3TX7K8FUoUS8cOnUHUjXZo"

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = headers();
  const sig = headersList.get("stripe-signature") ?? '';

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (error:any) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    })
  }

  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;

      //todo guardar en una base de datos
      await addOrder(checkoutSessionCompleted);

      console.log(
        "precio total: ",
        checkoutSessionCompleted.amount_total
      );

      console.log({ checkoutSessionCompleted });

      
      break;
    default:
      console.log(`Evento no manejado: ${event.type}`);
  }
    
   
    return new Response('Success!', {
      status: 200,
    })
  }