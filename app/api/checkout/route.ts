import { NextRequest, NextResponse } from 'next/server';

import Stripe from 'stripe'

const stripeSecretKey: string = process.env.STRIPE_SECRET_KEY ?? '';

const stripe = new Stripe(stripeSecretKey) ?? '';


export async function POST(request: NextRequest) {
    const {product, id_user} = await request.json();
    console.log(product)
    const session = await stripe.checkout.sessions.create({
      metadata: {
        id_product: product.id_product,
        id_user: id_user
      },
      line_items: [{
        price_data: {
          currency: "eur",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
        // todo Añadir la cantidad de producto
        quantity: 1,
      }],
      mode: "payment",
    //   todo implementar lógica para el caso de exito y caso de cancelación
      success_url: `http://localhost:3000/?success=true`,
      cancel_url: `http://localhost:3000/?canceled=true`,
    });
    
    return NextResponse.json(session);
  }