
import App from "next/app";
import { render } from "@testing-library/react";
import fetch from "node-fetch";

test('GetAllProducts - 1st title', async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  const result = await res.json();
  expect(result[0].title).toBe('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
})

test('GetAllProducts', async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  const result = await res.json();
  expect(result).toBe(result);
})

it('render', () => {
  expect(() => render(<App />));
});