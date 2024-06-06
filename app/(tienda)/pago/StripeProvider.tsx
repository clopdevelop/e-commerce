"use client";
import { useCart } from "@/context/CartProvider";
import { CartItem} from "@/lib/definitions";
import { loadFromLocalStorage } from "@/lib/localStorage";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import CheckoutForm from "@/components/form/pay/checkoutForm";
import { Address, User } from "@prisma/client";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
  { apiVersion: "2024-04-10" }
);

export default function StripeProvider() {
  const [clientSecret, setClientSecret] = useState(
    "pi_3PON8nRxuIsR3WCz1cHd4CGd_secret_KI5hi6PXl1pk3GkWE0GhjyGhY"
  );
  // const options = {
  //   mode: 'payment',
  //   currency: 'usd',
  //   amount: 1099,
  //   setup_future_usage: 'off_session',  //También debe pasar setup_future_usage al crear su PaymentIntent.
  //   paymentMethodTypes	: string[]
  // 	paymentMethodCreation	'manual' //Permite crear PaymentMethods a partir de la instancia de Elements mediante stripe.createPaymentMethod.	
  // payment_method_options	{us_bank_account: {verification_method: string}}	Opciones de verificación del método de pago. Acepta los mismos métodos de verificación que us_bank_accountIntenciones de pago.
  // };

  //Cualquiera de las opciones de elementos adicionales pasadas al crear el grupo Elements en el paso anterior también se deben pasar al crear PaymentIntent.

  // useEffect(() => {
  //   fetch("/api/checkout", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       items: [{ id: "xl-tshirt", price: 1000 }],
  //       customer: {
  //         id: "clwly2gxm0000hteqnutne391",
  //         name: "Usuario",
  //         email: "usuario@gmail.com",
  //         address: {
  //           line1: "123 Main St",
  //           line2: "",
  //           city: "Anytown",
  //           state: "CA",
  //           postal_code: "12345",
  //           country: "US",
  //         },
  //       },
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));
  // }, []);

  type ThemeType = "stripe" | "night" | "flat" | undefined;
  interface Appearance {
    theme: ThemeType;
  }
  const appearance: Appearance = {
    theme: "stripe",
  };
  const options = {
    layout: {
      business: "Tu Tienda",
    },
    clientSecret,
    appearance,
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      )}
    </>
  );
}
