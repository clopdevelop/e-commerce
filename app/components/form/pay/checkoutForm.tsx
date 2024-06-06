"use client";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/shadcn";
import { useState, useEffect } from "react";


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

    //CONST ERROR, PAYMENTMETHOD = CREATE PAYMENT METHOD
    //TYPE: CARD
    //CARD: ELEMENTS.GET(CARD)

    // SI NO EXISTE EL ERROR
    // MOSTRAR EL PAYMENT METHOD
    // EL PAYMENT METHOD CONTIENE UN ID
    // TENDREMOS QUE ENVIAR EL ID AL BACKEND
    // Y EN EL HACER LA PETICIÓN A STRIPE
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: elements.getElement(PaymentElement),
    // });

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/?success=true",
        // receipt_email: 'correo electrónico',
      },
    });
  

    if (error) {
      setMessage("Error de confirmación de pago:");
    } else {
      setMessage("Pago confirmado exitosamente.");
    }

//-------------- OTRA FORMA
    // Trigger form validation and wallet collection
  // const {error: submitError} = await elements.submit();
  // if (submitError) {
  //   handleError(submitError);
  //   return;
  // }
  
     // Create the PaymentIntent and obtain clientSecret
  // const res = await fetch("/create-intent", {
  //   method: "POST",
  //   headers: {"Content-Type": "application/json"},
  // });

  // const {client_secret: clientSecret} = await res.json();

  // // Use the clientSecret and Elements instance to confirm the setup
  // const {error} = await stripe.confirmPayment({
  //   elements,
  //   clientSecret,
  //   confirmParams: {
  //     return_url: 'https://example.com/order/123/complete',
  //   },
  //   // Uncomment below if you only want redirect for redirect-based payments
  //   // redirect: "if_required",
  // });

  // if (error) {
  //   handleError(error);
  // }


    setIsLoading(false);



  };



  return (
          <form id="payment-form" data-secret="{{ client_secret }}" onSubmit={handleSubmit}>
            <PaymentElement
              id="payment-element"
            />
            <Button
              disabled={isLoading || !stripe || !elements}
              id="submit"
              className="my-4"
            >
              <span id="button-text">
                {isLoading ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  "Pay now"
                )}
              </span>
            </Button>
          </form>
  );
}
