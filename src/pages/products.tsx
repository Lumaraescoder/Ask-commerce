// import Link from "next/link";

// export const getStaticProps = async () => {
//   const res = await fetch("https://fakestoreapi.com/products");
//   const data = await res.json();

//   return {
//     props:{ products: data }
//   }
// }

// const Products = ({ products }) => (
//   <div className="grid grid-cols-1 justify-center gap-8 mt-8 mb-8 mx-auto xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-4">
//     {products.map(product => (
//       <div className="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800" key={product.id}>
//         <div className="min-h-[6rem] px-4 py-2">
//           <h1 className="text-l font-bold text-gray-800 uppercase dark:text-white">{product.title}</h1>
//         </div>

//         <img className="object-cover w-full h-48 mt-2" src={product.image} alt={product.title} />

//         <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
//           <h1 className="text-lg font-bold text-white">{product.price}€</h1>
//           <Link href={`http://localhost:3000/products/${product.id}`}>
//             <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">More info</button>
//           </Link>
//         </div>
//       </div>
//      ))}
//   </div>
// );

// export default Products;