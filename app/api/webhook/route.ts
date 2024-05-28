import {addOrder} from '@/lib/actionscommands';
// import { headers } from 'next/headers';
import { headers } from "next/headers";
import Stripe from "stripe";

const stripeSecretKey: string = process.env.STRIPE_SECRET_KEY ?? "";

const stripe = new Stripe(stripeSecretKey) ?? "";

const endpointSecret = "whsec_YC3GYnYa07HQ42Z8if0Vf1TrovCKZIJz"

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = headers();
  const sig = headersList.get("stripe-signature") ?? "";

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (error: any) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      addOrder(paymentIntent);

      console.log(`PaymentIntent status: ${paymentIntent.status}`);
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      console.log(
        `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
      );
      break;
    }
    case "charge.succeeded": {
      const charge = event.data.object;
      console.log(`Charge id: ${charge.id}`);
      break;
    }
    default: {
      console.warn(`Unhandled event type: ${event.type}`);
      break;
    }
  }


  return new Response("Success!", {
    status: 200,
  });
}
