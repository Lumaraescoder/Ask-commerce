import { Cart, Product } from "@/types/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import useCartData from "@/utils/useCartData";


interface CartContextData {
  cart: Cart | null;
  isLoading: boolean;
  error: any;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

// Crie o contexto do carrinho
const CartContext = createContext<CartContextData | undefined>(undefined);

// Função utilitária para buscar os dados do carrinho
const fetchCartData = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

// Componente de provedor do contexto do carrinho
export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  console.log(cart)
  useEffect(() => {
    const fetchData = async (userId: any) => {
      try {
        // const userId = cart?.userId; // Replace with the actual user ID
        const url = `http://localhost:4000/cart/carts/user/${userId}`;
        const data = await fetchCartData(url);
        //console.log("data l 36->", data)
        setCart(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData("");
  }, []);

  // Função para adicionar um produto ao carrinho
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      if (prevCart) {
        const existingProduct = prevCart.products.find((p) => p.productId === product.id.toString());
        if (existingProduct) {
          existingProduct.quantity += 1;
          existingProduct.price += product.price;
        } else {
          prevCart.products.push({
            productId: product.id.toString(),
            title: product.title,
            quantity: 1,
            price: product.price,
            _id: `${cart?._id}`, // Replace with a real ID if necessary
          });
        }
        prevCart.total += product.price;
        return { ...prevCart };
      } else {
        const newCart: Cart = {
          _id: `${cart?._id}`, // Replace with a real ID if necessary
          userId: `${cart?.userId}`, // Replace with the user ID
          products: [
            {
              productId: product.id.toString(),
              title: product.title,
              quantity: 1,
              price: product.price,
              _id: `${cart?._id}`, // Replace with a real ID if necessary
            },
          ],
          total: product.price,
        };
        return newCart;
      }
    });
  };

  // Função para remover um produto do carrinho
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      if (prevCart) {
        const updatedProducts = prevCart.products.filter((p) => p.productId !== productId);
        const updatedTotal = updatedProducts.reduce((total, p) => total + p.price * p.quantity, 0);

        return {
          ...prevCart,
          products: updatedProducts,
          total: updatedTotal,
        };
      } else {
        return null;
      }
    });
  };

  // Função para limpar o carrinho
  const clearCart = () => {
    setCart(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <CartContext.Provider value={{ cart, isLoading, error, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para acessar o contexto do carrinho
export const useCart = (): CartContextData => {
  const context = useContext(CartContext);
  //console.log("context", context);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

