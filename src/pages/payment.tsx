import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";

const stripePromise = loadStripe(
  "pk_test_51NgTVbIl0xV6vIx6topedtQlEg7RMmgGJktv58NX59wP6UEZDn5ef2Yicqhd7hk4tCgFOQ7mHFvnvw38mvu9R9aN00cohwyg7J"
);

const Element: React.FC = () => {
  const cartData = useContext(CartContext);
  const stripe = useStripe(); // o que vai permitir interagir com o stripe
  const elements = useElements(); // o que vai permitir usar os components UI

  console.log(" cartdATA", cartData?.cart?.total);

  const handlePayment = async () => {
    if (!elements || !stripe) {
      return;
    }

    const cardElement = elements.getElement(CardElement); // instance for the card input element on your payment form

    if (!cardElement) {
      console.error("Card element not found");
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      //it communicates with Stripe to securely tokenize the card information provided by the customer and returns a result
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Payment method creation failed:", error);
    } else if (paymentMethod) {
      const response = await fetch("http://localhost:3333/cart/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: cartData?.cart?.total,
        }),
      });

      const responseData = await response.json();
      alert("Payment successful");
      console.log("Payment result:", responseData);
    }
  };

  return (
    <div
      style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}
    >
      <CardElement />
      <button
        className="margin-top: 220px px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors no-underline duration-300 bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
        onClick={handlePayment}
      >
        Submit Payment
      </button>
    </div>
  );
};

const Payment: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <Element />
    </Elements>
  );
};

export default Payment;
