import React, { useContext } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ProductContext } from "@/pages/ProductContext";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const Submenu: React.FC = () => {
  const router = useRouter();
  const isHomeRoute = router.pathname === "/";

  if (!isHomeRoute) {
    return null;
  }

  const { setProductData } = useContext(ProductContext);

  const { data: categories, error } = useSWR(
    "https://fakestoreapi.com/products/categories",
    fetcher
  );

  const handleCategoryClick = async (category: string) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );
      const data = await response.json();
      setProductData(data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  if (error) {
    return <div>Error loading categories</div>;
  }

  return (
    <nav className="bg-gray-200">
      <ul className="flex justify-center">
        {categories &&
          categories.map((category: string, index: number) => (
            <li key={index} className="px-4 py-2">
              <button
                className="text-gray-700 hover:text-indigo-600 transition-colors duration-300"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Submenu;