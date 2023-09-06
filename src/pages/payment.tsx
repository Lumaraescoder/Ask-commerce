import {
  useStripe,
  useElements,
  CardElement,
  Elements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CartContext } from "@/contexts/CartContext";
import { useContext, useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51NgTVbIl0xV6vIx6topedtQlEg7RMmgGJktv58NX59wP6UEZDn5ef2Yicqhd7hk4tCgFOQ7mHFvnvw38mvu9R9aN00cohwyg7J"
);

const Element: React.FC = () => {
  const cartData = useContext(CartContext);
  const stripe = useStripe(); // o que vai permitir interagir com o stripe
  const elements = useElements(); // o que vai permitir usar os components UI
  const [card, setCard] = useState('');

  console.log(" cartdATA", cartData?.cart?.total);

  const handleChange = (event: any) => {
    setCard(event.target.value);
  };

  const handlePayment = async () => {
    setCard(card);
    console.log("card", card);

    if (!elements || !stripe) {
      return;
    }


    const cardElement = elements.getElement(card); // instance for the card input element on your payment form

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

      <div className="max-w-md mx-auto bg-gray-100 shadow-md rounded-md overflow-hidden mt-16">
        <div className="bg-blue-600 text-white p-4 flex justify-between">
          <div className="font-bold text-lg">Credit Card</div>

          <div className="text-lg">
            <i className="fab fa-cc-visa"></i>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="card_number"
            >
              Card Number
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="card_number"
              type="text"
              placeholder="xxxx xxxx xxxx xxxx"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 flex justify-between">
            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="expiration_date"
              >
                Expiration Date
              </label>

              <input
                className="shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="expiration_date"
                type="text"
                placeholder="MM/YY"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="cvv"
              >
                CVV
              </label>

              <input
                className="shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="cvv"
                type="text"
                placeholder="XXX"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name_on_card"
            >
              Name on Card
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name_on_card"
              type="text"
              placeholder="John Doe"
            />
          </div>

          <button onClick={handlePayment} className="bg-blue-600 text-white py-2 px-4 rounded font-bold hover:bg-blue-700 focus:outline-none focus:shadow-outline">
            Save Card
          </button>
        </div>
      </div>
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
