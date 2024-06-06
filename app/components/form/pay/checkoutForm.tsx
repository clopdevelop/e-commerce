import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Button } from "@/components/shadcn";
import { useState, useEffect } from "react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    //CONST ERROR, PAYMENTMETHOD = CREATE PAYMENT METHOD
    //TYPE: CARD
    //CARD: ELEMENTS.GET(CARD)

    //SI NO EXISTE EL ERROR
    //MOSTRAR EL PAYMENT METHOD
    // EL PAYMENT METHOD CONTIENE UN ID
    // TENDREMOS QUE ENVIAR EL ID AL BACKEND 
    //Y EN EL HACER LA PETICIÓN A STRIPE
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/?success=true",
        // receipt_email: 'correo electrónico',
      },
    });
    
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message!);
    } else {
      setMessage("An unexpected error occurred." + error.message!);
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    // layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <Button disabled={isLoading || !stripe || !elements} id="submit" className="my-4">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </Button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}