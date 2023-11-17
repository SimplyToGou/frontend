"use client";
import "aos/dist/aos.css";
import AOS from "aos";
import React, { useState, useEffect } from "react";
import { getDataApi } from "@/services/api-observatorio";
import { getProducts } from "@/services/api-simply-to-gou";
import { getCategories } from "@/services/api-simply-to-gou";
import { getProductsByCategory } from "@/services/api-simply-to-gou";
import { IProducts } from "@/interfaces/products";
import { IDataByComuna, ISubcategoria } from "@/interfaces/comuna";
import { Products } from "@/data/products";
import { Comunas } from "@/data/id_comunas";
import { SizesOfProducts } from "@/data/product_sizes";

export default function Compare() {
  const [products, setProducts] = useState<ISubcategoria[]>([]);
  const [categories, setCategories] = useState<IDataByComuna>();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  async function handleEditQuestion() {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  async function getProductsFromApi() {
    try {
      const response = await getProducts();
      if (!response) throw new Error(`Error al obtener los datos`);
      setProducts(response["productos"]);
      console.log(response["productos"]);
    } catch (error) {
      console.log(error);
    }
  }

  async function getDataByComunaFromApi() {
    try {
      const response = await getCategories();
      if (!response) throw new Error(`Error al obtener los datos de las categorías`);
      setCategories(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function getSizeOfProductsFromApi() {
    try {
      const response = await getCategories();
      if (!response) throw new Error(`Error al obtener los datos de las categorías`);
      setCategories(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      await getProductsFromApi();
      await getDataByComunaFromApi();
    })();
  }, []);

  return (
    <div className="grid relative py-24 justify-center">
      {/* Header */}
      <div className="flex items-center justify-center max-w-7xl px-6 lg:px-8 py-10 border-b border-gray-900/10 pb-12">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <p className="mt-6 text-md text-blue-700 font-bold" data-aos="zoom-y-out">
            Aumentando la eficiencia, Simplificando tareas
          </p>
          <h2
            className="text-4xl font-bold tracking-tight text-gray-700 sm:text-5xl"
            data-aos="zoom-y-out"
            data-aos-delay="150"
          >
            Comparación de Productos
          </h2>
          <p
            className="mt-4 text-lg leading-8 text-gray-500 border-b border-gray-900/10 pb-6"
            data-aos="zoom-y-out"
            data-aos-delay="200"
          >
            Nos enorgullece ser pioneros en el desarrollo de una aplicación web dedicada a comparar
            precios de productos de supermercados destinados a canastas familiares de programas
            sociales. Nos esforzamos por eliminar la ineficiencia del proceso manual y ofrecer una
            plataforma que no solo ahorra tiempo y recursos, sino que también maximiza el impacto
            positivo en las comunidades.
          </p>
          <ul
            className="text-sm leading-6 text-gray-500 pt-6 list-disc ml-4"
            data-aos-delay="250"
            data-aos="zoom-y-out"
          >
            <li>Este comparador incluye los productos más comprados, especialmente alimentos</li>
            <li>
              No muestra los precios de cada producto, para prevenir prácticas contra la libre
              competencia entre empresas
            </li>
            <li>
              Incluye sólo las ofertas universales, es decir, aquellas que no exigen condiciones
              como llevar más unidades, entregar el ruto o pagar con una determinada tarjeta
            </li>
          </ul>
        </div>
      </div>

      {/* Form */}
      <form className="m-auto w-3/4 p-10" data-aos="fade-up">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Elige mínimo 5 productos
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              También puedes elegir 7, 9, 11, 13 o 5.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="money"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Dinero establecido
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="money"
                    id="money"
                    autoComplete="65000"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    placeholder="65000"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Min cantidad de productos
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    autoComplete="5"
                    defaultValue={0}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    placeholder="5"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="product"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Busca tus productos
                </label>
                <div className="mt-2">
                  <select
                    id="product"
                    name="product"
                    autoComplete="product-name"
                    defaultValue=""
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled> -- select an option -- </option>
                    {products.map((product) => (
                      <React.Fragment key={product.id}>
                        <option key={product.id} value={product.subcategoria_front}>
                          {product.subcategoria_front}
                        </option>
                      </React.Fragment>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Busca por categoría
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    defaultValue=""
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled> -- select an option -- </option>
                    {categories?.categorias.map((category) => (
                      <React.Fragment key={category.id}>
                        <option key={category.id} value={category.categoria}>
                          {category.categoria}
                        </option>
                      </React.Fragment>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="department"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Selecciona un departamento
                </label>
                <div className="mt-2">
                  <select
                    id="department"
                    name="department"
                    defaultValue=""
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled> -- select an option -- </option>
                    {categories?.departamentos.map((department) => (
                      <React.Fragment key={department.id}>
                        <option key={department.id} value={department.departamento}>
                          {department.departamento}
                        </option>
                      </React.Fragment>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="size"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Selecciona un tamaño
                </label>
                <div className="mt-2">
                  <select
                    id="size"
                    name="size"
                    defaultValue=""
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled> -- select an option -- </option>
                    {categories?.categorias.map((category) => (
                      <React.Fragment key={category.id}>
                        <option key={category.id} value={category.categoria}>
                          {category.categoria}
                        </option>
                      </React.Fragment>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              We'll always let you know about important changes, but you pick what else you want to
              hear about.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="comments" className="font-medium text-gray-900">
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="candidates" className="font-medium text-gray-900">
                        Candidates
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="offers" className="font-medium text-gray-900">
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
