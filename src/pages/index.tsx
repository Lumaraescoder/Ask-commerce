import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import Products from "@/layouts/Products";
import Submenu from "@/components/SubMenu/SubMenu";
import { ProductProvider } from "../contexts/ProductContext";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");

    if (userId !== null) {
      localStorage.setItem("userId", userId);
      const newUrl = window.location.href.split('?')[0]; // Remove o parâmetro da URL
      window.location.replace(newUrl as string);
    }
  }, []);

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
