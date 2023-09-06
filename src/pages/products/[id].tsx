import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { getRandomImage } from "../../layouts/Products";
import Cookies from "js-cookie";

export async function getStaticPaths() {
  //const res = await fetch("https://fakestoreapi.com/products");
  const res = await fetch("http://localhost:3333/products/");
  const data = await res.json();

  const paths = data.map((product: any) => {
    //console.log("data", data);
    return {
      params: { id: product._id },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  //console.log("context --------->", context);
  const id = context.params.id;
  //console.log("id --------------->", id);
  //const res = await fetch("https://fakestoreapi.com/products/" + id);
  const res = await fetch(`http://localhost:3333/products/${id}`);
  const data = await res.json();

  //get category da data
  const category = data.category;
  // get imagem do cookie
  const storedImage = Cookies.get(`product_${category}`);
  let randomImage;
  // se houver imagem define-se a imagem a ser renderizada como essa imagem
  if (storedImage) {
    randomImage = storedImage;
  } else {
    randomImage = getRandomImage(category);
    // armazenar a imagem no cookie para a categoria
    Cookies.set(`product_${category}`, randomImage);
  }

  data.randomImage = randomImage;

  return {
    props: { product: data },
  };
}

const renderRating = (rating: { rate?: number }) => {
  if (!rating || typeof rating.rate !== "number" || isNaN(rating.rate)) {
    return <p>No rating available</p>; // Display a message if rating is not available
  }

  const starUrl = "https://www.svgrepo.com/show/444861/star.svg";
  const emptyStarUrl = "https://www.svgrepo.com/show/513120/star.svg";
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <img
        key={i}
        width="20px"
        src={i <= rating.rate ? starUrl : emptyStarUrl}
        alt={`star ${i}`}
        className="mr-1"
      />
    );
  }
  return <div className="flex">{stars}</div>;
};

const getSingleProduct = ({ product }: { product: any }) => {
  const addToCart = async (product: any) => {
    const userId = localStorage.getItem("userId");

    try {
      await fetch(`http://localhost:3333/cart/addCart/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          products: [
            {
              productId: product._id,
              title: product.title,
              quantity: 1,
              price: product.price,
            },
          ],
        }),
      });
      alert('Added successfully to cart');
    } catch (error) {
      console.error("Error adding product in cart:", error);
    }
  };

  return (
    <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
      <section className="border">
        <div className="relative mx-auto max-w-screen-xl p-5">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div className="gap-4 md:grid-cols-1">
              <img
                alt={product.title}
                //src={`../../images/${product.randomImage}`}
                src={`/images/${getRandomImage(product.category)}`}
                className="aspect-square w-full rounded-xl object-contain"
              />
            </div>
            <div className="sticky top-0">
              <div className="mt-8 flex justify-between">
                <div className="max-w-[35ch] space-y-2">
                  <h1 className="text-xl font-bold sm:text-2xl">
                    {product.title}
                  </h1>
                  <p className="text-base font-medium">{product.category}</p>
                  <p className="text-lg font-bold">{product.price}€</p>
                  <div className="flex items-center">
                    {renderRating(product.rating)}
                    <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      {product.rating && product.rating.count
                        ? `${product.rating.count} reviews`
                        : "No reviews available"}
                    </p>
                    <div className="flex ml-5">
                      <img
                        width="20px"
                        src="https://www.svgrepo.com/show/507917/archive.svg"
                        alt=""
                        className="mr-1 filter grayscale"
                      />
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {product.rating.count} reviews
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="prose max-w-none text-lg">
                  <p>{product.description}</p>
                </div>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors no-underline duration-300 bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};

export default getSingleProduct;
