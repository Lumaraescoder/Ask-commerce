import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import product from "next-seo/lib/jsonld/product";

export async function getStaticPaths() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  const paths = data.map((product) => {
    return {
      params: { id: product.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const res = await fetch("https://fakestoreapi.com/products/" + id);
  const data = await res.json();

  return {
    props: { product: data },
  };
}

const getSingleProduct = ({ product }) => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <section className="border">
      <div className="relative mx-auto max-w-screen-xl p-5">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="gap-4 md:grid-cols-1">
            <img
              alt="Les Paul"
              src={product.image}
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
                  {product.rating.rate < 2 && (
                    <div className="flex">
                    <img
                      width="20px"
                      src="https://www.svgrepo.com/show/444861/star.svg"
                      alt=""
                      className="mr-1"
                    />
                    <img
                      width="20px"
                      src="https://www.svgrepo.com/show/513120/star.svg"
                      alt=""
                      className="mr-1"
                    />
                    <img
                      width="20px"
                      src="https://www.svgrepo.com/show/513120/star.svg"
                      alt=""
                      className="mr-1"
                    />
                    <img
                      width="20px"
                      src="https://www.svgrepo.com/show/513120/star.svg"
                      alt=""
                      className="mr-1"
                    />
                    <img
                      width="20px"
                      src="https://www.svgrepo.com/show/513120/star.svg"
                      alt=""
                      className="mr-1"
                    />
                    </div>
                  )}
                 {product.rating.rate > 2 && product.rating.rate < 3 && (
                    <div className="flex">
                      <img
                        width="20px"
                        src="https://www.svgrepo.com/show/444861/star.svg"
                        alt=""
                        className="mr-1"
                      />
                      <img
                        width="20px"
                        src="https://www.svgrepo.com/show/444861/star.svg"
                        alt=""
                        className="mr-1"
                      />
                      <img
                      width="20px"
                      src="https://www.svgrepo.com/show/513120/star.svg"
                      alt=""
                      className="mr-1"
                    />
                    <img
                      width="20px"
                      src="https://www.svgrepo.com/show/513120/star.svg"
                      alt=""
                      className="mr-1"
                    />
                    <img
                      width="20px"
                      src="https://www.svgrepo.com/show/513120/star.svg"
                      alt=""
                      className="mr-1"
                    />
                    </div>
                  )}
                  {product.rating.rate > 3 && product.rating.rate < 4 && (
                   <div className="flex">
                      <img
                        width="20px"
                        src="https://www.svgrepo.com/show/444861/star.svg"
                        alt=""
                        className="mr-1"
                      />
                      <img
                        width="20px"
                        src="https://www.svgrepo.com/show/444861/star.svg"
                        alt=""
                        className="mr-1"
                      />
                      <img
                        width="20px"
                        src="https://www.svgrepo.com/show/444861/star.svg"
                        alt=""
                        className="mr-1"
                      />
                      <img
                      width="20px"
                      src="https://www.svgrepo.com/show/513120/star.svg"
                      alt=""
                      className="mr-1"
                    />
                    <img
                      width="20px"
                      src="https://www.svgrepo.com/show/513120/star.svg"
                      alt=""
                      className="mr-1"
                    />
                    </div>
                  )}
                  {product.rating.rate > 4 && product.rating.rate < 5 && (
                    <div className="flex">
                      <img
                        width="20px"
                        src="https://www.svgrepo.com/show/444861/star.svg"
                        alt=""
                        className="mr-1"
                      />
                      <img
                        width="20px"
                        src="https://www.svgrepo.com/show/444861/star.svg"
                        alt=""
                        className="mr-1"
                      />
                      <img
                        width="20px"
                        src="https://www.svgrepo.com/show/444861/star.svg"
                        alt=""
                        className="mr-1"
                      />
                      <img
                        width="20px"
                        src="https://www.svgrepo.com/show/444861/star.svg"
                        alt=""
                        className="mr-1"
                      />
                      <img
                      width="20px"
                      src="https://www.svgrepo.com/show/513120/star.svg"
                      alt=""
                      className="mr-1"
                    />
                    </div>
                  )}
                 {product.rating.rate >= 5 && (
                    <div className="flex">
                    <img
                      width="20px"
                      src="https://www.svgrepo.com/show/444861/star.svg"
                      alt=""
                      className="mr-1"
                    />
                    <img
                      width="20px"
                      src="https://www.svgrepo.com/show/444861/star.svg"
                      alt=""
                      className="mr-1"
                    />
                    <img
                      width="20px"
                      src="https://www.svgrepo.com/show/444861/star.svg"
                      alt=""
                      className="mr-1"
                    />
                    <img
                      width="20px"
                      src="https://www.svgrepo.com/show/444861/star.svg"
                      alt=""
                      className="mr-1"
                    />
                    <img
                      width="20px"
                      src="https://www.svgrepo.com/show/444861/star.svg"
                      alt=""
                      className="mr-1"
                    />
                  </div>
                  )}
                  <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {product.rating.rate} out of 5
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
          </div>
        </div>
      </div>
    </section>
  </Main>
);

export default getSingleProduct;
