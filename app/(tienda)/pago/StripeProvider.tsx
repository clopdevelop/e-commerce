"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import CheckoutForm from "@/components/form/pay/checkoutForm";
import {  Product, User } from "@prisma/client";
import { useCart } from "@/context/CartProvider";
import { loadAddressLocalStorage } from "@/lib/localStorage";

const address = loadAddressLocalStorage();
console.log(address)

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
//   { apiVersion: "2024-04-10" }
// );

export default function StripeProvider() {
  // const [clientSecret, setClientSecret] = useState(
  //   "pi_3PON8nRxuIsR3WCz1cHd4CGd_secret_KI5hi6PXl1pk3GkWE0GhjyGhY"
  // );
  // // const options = {
  // //   mode: 'payment',
  // //   currency: 'usd',
  // //   amount: 1099,
  // //   setup_future_usage: 'off_session',  //También debe pasar setup_future_usage al crear su PaymentIntent.
  // //   paymentMethodTypes	: string[]
  // // 	paymentMethodCreation	'manual' //Permite crear PaymentMethods a partir de la instancia de Elements mediante stripe.createPaymentMethod.	
  // // payment_method_options	{us_bank_account: {verification_method: string}}	Opciones de verificación del método de pago. Acepta los mismos métodos de verificación que us_bank_accountIntenciones de pago.
  // // };


  // type ThemeType = "stripe" | "night" | "flat" | undefined;
  // interface Appearance {
  //   theme: ThemeType;
  // }
  // const appearance: Appearance = {
  //   theme: "stripe",
  // };
  // const options = {
  //   layout: {
  //     business: "Tu Tienda",
  //   },
  //   clientSecret,
  //   appearance,
  // };
  // const {items: productInCart} = useCart()
  // const address = loadAddressLocalStorage();

  // useEffect(() => {
  //   fetch("/api/payment-intent", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       items: productInCart,
  //       amount: 100,
  //       customer: customer,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));
  // }, []);

  return (
    <>
      {/* {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      )} */}a
    </>
  );
}
