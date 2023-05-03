import { CartContext } from "@/context/cart-context";
import Link from "next/link";
import { useContext } from "react";
import useSWR from "swr";

interface Products {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const getAllProducts = (url: string) => fetch(url).then((res) => res.json());

const Products = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useSWR("https://fakestoreapi.com/products", getAllProducts);

  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeFromCart,
  } = useContext(CartContext);

  if (error) {
    return <p>Error</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="flex justify-center mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-600 from-sky-400">
          Ask-Commerce
        </span>
      </h1>
      <div className="grid grid-cols-1 justify-center container gap-8 mt-8 mb-8 mx-auto xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product: Products) => (
          <div
            className="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
            key={product.id}
          >
            <div className="min-h-[6rem] px-4 py-2">
              <h1 className="text-l font-bold text-gray-800 uppercase dark:text-white">
                {product.title.slice(0, 25)}
              </h1>
            </div>

            <img
              className="object-cover w-full h-48 mt-2"
              src={product.image}
              alt={product.title}
            />

            <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
              <h1 className="text-lg font-bold text-white">{product.price}€</h1>
              <Link className="no-underline" href={`/products/${product.id}`}>
                <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors no-underline duration-300 bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
                  More info
                </button>
              </Link>
            </div>
            <div>
              <div className="flex items-center justify-center bg-gray-200">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold text-sm py-2 px-4 rounded-l">
                  -
                </button>
                <span className="m-3 text-lg">0</span>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold text-sm py-2 px-4 rounded-l">
                  +
                </button>
              </div>
              <div className="flex justify-center py-3 bg-gray-200">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold text-xs py-1 px-4 rounded inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-cart pr-2"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />{" "}
                  </svg>
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
