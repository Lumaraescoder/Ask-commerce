import { Cart, CartProduct } from "@/types/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface CartContextData {
  cart: Cart | null;
  isLoading: boolean;
  error: any;
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextData | undefined>(undefined);

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
  return null;
};

const fetchCartData = async (url: string, userId: string) => {
  const res = await fetch(`${url}/${userId}`);
  const data = await res.json();
  console.log("userId from the cookie ->", userId);
  console.log("---------------------------------------------------------------------------")
  console.log("res ->", res.url);
  console.log("data on fetchCartData ->", data);
  console.log("---------------------------------------------------------------------------")
  return data;
};

export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getCookie("userId");
        if (userId) {
          const url = `http://localhost:3333/cart/carts/user`;
          const data = await fetchCartData(url, userId);
          console.log("data ->", data);
          console.log("userId", data.userId)
          console.log("url->", url);
          console.log("data ->", data);
          if (!data) {
            setCart(null);
          } else {
            setCart(data);
          }
        } else {
          setCart(null);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const addToCart = (product: CartProduct) => {
    setCart((prevCart) => {
      if (prevCart) {
        const existingProduct = prevCart.products.find((p) => p.productId === product._id.toString());
        if (existingProduct) {
          existingProduct.quantity += 1;
          existingProduct.price += product.price;
        } else {
          prevCart.products.push({
            productId: product._id.toString(),
            title: product.title,
            quantity: 1,
            price: product.price,
            _id: `${cart?._id}`,
          });
        }
        prevCart.total += product.price;
        return { ...prevCart };
      } else {
        const newCart: Cart = {
          _id: `${cart?._id}`,
          userId: `${cart?.userId}`,
          products: [
            {
              productId: product._id.toString(),
              title: product.title,
              quantity: 1,
              price: product.price,
              _id: `${cart?._id}`,
            },
          ],
          total: product.price,
        };
        return newCart;
      }
    });
  };

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

export const useCart = (): CartContextData => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};