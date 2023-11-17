import { API_SCHEME, API_HOST, API_PORT } from "../../setupEnv";
import { IProduct } from "@/interfaces/products";

const COMUNA = 336;

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_SCHEME}://${API_HOST}:${API_PORT}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error(`Error al obtener los productos`);
    const data = await response.json();
    return data;
  } catch (error) {
    return false;
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${API_SCHEME}://${API_HOST}:${API_PORT}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error(`Error al obtener las categorías`);
    const data = await response.json();
    return data;
  } catch (error) {
    return false;
  }
};

export const getProductsByCategory = async (category_id : number) => {
  try {
    const response = await fetch(`${API_SCHEME}://${API_HOST}:${API_PORT}/category_products?category_id=${category_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error(`Error al obtener los productos por la categoría ${category_id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return false;
  }
};
