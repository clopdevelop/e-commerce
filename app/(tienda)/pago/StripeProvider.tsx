"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import CheckoutForm from "@/components/form/pay/checkoutForm";
import { useCart } from "@/context/CartProvider";


const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
  { apiVersion: "2024-04-10" }
);

export default function StripeProvider() {
  const [clientSecret, setClientSecret] = useState(""
  );


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
  const {items: productInCart} = useCart()

  useEffect(() => {
    fetch("/api/payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: productInCart,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [productInCart]);

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
