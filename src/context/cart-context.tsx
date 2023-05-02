import React, { createContext, useState } from "react";

export type Cart = {
  id:number,
  userId:number,
  date:Date,
  products:[{productId:number,quantity:number}]
}

export type CartContextType = {
  cart: Cart;
  getItemQuantity:(productId: number) => number;
  increaseItemQuantity: (product: number, quantity: number) => void;
  decreaseItemQuantity:(product: number, quantity: number) => void;
  removeFromCart:() => void;
}

const  CartContext = createContext<CartContextType>({} as CartContextType);
const { Provider } = CartContext;

type CartProviderProps = {
  children: React.ReactNode;
}

const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCartItems] = useState<Cart>({} as Cart);

  function getItemQuantity(id:number){
    return cart.products.find(item => item.productId === id)?.quantity || 0
  }

  function increaseItemQuantity(product: number, quantity: number){}
  function decreaseItemQuantity(product: number, quantity: number){}
  function removeFromCart(){}


  

 const CartContextValues: CartContextType = {
  cart:{} as Cart,
  getItemQuantity,
  increaseItemQuantity,
  decreaseItemQuantity,
  removeFromCart
 }
 return (
   <Provider
     value={CartContextValues}
   >
    {children}

   </Provider>
 );
};

export { CartContext, CartProvider };