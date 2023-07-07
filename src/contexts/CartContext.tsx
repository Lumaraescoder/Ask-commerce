import { Cart, Product } from "@/types/types";
import React, { createContext, useContext, useEffect, useState } from "react";


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

// Função utilitária para obter o valor do cookie pelo nome
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
  return null;
};

// Função utilitária para buscar os dados do carrinho
const fetchCartData = async (url: string) => {
  const userId = getCookie("userId");
  const res = await fetch(`${url}/${userId}`);
  const data = await res.json();
  console.log("res ->", res.url);
  console.log("data on fetchCartData ->", data);
  console.log("---------------------------------------------------------------------------")
  return data;
};


// Componente de provedor do contexto do carrinho
export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const userId = getCookie("userId");
        const url = `http://localhost:3333/cart/carts/user`;
        const data = await fetchCartData(url);
        console.log("data ->", data);
        console.log("userId", data.userId)
        console.log("url->", url);
        console.log("data ->", data);
        if (!data) {
          setCart(null);
        } else {
          setCart(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Adiciona essa chamada para buscar os dados do carrinho
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
  console.log("context", context);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

