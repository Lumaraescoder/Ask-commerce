import React, { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

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

  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: categories, error } = useSWR(
    "https://fakestoreapi.com/products/categories",
    fetcher
  );

  const { data: products } = useSWR(
    `https://fakestoreapi.com/products/category/${selectedCategory}`,
    fetcher,
    { shouldRetryOnError: false, revalidateOnFocus: false }
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
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

      {/* {selectedCategory && (
        <div>
          <h2>Products in {selectedCategory}</h2>
          {products ? (
            <ul>
              {products.map((product: any) => (
                <li key={product.id}>{product.title}</li>
              ))}
            </ul>
          ) : (
            <div>Loading products...</div>
          )}
        </div>
      )} */}
    </nav>
  );
};

export default Submenu;