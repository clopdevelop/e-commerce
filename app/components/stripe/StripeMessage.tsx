// "use client";

// import { useState, useEffect } from "react";
// import { useStripe } from "@stripe/react-stripe-js";

// export function StripeMessage() {
//   const stripe = useStripe();
//   const [message, setMessage] = useState("");

//   if (!stripe) {
//     return;
//   }

//   const clientSecret = new URLSearchParams(window.location.search).get(
//     "payment_intent_client_secret"
//   );

//   if (!clientSecret) {
//     return;
//   }

//   useEffect(() => {
//     if (clientSecret) {
//       stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//         switch (paymentIntent?.status) {
//           case "succeeded":
//             setMessage("¡Pago exitoso!");
//             break;
//           case "processing":
//             setMessage("Tu pago se está procesando.");
//             break;
//           case "requires_payment_method":
//             setMessage(
//               "Pago fallido. Intente nuevamente."
//             );
//             break;
//           default:
//             setMessage("Algo fue mal.");
//             break;
//         }
//       });
//     }
//   }, [stripe, clientSecret]);
//   return <>{message && <div id="payment-message">{message}</div>}</>;
// }
'use client';

export function StripeMessage() {
  return (
    <div>
      <h1>Client Component</h1>
    </div>
  );
}