import { useCart } from "@/contexts/CartContext";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Cart } from "../../types/types";
import { ParsedUrlQuery } from "querystring";
import React, { useContext, useEffect} from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { CartContext } from "@/contexts/CartContext";



interface CartPageProps {
  cart: Cart | null;
}

interface CartPageParams extends ParsedUrlQuery {
  userId: string;
}

export const getServerSideProps: GetServerSideProps<
  CartPageProps,
  CartPageParams
> = async (context: GetServerSidePropsContext<CartPageParams>) => {
  const { userId } = context.params || {}; // Verifica se context.params é nulo e atribui um objeto vazio em caso afirmativo
  console.log("userId on [userId].tsx ->", userId);

  try {
    const response = await fetch(
      `https://ask-commerce-api.onrender.com/cart/carts/user/${userId}`
    );
    const data = await response.json();
    console.log('data ->', data)
    return {
      props: {
        cart: data,
      },
      
    };
  } catch (error) {
    console.error("Error fetching cart:", error);
    return {
      props: {
        cart: null,
      },
    };
  }
};





const CartPage: React.FC<CartPageProps> = ({ cart }) => {
  const {
    addToCart,
    removeFromCart,
    clearCart,
    setCart,
  } = useCart();
  const router = useRouter();
  const cartContext = useContext(CartContext);

  cartContext?.setCart(cart);
 


  useEffect(() => {
    // Atualiza o carrinho após a remoção de um produto
    if (cart) {
      const { productId } = router.query; // Extrai o productId da URL
      const removedProduct = cart.products.find(
        (product) => product?.productId === productId
      );
      if (removedProduct) {
        addToCart(removedProduct);
      }
    }
    console.log(cart);

  }, [cart, router.query]);

  const handleRemoveFromCart = async (productId?: string) => {
    if (!productId) {
      return;
    }

    try {
      await removeFromCart(productId);
      router.reload(); // Atualiza a página
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const handleIncreaseQuantity = async (productId?: string) => {
    if (!productId) {
      return;
    }

    try {
      const userId = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userId="))
        ?.split("=")[1];

      if (!userId) {
        // Caso o userId não seja encontrado nos cookies
        console.error("UserId not found in cookies");
        return;
      }

      await fetch(`https://ask-commerce-api.onrender.com/cart/addCart/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          products: [
            {
              productId,
              quantity: 1,
            },
          ],
        }),
      });

      router.reload(); // Atualiza a página
    } catch (error) {
      console.error("Error increasing product quantity in cart:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      setCart(null); // Define o carrinho como null localmente
      router.reload(); // Atualiza a página
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <div>
      
        <div className="container mx-auto mt-10">
          <div className="flex shadow-md my-10">
            <div className="w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">
                  Ask-Commerce Shopping Cart
                </h1>
                <h2 className="font-semibold text-2xl">
                  {cart?.products.length} Items
                </h2>
              </div>
              {cart?.products.map((product) => (
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
                          src={product?.image} 
                          alt={product?.title} 
                        />
                      </div>
                      <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm">
                          {product?.title}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center w-1/5">
                      <button
                        onClick={() =>
                          handleRemoveFromCart(product?.productId?.toString())
                        }
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
                        onClick={() =>
                          handleIncreaseQuantity(product?.productId?.toString())
                        }
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
              <div>Total: ${cart?.total}</div>
              <button
                onClick={handleClearCart}
                style={{ margin: "0 0 20px 0" }} className="font-semibold text-left uppercase hover:text-red-500 text-gray-500 text-xs"
              >
                Clear Cart
              </button>

              
                <Link href={`/payment`}>
                  <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors no-underline duration-300 bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
                      Pay
                  </button>
                </Link>
                        
            </div>
          </div>
        </div>
    </div>
  );
};

export default CartPage;
