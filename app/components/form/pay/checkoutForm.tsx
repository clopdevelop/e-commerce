"use client";
import {
  PaymentElement,
  useStripe,
  useElements,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/shadcn";
import { useState} from "react";
import { useCart } from "@/context/CartProvider";


export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!stripe || !elements) {
          // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://e-commerce-gamma-opal.vercel.app/catalogo?success=true",
        // receipt_email: 'correo electrónico',
      },
    });
  

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message!);
    } else {
      setMessage("An unexpected error occured.");
    }
 
    
    setIsLoading(false);
  };

  return (
          <form id="payment-form" onSubmit={handleSubmit}>
            {/* <LinkAuthenticationElement id="link-authentication-element"
            className="mb-6"
        // Access the email value like so:
        // onChange={(event) => {
        //  setEmail(event.value.email);
        // }}
        //
        // Prefill the email field like so:
        options={{defaultValues: {email: 'foo@bar.com'}}}
        /> */}
            <PaymentElement
              id="payment-element"
            />
            <div
            className=" flex justify-end">
            <Button
              disabled={isLoading || !stripe || !elements}
              id="submit"
              className="mt-6"
            >
              <span id="button-text">
                {isLoading ? (
                  <div className="spinner"></div>
                ) : (
                  // "Pagar"
                  "Hacer Pedido"
                )}
              </span>
            </Button>
            </div>
            {message && <div className="text-red-500 p-3" id="payment-message">{message}</div>}
          </form>
  );
}
