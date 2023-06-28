import { Cart, Product } from "@/types/types";
import React, { createContext, useContext, useState } from "react";
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
export const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);

  // Função para adicionar um produto ao carrinho
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      if (prevCart) {
        const existingProduct = prevCart.products.find((p) => p.productId === product.id.toString());
        if (existingProduct) {
          // O produto já existe no carrinho, então apenas atualize a quantidade
          existingProduct.quantity += 1;
          existingProduct.price += product.price;
        } else {
          // O produto não existe no carrinho, então adicione-o
          prevCart.products.push({
            productId: product.id.toString(),
            title: product.title,
            quantity: 1,
            price: product.price,
            _id: '', // Substitua por um ID real, se necessário
          });
        }
        prevCart.total += product.price;
        return { ...prevCart };
      } else {
        // O carrinho não existe, crie um novo carrinho com o produto
        const newCart: Cart = {
          _id: '', // Substitua por um ID real, se necessário
          userId: '', // Substitua pelo userId real, se necessário
          products: [
            {
              productId: product.id.toString(),
              title: product.title,
              quantity: 1,
              price: product.price,
              _id: '', // Substitua por um ID real, se necessário
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

  return (
    <CartContext.Provider value={{ cart, isLoading: !cart, error: null, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para acessar o contexto do carrinho
export const useCart = (): CartContextData => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

