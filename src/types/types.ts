export interface Product {
  id: number;
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

export interface Cart {
  _id: string;
  userId: string;
  products: 
    {
    productId: string,
    title: string,
    quantity: number,
    price: number,
    _id: string
  }[];
  total: number;
}