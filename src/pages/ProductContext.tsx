import React, { createContext, useState } from 'react';

interface ProductContextType {
  productData: any[];
  setProductData: React.Dispatch<React.SetStateAction<any[]>>;
}

export const ProductContext = createContext<ProductContextType>({
  productData: [],
  setProductData: () => {},
});

export const ProductProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [productData, setProductData] = useState<any[]>([]);

  return (
    <ProductContext.Provider value={{ productData, setProductData}}>
      {children}
    </ProductContext.Provider>
  );
};
