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
"use client";
import { AlertCircle, CheckCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/alert";

export function StripeMessage({type}:{type:string}) {
  return (
    <div className="flex justify-center">
      {type === "true" ? (
        <Alert
          variant="default"
          className="absolute top-10 z-50 bg-green-500 text-black w-50 animate-combo pointer-events-none"
        >
          <CheckCircle className="h-4 w-4" color="black" />
          <AlertTitle className="font-bold">Pedido Completado</AlertTitle>
          <AlertDescription>
            Todo ha salido bien. Gracias por su compra.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert
          variant="default"
          className="absolute top-10 z-50 bg-red-500 text-black w-50 animate-combo pointer-events-none"
        >
          <AlertCircle className="h-4 w-4" color="black" />
          <AlertTitle className="font-bold">Pedido Cancelado</AlertTitle>
          <AlertDescription>
            Hubo un problema con su compra. Por favor, inténtelo de nuevo.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
