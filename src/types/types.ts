
export interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartProduct {
  _id: string;
  productId: string;
  title: string;
  quantity: number;
  price: number;

}

export interface Cart {
  _id: string;
  userId: string;
  products: (CartProduct | null)[];
  total: number;
}