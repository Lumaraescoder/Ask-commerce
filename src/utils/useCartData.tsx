import { Cart } from '@/types/types';
import useSWR from 'swr';

const fetchCartData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const useCartData = (userId: string) => {
  const url = `https://ask-commerce-api.onrender.com/cart/carts/user/${userId}`;
  const { data, error } = useSWR(url, fetchCartData);

  const cart = data?.find((cart: Cart) => cart.userId === userId) || null;

  return {
    cart,
    isLoading: !error && !data,
    error,
};
};

export default useCartData;