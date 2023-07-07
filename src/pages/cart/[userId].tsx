import { useCart } from "@/contexts/CartContext";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Cart } from "../../types/types";

interface CartPageProps {
  cart: Cart | null;
}

export const getServerSideProps: GetServerSideProps<CartPageProps> = async (context: GetServerSidePropsContext) => {
  const userId = context.req.cookies.userId; // Retrieve the user ID from the query parameters
  //console.log("userId ->", userId);
  
  try {
    const response = await fetch(`http://localhost:3333/cart/carts/user/${userId}`);
    const data = await response.json();
    //console.log("data ->", data);
    return {
      props: {
        cart: data,
      },
    };
  } catch (error) {
    console.error('Error fetching cart:', error);
    return {
      props: {
        cart: null,
      },
    };
  }
};

const Cart: React.FC = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
console.log("cart ->", cart);
  if(!cart) {
    return <div>No cart found for the user.</div>
  }
  return (
    <div>
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Ask-Commerce Shopping Cart</h1>
                <h2 className="font-semibold text-2xl">{cart.products?.length} Items</h2>
                {cart.products.map((product) => (
                  <div key={product.productId}>
                  <div className="flex mt-10 mb-5">
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                    Product Details
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                    {product.quantity}
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  {product.price}
                  </h3>
                </div>
                <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <img
                        className="h-24"
                        src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{product.title}</span>
                      <button onClick={() => removeFromCart(product.productId)} className="font-semibold text-left uppercase hover:text-red-500 text-gray-500 text-xs">
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <input
                      className="mx-2 border text-center w-8"
                      type="text"
                      value="1"
                      disabled
                    />
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    $400.00
                  </span>
                </div>
                </div>
                ))}
              <button onClick={clearCart}>Clear Cart</button>
            </div>
            </div>
          </div>
        </div>
      </div>
  );
};



export default Cart;
