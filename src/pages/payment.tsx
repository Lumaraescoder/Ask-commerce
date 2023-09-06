import {
  useStripe,
  useElements,
  Elements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CartContext } from "@/contexts/CartContext";
import { useContext, useEffect, useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51NgTVbIl0xV6vIx6topedtQlEg7RMmgGJktv58NX59wP6UEZDn5ef2Yicqhd7hk4tCgFOQ7mHFvnvw38mvu9R9aN00cohwyg7J"
);

const CheckoutForm: React.FC = () => {
  const stripe = useStripe(); // o que vai permitir interagir com o stripe
  const elements = useElements(); // o que vai permitir usar os components UI
  const [isProcessing, setIsProcessing] = useState(false);


  const handlePayment = async () => {

    if (!elements || !stripe) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      //it communicates with Stripe to securely tokenize the card information provided by the customer and returns a result
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment`
      }
    });

    if (error) {
      console.error("Payment method creation failed:", error);
    } 
  };

  return (
    <div
      style={{marginTop: "50px", display: "flex", alignItems: "center", flexDirection: "column"}}
    >

      <h1 className="text-blue-700 px-3 py-5 text-md font-medium">CARD DETAILS</h1>

      <PaymentElement />
      
      <button
        disabled={isProcessing}
        style={{marginTop: "20px"}}
        className="margin-top: 220px px-2 py-4 text-xs font-semibold text-blue-700 uppercase transition-colors no-underline duration-300 bg-white rounded hover:bg-blue-300 focus:bg-blue-400 focus:outline-none"
        onClick={handlePayment}
      >
        Submit Payment
      </button>

      
    </div>
  );
};

const Payment: React.FC = () => {

  const [clientSecret, setClientSecret] = useState("");
  const cartData = useContext(CartContext);

  useEffect(() => {

    fetch("http://localhost:3333/cart/payment", {
      method: "POST",
      body: JSON.stringify({
        amount: cartData?.cart?.total
      }), 
    }).then(async (r) => {
      const {clientSecret} = await r.json();
      
      setClientSecret(clientSecret);
    })
  }, [cartData?.cart?.total]);

  return (
    <>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{clientSecret}}>
        <CheckoutForm />
      </Elements>
      )}
    </>
  );
};

export default Payment;
