import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import Products from "@/layouts/Products";
import Submenu from "@/components/SubMenu/SubMenu";
import { ProductProvider } from "../contexts/ProductContext";

const Index = () => {
  return (
    <Main meta={<Meta title="title" description="" />}>
      <ProductProvider>
        <Submenu />
        <Products />
      </ProductProvider>
    </Main>
  );
};

export default Index;
