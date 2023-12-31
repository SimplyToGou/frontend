import { API_SCHEME, API_HOST, API_PORT } from "../../setupEnv";
import {json} from "stream/consumers";

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

export const getProductsByCategory = async (category_id: number) => {
  try {
    const response = await fetch(
      `${API_SCHEME}://${API_HOST}:${API_PORT}/category_products?category_id=${category_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok)
      throw new Error(`Error al obtener los productos por la categoría ${category_id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return false;
  }
};

export const getSizeOfProduct = async (product_id: number) => {
  try {
    const response = await fetch(
      `${API_SCHEME}://${API_HOST}:${API_PORT}/product_sizes?product_id=${product_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) throw new Error(`Error al obtener el tamaño del producto ${product_id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return false;
  }
};


export const getResultsOfCart = async (cart: any) => {
  try {
    const response = await fetch(
        `${API_SCHEME}://${API_HOST}:${API_PORT}/results`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: cart
        }
    );
    if (!response.ok) throw new Error("Error al obtener el resultado");
    const data = await response.json();
    console.log(data)
    return data;

  } catch (error) {
    return false;
  }


}
