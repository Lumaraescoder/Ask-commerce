import React, { useContext} from "react";
import useSWR from "swr";
import Link from "next/link";
import Cookies from "js-cookie";
import { ProductContext } from "@/contexts/ProductContext";

interface Products {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

const categoryToImages: Record<string, string[]> = {
  Eletronics: ['Eletronics.jpg', "Eletronics2.jpg", "Eletronics3.jpg", "Eletronics4.jpg", "Eletronics5.jpg"],
  Books: ['Book.jpg', 'Book2.jpg', 'Book3.jpg', 'Book4.jpg', 'Book5.jpg'],
  Clothing: ['Clothing.jpg', 'Clothing2.jpg', 'Clothing3.jpg', 'Clothing4.jpg', 'Clothing5.jpg'],
  Other: ['Others.jpg', 'Others2.jpg', 'Others3.jpg', 'Others4.jpg', 'Others5.jpg'],
};

export const getRandomImage = (category: string) => {
  if (typeof window === "undefined") {
    // Execution on the server (server-side rendering), do nothing
    return "";
  }

  const usedImagesJSON = localStorage.getItem(`used_images_${category}`);
  let usedImages = [];

  if (usedImagesJSON) {
    try {
      usedImages = JSON.parse(usedImagesJSON);
    } catch (error) {
      console.error("Error parsing usedImages JSON:", error);
    }
  }

  const availableImages = categoryToImages[category] || [];

  if (availableImages.length === 0) {
    // usar a imagem default se não houver imagens disponíveis para aquela categoria
    return "default.jpg";
  }

  if (usedImages.length >= availableImages.length) {
    // Todas as imagens da categoria foram utilizadas, reset à lista
    usedImages = [];
  }

  // filtrar as imagens que ainda não foram usadas
  const unusedImages = availableImages.filter((image) => !usedImages.includes(image));

  if (unusedImages.length === 0) {
    // todas as imagens da categoria foram usadas, usar a default
    return "default.jpg";
  }

  // Choose a randomly unused image
  const randomIndex = Math.floor(Math.random() * unusedImages.length);
  const randomImage = unusedImages[randomIndex];

  // push imagem usada para array de imagens usadas
  usedImages.push(randomImage);

  // armazenar as imagens usadas no local storage
  localStorage.setItem(`used_images_${category}`, JSON.stringify(usedImages));

  return randomImage;
};

const getAllProducts = (url: string) =>
  fetch(url).then((res) => res.json());

const Products: React.FC = () => {
  const { data, error, isLoading } = useSWR(
    //"https://fakestoreapi.com/products",
    "http://localhost:3333/products",
    getAllProducts
  );

  //console.log("Received data:", data);

  const { productData } = useContext(ProductContext);

  const filteredProducts = productData.length === 0 ? data : productData;

  //console.log("Filtered products:", filteredProducts);

  if (error) {
    return <p>Error</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="flex justify-center mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-600 from-sky-400"></span>
      </h1>
      <div className="grid grid-cols-1 justify-center container gap-8 mt-8 mb-8 mx-auto xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3 smallCards expandCards">
        {filteredProducts.map((product: Products) => (
          <div
            className="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
            key={product._id}
          >
            <div className="min-h-[6rem] px-4 py-2">
              <h1 className="text-l font-bold text-gray-800 uppercase dark:text-white">
                {product.title.slice(0, 25)}
              </h1>
            </div>

            <img
              className="object-cover w-full h-48 mt-2"
              src={`/images/${getRandomImage(product.category)}`}
              alt={product.title}
            />

            <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
              <h1 className="text-lg font-bold text-white">
                {product.price}€
              </h1>
              <Link href={`/products/${product._id}`} passHref>
                <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors no-underline duration-300 bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
                  Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;