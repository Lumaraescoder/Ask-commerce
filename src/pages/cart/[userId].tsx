import { useCart, fetchCartData } from "@/contexts/CartContext";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Cart } from "../../types/types";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";
import router, { useRouter } from "next/router";

interface CartPageProps {
  cart: Cart | null;
}

interface CartPageParams extends ParsedUrlQuery {
  userId: string;
}

export const getServerSideProps: GetServerSideProps<CartPageProps, CartPageParams> = async (
  context: GetServerSidePropsContext<CartPageParams>
) => {
  const { userId } = context.params || {}; // Verifica se context.params é nulo e atribui um objeto vazio em caso afirmativo
  console.log("userId on [userId].tsx ->", userId);
  
  try {
    const response = await fetch(`http://localhost:3333/cart/carts/user/${userId}`);
    const data = await response.json();

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

const CartPage: React.FC<CartPageProps> = ({ cart }) => {
  const { addToCart, removeFromCart, clearCart, cart: currentCart, setCart } = useCart();
  const router = useRouter();

  if (!cart) {
    return <div>No cart found for the user.</div>;
  }

  useEffect(() => {
    // Atualiza o carrinho após a remoção de um produto
    if (cart) {
      const { productId } = router.query; // Extrai o productId da URL
      const removedProduct = cart.products.find((product) => product?.productId === productId);
      if (removedProduct) {
        addToCart(removedProduct);
      }
    }
  }, [cart, router.query]);

  const handleRemoveFromCart = async (productId?: string) => {
    if (!productId) {
      return;
    }
  
    try {
      await removeFromCart(productId);
      router.reload(); // Atualiza a página
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  return (
    <div>
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Ask-Commerce Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{cart.products.length} Items</h2>
            </div>
            {cart.products.map((product) => (
              <div key={product?.productId}>
                <div className="flex mt-10 mb-5">
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                    Product name
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                    Quantity
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                    Price
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
                      <span className="font-bold text-sm">{product?.title}</span>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                  <button
                        onClick={() => handleRemoveFromCart(product?.productId?.toString())}
                        className="font-semibold text-left uppercase hover:text-red-500 text-gray-500 text-xs"
                      >
                        -
                      </button>
                    <input
                      className="mx-2 border text-center w-8"
                      type="text"
                      value={product?.quantity}
                      disabled
                    />
                    <button
                        //onClick={() => handleRemoveFromCart(product.productId.toString())}
                        className="font-semibold text-left uppercase hover:text-red-500 text-gray-500 text-xs"
                      >
                        +
                      </button>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    ${product?.price}
                  </span>
                </div>
              </div>
            ))}
            <div>Total: ${cart.total}</div>
            <button
                        onClick={clearCart}
                        className="font-semibold text-left uppercase hover:text-red-500 text-gray-500 text-xs"
                      >
                        Clear Cart
                      </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;