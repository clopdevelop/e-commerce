import { NextRequest, NextResponse } from 'next/server';

import Stripe from 'stripe'

// import { responseSchema } from '@/lib/schemas'


const stripeSecretKey: string = process.env.STRIPE_SECRET_KEY ?? '';

const stripe = new Stripe(stripeSecretKey) ?? '';

import { PaymentMethodName } from '@/lib/definitions';
import { PaymentMethod } from '@prisma/client';

// export async function POST(request: NextRequest) {
//     const {product, id_user} = await request.json();
//     console.log(product)
//     // const result = responseSchema.safeParse(product);
//     const session = await stripe.checkout.sessions.create({
//       metadata: {
//         // id_product: product,
//         id_product: product.id,
//         id_user: id_user
//       },
//       line_items: [{
//         price_data: {
//           currency: "eur",
//           product_data: {
//             name: product.name,
//           },
//           unit_amount: product.unit_price * 100,
//         },
//         // todo Añadir la cantidad de producto
//         quantity: 1,
//       }],
//       mode: "payment",
//     //   todo implementar lógica para el caso de exito y caso de cancelación
//       success_url: `http://localhost:3000/?success=true`,
//       cancel_url: `http://localhost:3000/?canceled=true`,
//     });
    
//     return NextResponse.json(session);
//   }

export async function POST(request: NextRequest) {
  const { product, id_user, payment_method_data }:{payment_method_data: PaymentMethod} = await request.json();

  // Validar los datos de entrada si es necesario

  try {
      let paymentIntent;

      switch (payment_method_data.name) {
          case PaymentMethodName.CARD.toString():
              paymentIntent = await stripe.paymentIntents.create({
                  amount: product.unit_price * 100,
                  currency: "eur",
                  description: `Compra de ${product.name}`,
                  payment_method_data: {
                    type: "acss_debit",
                    acss_debit: {
                        account_number: payment_method_data.cardNumber,
                        institution_number: payment_method_data.institution_number,
                        transit_number: payment_method_data.transit_number,
                    }
                },
                  metadata: {
                      id_product: product.id,
                      id_user: id_user
                  },
              });
              break;

          case PaymentMethodName.PAYPAL.toString():
              // Lógica para manejar el pago con PayPal
              break;

          case PaymentMethodName.APPLE.toString():
              // Lógica para manejar el pago con Apple Pay
              break;

          default:
              throw new Error("Método de pago no válido.");
      }

      // Aquí puedes manejar la respuesta de Stripe, por ejemplo, enviar un mensaje de éxito al cliente.
      return NextResponse.json({ success: true, paymentIntent });

  } catch (error) {
      // Manejar errores de Stripe
      console.error("Error al crear el pago:", error);
      // return NextResponse.error(new Error("Error al procesar el pago."));
      return NextResponse.error();
  }
}