import { API_SCHEME, API_HOST, API_PORT } from "../../setupEnv";
import { API_OBSERVATORY_HOST, API_OBSERVATORY_SCHEME } from "../../setupEnv";
import { IProduct } from "@/interfaces/products";


export const updateCalculateMin = async ({
    id_comuna,
    products,
  }: {
    id_comuna: number;
    products: IProduct[];
  }) => {
    try {
      const response = await fetch(
        `${API_SCHEME}://${API_HOST}:${API_PORT}/min`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_comuna,
            products,
          }),
        }
      );
      if (!response.ok) throw new Error(`Error al calcular el mínimo`);
      const data = await response.json();
      return data;
    } catch (error) {
      return false;
    }
};
  
  export const updateCalculateMinApi = async ({
    id_comuna,
    products,
  }: {
    id_comuna: number;
    products: IProduct[];
  }) => {
    try {
      const response = await fetch(
        `${API_OBSERVATORY_SCHEME}://${API_OBSERVATORY_HOST}/min/v1/carro/calculo/minimo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_comuna,
            products,
          }),
        }
      );
      if (!response.ok) throw new Error(`Error al calcular el mínimo`);
      const data = await response.json();
      return data;
    } catch (error) {
      return false;
    }
  };
  
  export const updateAvailable = async ({
    id_comuna,
    products,
  }: {
    id_comuna: number;
    products: IProduct[];
  }) => {
    try {
      const response = await fetch(
        `${API_SCHEME}://${API_HOST}:${API_PORT}/available`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_comuna,
            products,
          }),
        }
      );
      if (!response.ok) throw new Error(`Error al calcular el mínimo`);
      const data = await response.json();
      return data;
    } catch (error) {
      return false;
    }
};
  
  export const updateAvailableApi = async ({
    id_comuna,
    products,
  }: {
    id_comuna: number;
    products: IProduct[];
  }) => {
    try {
      const response = await fetch(
        `${API_OBSERVATORY_SCHEME}://${API_OBSERVATORY_HOST}/api/v1/carro/disponibilidad`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_comuna,
            products,
          }),
        }
      );
      if (!response.ok) throw new Error(`Error al calcular el mínimo`);
      const data = await response.json();
      return data;
    } catch (error) {
      return false;
    }
  };
  
  
