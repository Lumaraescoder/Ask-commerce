import { Product } from '@/types/types';
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';



interface ProductContextType {
  productData: Product[];
  setProductData: Dispatch<SetStateAction<Product[]>>;
}

export const ProductContext = createContext<ProductContextType>({
  productData: [],
  setProductData: () => {},
});

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [productData, setProductData] = useState<Product[]>([]);

  return (
    <ProductContext.Provider value={{ productData, setProductData }}>
      {children}
    </ProductContext.Provider>
  );
};