"use client";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ClientPay from "@/components/form/data-client/ClientPay";
import CheckoutForm from "@/components/form/pay/checkoutForm";
import { Address, PaymentMethod, User } from "@prisma/client";

interface Props {
  user: User;
  address: Address | null;
  payment: PaymentMethod[] | null;
}
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
  { apiVersion: "2024-04-10" }
);

export default function StripeProvider({ user, address, payment }: Props) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        {

        items: [{ id: "xl-tshirt", price: 1000 }],
        customer: {
          name: "John Doe",
          email: "johndoe@example.com",
          address: {
            line1: "123 Main St",
            line2: "",
            city: "Anytown",
            state: "CA",
            postal_code: "12345",
            country: "US",
          },
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  type ThemeType = "stripe" | "night" | "flat" | undefined;

  interface Appearance {
    theme: ThemeType;
  }

  const appearance: Appearance = {
    theme: "stripe",
  };
  const options = {
    layout: {
      type: "",
      defaultCollapsed: false,
      business: "Tu Tienda",
    },
    clientSecret,
    appearance,
  };
  console.log(clientSecret);

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <ClientPay
            user={user}
            address={address}
            payment={payment}
          ></ClientPay>
          <CheckoutForm></CheckoutForm>
        </Elements>
      )}
    </>
  );
}
