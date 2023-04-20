import product from "next-seo/lib/jsonld/product";
import Link from "next/link";
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
  const { data: products, error, isLoading } = useSWR('https://fakestoreapi.com/products', getAllProducts);

  if (error) 
  return
      <p>Error</p>

  if (isLoading)
  return
      <p>Loading...</p>


  return (
    
  <div className="grid grid-cols-1 justify-center container gap-8 mt-8 mb-8 mx-auto xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3">
{products.map((product: Products) => (
        <div className="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800" key={product.id}>
        <div className="min-h-[6rem] px-4 py-2">
          <h1 className="text-l font-bold text-gray-800 uppercase dark:text-white">{product.title}</h1>
        </div>

        <img className="object-cover w-full h-48 mt-2" src={product.image} alt={product.title} />

        <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
          <h1 className="text-lg font-bold text-white">{product.price}€</h1>
          <Link href={`/products/${product.id}`}>
            <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">More info</button>
          </Link>
        </div>
      </div>
))}
  </div>
)};

export default Products;